import * as AES from 'aes-everywhere';

import {
  BasicResponse,
  Division,
  DivisionDetail,
  PreconfirmHr,
} from '../models/swaggerTypes';
import { SQLManager } from '../managers/SQLManager';
import { Error400, Error404 } from '../helpers/errors';
import { Utils } from '../../Utils';
import { EmailManager } from '../managers/EmailManager';
import { MailuManager } from '../managers/MailuManager';
import { any } from 'bluebird';
import { stringify } from 'querystring';
import { DeleteManager } from '../managers/DeleteManager';
import { TableDivision } from '../models/dbTypes';

export class DivisionService {
  static async addPerson(
    req: any,
    data: {
      name: string;
      email: string;
    },
    divisionId: number
  ): Promise<BasicResponse> {
    const companyId = req.session.companyId;

    if (!Utils.isValidEmail(data.email)) {
      throw Error400(req, __('DivisionService.addPerson.emailInvalid'));
    }

    const validateRes = await SQLManager.knex
      .select(SQLManager.knex.raw('1'))
      .from('hrs')
      .where('company_id', companyId)
      .where('email', data.email)
      .limit(1);

    if (validateRes.length > 0) {
      throw Error400(req, __('DivisionService.addPerson.emailAlreadyUsed'));
    }

    const activationCode = Utils.generateUuid();

    const companyData = await SQLManager.knex
      .select('domain')
      .from('company')
      .where('id', companyId)
      .limit(1);

    if (companyData.length <= 0) {
      throw Error400(req, __('DivisionService.addPerson.notLoggedIn'));
    }

    const domain = companyData[0].domain;

    await EmailManager.sendHrRegistrationEmail(data.email, domain, {
      activationCode,
      name: data.name,
    });

    await SQLManager.knex
      .insert({
        company_id: companyId,
        division_id: divisionId,
        name: data.name,
        email: data.email,
        activation_code: activationCode,
      })
      .table('hrs');

    return {
      success: true,
      message: __('DivisionService.addPerson.success'),
    };
  }

  static async getDivisions(req: any): Promise<Division[]> {
    const companyId = req.session.companyId;

    const data = await SQLManager.knex
      .select([
        'division.name',
        'division.id',
        'division.tag',
        'company.domain',
        SQLManager.knex.raw('COUNT(hrs.id) AS hrs'),
      ])
      .from('division')
      .leftJoin('hrs', 'division.id', 'hrs.division_id')
      .leftJoin('company', 'company.id', 'division.company_id')
      .where('division.company_id', companyId)
      .groupBy('division.id');

    return data.map((d) => {
      return {
        name: d.name,
        id: d.id,
        hrs: d.hrs,
        mail: `${d.domain}.${d.tag}@hiroo.eu`,
      };
    });
  }

  static async getDivision(
    req: any,
    divisionId: number
  ): Promise<DivisionDetail> {
    const companyId = req.session.companyId;

    const data = await SQLManager.knex
      .select(['id', 'name'])
      .from('division')
      .where('id', divisionId)
      .where('company_id', companyId);

    if (data.length <= 0) {
      throw Error404(req, __('DivisionService.getDivision.divisionNotFound'));
    }

    const data2 = await SQLManager.knex
      .select(['id', 'name', 'email', { isRegistered: 'activation_code' }])
      .from('hrs')
      .where('company_id', companyId)
      .where('division_id', divisionId);

    if (data2.length === 0) {
      return {
        ...data[0],
        hrs: [],
      };
    } else {
      return {
        ...data[0],
        hrs: data2.map((u) => {
          return {
            ...u,
            isRegistered: u.isRegistered === null ? true : false,
          };
        }),
      };
    }
  }

  static async deletePerson(req: any, hrId: number): Promise<BasicResponse> {
    const companyId = req.session.companyId;

    const checkQuery = await SQLManager.knex
      .select(SQLManager.knex.raw('1'))
      .from('hrs')
      .where('id', hrId)
      .where('company_id', companyId);

    if (checkQuery.length === 0) {
      throw Error400(req, __('DivisionService.deletePerson.youAreNotOwner'));
    }

    await Utils.deleteHr(hrId);

    return {
      success: true,
      message: __('DivisionService.deletePerson.success'),
    };
  }

  static async getDivisionMailPassword(
    req: any,
    divisionId: number
  ): Promise<BasicResponse> {
    const companyId = req.session.companyId;

    const validateRes = await SQLManager.knex
      .select(['mail_pass'])
      .from('division')
      .where('company_id', companyId)
      .where('id', divisionId)
      .limit(1);

    if (validateRes.length <= 0) {
      throw Error400(
        req,
        __('DivisionService.getDivisionMailPassword.divisionNoLongerExist')
      );
    }

    const encryptedPass = validateRes[0].mail_pass;

    const plainPass = AES.decrypt(encryptedPass, process.env.PASS_ENCTYPT_KEY);

    return {
      success: true,
      message: __('DivisionService.getDivisionMailPassword.success', {
        plainPass,
      }),
    };
  }

  static async deleteDivision(
    req: any,
    divisionId: number
  ): Promise<BasicResponse> {
    const companyId = req.session.companyId;

    const { domain: companyDomain } = await Utils.companyToMany(
      req,
      companyId,
      ['domain']
    );

    const validateRes = await SQLManager.knex
      .select(['tag'])
      .from('division')
      .where('company_id', companyId)
      .where('id', divisionId)
      .limit(1);

    if (validateRes.length <= 0) {
      throw Error400(
        req,
        __('DivisionService.deleteDivision.divisionNoLongerExists')
      );
    }

    // delete all HRs
    const hrIds = await SQLManager.knex
      .select('id')
      .from('hrs')
      .where('division_id', divisionId)
      .where('company_id', companyId);

    const promises = hrIds.map(async (hrData) => {
      const hrId = hrData.id;

      const checkQuery = await SQLManager.knex
        .select(SQLManager.knex.raw('1'))
        .from('hrs')
        .where('id', hrId)
        .where('company_id', companyId);

      if (checkQuery.length === 0) {
        throw Error400(
          req,
          __('DivisionService.deleteDivision.youAreNotOwner')
        );
      }

      await Utils.deleteHr(hrId);
    });

    await Promise.all(promises);
    await DeleteManager.deleteallInterviewResults(divisionId);
    await DeleteManager.deleteAllCandidates(divisionId);
    await DeleteManager.deleteAllPeople(divisionId);
    await DeleteManager.deleteAllInterviews(divisionId);
    await DeleteManager.deleteAllEmails(divisionId);
    await DeleteManager.deleteAllForms(divisionId);
    await DeleteManager.deleteAllPositions(divisionId);
    await DeleteManager.deleteAllFiles(divisionId);

    await MailuManager.getInstance().deleteEmail(
      `${companyDomain}.${validateRes[0].tag}@hiroo.eu`
    );

    // finally delete division
    await SQLManager.knex
      .delete()
      .from('division')
      .where('company_id', companyId)
      .where('id', divisionId);

    return {
      success: true,
      message: __('DivisionService.deleteDivision.success'),
    };
  }

  static async changeDivisionMailPassword(
    req: any,
    divisionId: number,
    newPass: string,
    newPassAgain: string
  ): Promise<BasicResponse> {
    const companyId = req.session.companyId;

    if (newPass !== newPassAgain) {
      throw Error400(
        req,
        __('DivisionService.changeDivisionMailPassword.passwordsDoesntMatch')
      );
    }

    const validateRes = await SQLManager.knex
      .select(['tag'])
      .from('division')
      .where('company_id', companyId)
      .where('id', divisionId)
      .limit(1);

    if (validateRes.length <= 0) {
      throw Error400(
        req,
        __('DivisionService.changeDivisionMailPassword.divisionNoLongerExists')
      );
    }

    const { domain: companyDomain } = await Utils.companyToMany(
      req,
      companyId,
      ['domain']
    );

    const mailuNick = `${companyDomain}.${validateRes[0].tag}@hiroo.eu`;
    const wasSuccess = await MailuManager.getInstance().changePassword(
      mailuNick,
      newPass
    );

    if (!wasSuccess) {
      throw Error400(
        req,
        __('DivisionService.changeDivisionMailPassword.couldNotRegisterEmail')
      );
    }

    const encryptedPass = AES.encrypt(newPass, process.env.PASS_ENCTYPT_KEY);

    await SQLManager.knex
      .update({
        mail_pass: encryptedPass,
      })
      .table('division')
      .where('id', divisionId);

    return {
      success: true,
      message: __('DivisionService.changeDivisionMailPassword.success'),
    };
  }

  static async updateDivision(
    req: any,
    data: {
      name: string;
    },
    divisionId: number
  ): Promise<BasicResponse> {
    const companyId = req.session.companyId;

    const validateRes = await SQLManager.knex
      .select(SQLManager.knex.raw('1'))
      .from('division')
      .where('company_id', companyId)
      .where('id', divisionId)
      .limit(1);

    if (validateRes.length <= 0) {
      throw Error400(
        req,
        __('DivisionService.updateDivision.divisionNoLongerExists')
      );
    }

    await SQLManager.knex
      .update({
        name: data.name,
      })
      .table('division')
      .where('company_id', companyId)
      .where('id', divisionId);

    return {
      success: true,
      message: __('DivisionService.updateDivision.success'),
    };
  }

  static async createDivision(
    req: any,
    data: {
      name: string;
      tag: string;
    }
  ): Promise<BasicResponse> {
    const companyId = req.session.companyId;

    const { domain: companyDomain } = await Utils.companyToMany(
      req,
      companyId,
      ['domain']
    );

    if (!Utils.isValidSubdomain(data.tag)) {
      throw Error400(req, __('DivisionService.createDivision.wrongTag'));
    }

    const validateRes = await SQLManager.knex
      .select(SQLManager.knex.raw('1'))
      .from('division')
      .where('company_id', companyId)
      .where('name', data.name)
      .limit(1);

    if (validateRes.length > 0) {
      throw Error400(
        req,
        __('DivisionService.createDivision.divisionNameAlreadyUsed')
      );
    }

    const validateRes2 = await SQLManager.knex
      .select(SQLManager.knex.raw('1'))
      .from('division')
      .where('company_id', companyId)
      .where('tag', data.tag)
      .limit(1);

    if (validateRes2.length > 0) {
      throw Error400(
        req,
        __('DivisionService.createDivision.divisionTagAlreadyUsed')
      );
    }

    const pass = Utils.generateUuid();

    const encryptedPass = AES.encrypt(pass, process.env.PASS_ENCTYPT_KEY);

    const mailuNick = `${companyDomain}.${data.tag}`;

    const wasSuccess = await MailuManager.getInstance().registerEmail(
      mailuNick,
      pass,
      mailuNick
    );

    if (!wasSuccess) {
      throw Error400(
        req,
        __('DivisionService.createDivision.couldNotRegisterEmail')
      );
    }

    await SQLManager.knex
      .insert({
        company_id: companyId,
        name: data.name,
        tag: data.tag,
        mail_pass: encryptedPass,
      })
      .table('division');

    const newDivData = await SQLManager.typedKnex
      .query(TableDivision)
      .select((i) => [i.id])
      .where((i) => i.tag, data.tag)
      .getFirst();

    await SQLManager.knex
      .insert({
        company_id: companyId,
        division_id: newDivData.id,
        name: 'Default Job Position',
      })
      .into('job_positions');

    return {
      success: true,
      message: __('DivisionService.createDivision.success'),
    };
  }
}
