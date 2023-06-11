import { GetCompanyInterviewHistoryDetailResponse } from '../models/swaggerTypes';

import { GetCompanyInterviewHistoryDetailParamHistoryIntId } from '../models/swaggerTypes';
import { GetCompanyInterviewHistoryResponse } from '../models/swaggerTypes';

import { GetCompanyTokensStatsResponse } from '../models/swaggerTypes';

import * as config from 'config';

import {
  BasicResponse,
  LoginGlobalResponse,
  MeInfoCompany,
  TokensInfoCompany,
  FaqCompany,
  CompanyIndexData,
  CompanySettings,
} from '../models/swaggerTypes';
import { Error400, Error404, Error500 } from '../helpers/errors';
import { Utils, IcoValidator } from '../../Utils';
import { SQLManager } from '../managers/SQLManager';
import * as AES from 'aes-everywhere';
import { LogManager } from '../managers/LogManager';
import { EmailManager } from '../managers/EmailManager';
import { TokensPackage } from '../classes/TokensPackage';

export interface CompanyRegisterData {
  name: string;
  // ico: string;
  email: string;
  password: string;
  passwordConfirm: string;
  subModel: number;
  domain: string;
}

export interface CompanyLoginData {
  email: string;
  password: string;
  domain: string;
}

export class CompanyService {
  static async getCompanyInterviewHistoryDetail(
    req: any,
    historyIntId: GetCompanyInterviewHistoryDetailParamHistoryIntId
  ): Promise<GetCompanyInterviewHistoryDetailResponse> {
    const companyId = req.session.companyId;
    const historyIntRes = await SQLManager.knex
      .select({
        id: 'division_intwerview_history.id',
        divId: 'division_intwerview_history.division_id',
        divName: 'division.name',
        hrId: 'division_intwerview_history.hr_id',
        hrName: 'hrs.name',
        status: 'division_intwerview_history.status',
        createdAt: 'division_intwerview_history.created_at',
        startedAt: 'division_intwerview_history.started_at',
        endedAt: 'division_intwerview_history.ended_at',
        candidatesAmount: 'division_intwerview_history.candidates_amount',
        planUsed: 'division_intwerview_history.plan_used',
        tokensSpent: 'division_intwerview_history.tokens_spent',
      })
      .from('division_intwerview_history')
      .leftJoin(
        'division',
        'division.id',
        'division_intwerview_history.division_id'
      )
      .leftJoin('hrs', 'hrs.id', 'division_intwerview_history.hr_id')
      .where('division_intwerview_history.company_id', companyId)
      .where('division_intwerview_history.id', historyIntId)
      .limit(1);

    if (historyIntRes.length <= 0) {
      throw Error404(
        req,
        __(
          'CompanyService.getCompanyInterviewHistoryDetail.historyIntewNotFound'
        )
      );
    }

    return historyIntRes[0];
  }

  static async getCompanyInterviewHistory(
    req: any
  ): Promise<GetCompanyInterviewHistoryResponse> {
    const companyId = req.session.companyId;

    const historyIntRes = await SQLManager.knex
      .select({
        id: 'division_intwerview_history.id',
        divName: 'division.name',
        hrName: 'hrs.name',
        status: 'division_intwerview_history.status',
      })
      .from('division_intwerview_history')
      .leftJoin(
        'division',
        'division.id',
        'division_intwerview_history.division_id'
      )
      .leftJoin('hrs', 'hrs.id', 'division_intwerview_history.hr_id')
      .where('division_intwerview_history.company_id', companyId);

    return {
      ints: historyIntRes,
    };
  }

  static async getCompanyTokensStats(
    req: any
  ): Promise<GetCompanyTokensStatsResponse> {
    const stats: GetCompanyTokensStatsResponse['stats'] = [
      {
        text: __('CompanyService.getCompanyTokensStats.thisWeek'),
        amount: 0,
        isRed: false,
      },
      {
        text: __('CompanyService.getCompanyTokensStats.thisMonth'),
        amount: 0,
        isRed: true,
      },
      {
        text: __('CompanyService.getCompanyTokensStats.thisYear'),
        amount: 0,
        isRed: false,
      },
      {
        text: __('CompanyService.getCompanyTokensStats.overall'),
        amount: 0,
        isRed: false,
      },
    ];

    let i = 0;
    for (const stat of stats) {
      const days = i === 0 ? 7 : i === 1 ? 30 : i === 2 ? 365 : null;
      const statsQuery = SQLManager.knex
        .select({
          tokensSpent: 'tokens_spent',
        })
        .from('division_intwerview_history');

      if (days !== null) {
        statsQuery.where(
          'created_at',
          '>=',
          SQLManager.knex.raw('( CURDATE() - INTERVAL ' + days + ' DAY )')
        );
      }

      const statsRes = await statsQuery;
      let totalSpent = 0;

      statsRes.forEach((r) => {
        totalSpent += r.tokensSpent;
      });

      stat.amount = totalSpent;

      i++;
    }

    return {
      stats,
    };
  }

  static async updateCompanyPassword(
    req: any,
    data: { oldPass: string; newPass: string; newPassAgain: string }
  ): Promise<BasicResponse> {
    const companyId = req.session.companyId;

    if (data.newPass !== data.newPassAgain) {
      throw Error400(
        req,
        __('CompanyService.updateCompanyPassword.passwordsDoesntMatch')
      );
    }

    if (data.newPass === data.oldPass) {
      throw Error400(
        req,
        __('CompanyService.updateCompanyPassword.newPassMustBeDifferent')
      );
    }

    const companyData = await Utils.companyToMany(req, companyId, [
      'pass',
      'email',
      'domain',
    ]);

    const plainPass = AES.decrypt(
      companyData.pass,
      process.env.PASS_ENCTYPT_KEY
    );

    if (plainPass !== data.oldPass) {
      throw Error400(
        req,
        __('CompanyService.updateCompanyPassword.wrongCurrentPass')
      );
    }

    const encryptedNewPass = AES.encrypt(
      data.newPass,
      process.env.PASS_ENCTYPT_KEY
    );

    await SQLManager.knex
      .update({
        pass: encryptedNewPass,
      })
      .table('company')
      .where('id', companyId);

    EmailManager.sendChangePasswordEmailCompany(
      companyData.email,
      companyData.domain,
      {}
    );

    return {
      success: true,
      message: __('CompanyService.updateCompanyPassword.success'),
    };
  }

  static async getCompanySettings(req: any): Promise<CompanySettings> {
    const companyId = req.session.companyId;

    const companyData = await Utils.companyToMany(req, companyId, [
      'name',
      'email',
      // 'ico',
      'sub_model',
      'domain',
      'tokens',
    ]);

    const conf: any[] = config.get('plans');
    const planData = conf.find((plan) => {
      return plan.id === companyData['sub_model'];
    });

    return {
      name: companyData.name,
      email: companyData.email,
      // ico: companyData.ico,
      tokens: companyData.tokens,
      plan: planData.name,
      domain: companyData.domain,
    };
  }

  static async activatePlan(
    req: any,
    planData: {
      planId: number;
    }
  ): Promise<BasicResponse> {
    const companyId = req.session.companyId;
    const planId = planData.planId;

    await SQLManager.knex
      .update({
        sub_model: planId,
      })
      .table('company')
      .where('id', companyId);

    return {
      success: true,
      message: __('CompanyService.activatePlan.success'),
    };
  }

  static async getTokensInfoCompany(req: any): Promise<TokensInfoCompany> {
    const companyId = req.session.companyId;

    const hrData = await SQLManager.knex
      .select('tokens')
      .from('company')
      .where('id', companyId)
      .limit(1);

    if (hrData.length <= 0) {
      throw Error404(
        req,
        __('CompanyService.getTokensInfoCompany.userNotFound')
      );
    }

    return {
      amount: hrData[0].tokens,
    };
  }

  static async sendCompanySupportEmail(
    req: any,
    data: {
      name: string;
      email: string;
      subject: string;
      description: string;
    }
  ): Promise<BasicResponse> {
    const companyId = req.session.companyId;

    await SQLManager.knex
      .insert({
        ...data,
        company_id: companyId,
      })
      .into('support');

    EmailManager.sendSupportEmail({
      ...data,
      companyId,
    });

    return {
      success: true,
      message: __('CompanyService.sendCompanySupportEmail.success'),
    };
  }

  static async getFaqCompany(req: any): Promise<FaqCompany> {
    return config.get('companyFaq');
  }

  static async getCompanyIndexData(req: any): Promise<CompanyIndexData> {
    const companyId = req.session.companyId;

    const divs = SQLManager.knex
      .select([])
      .count('id')
      .from('division')
      .where('company_id', companyId)
      .as('divs');

    const hrs = SQLManager.knex
      .select([])
      .count('id')
      .from('hrs')
      .where('company_id', companyId)
      .as('hrs');

    const inactiveHrs = SQLManager.knex
      .select([])
      .count('id')
      .from('hrs')
      .where('company_id', 1)
      .where(SQLManager.knex.raw('activation_code IS NOT NULL'))
      .as('inactive_hrs');

    const res = await SQLManager.knex
      .select(['tokens', 'sub_model', divs, hrs, inactiveHrs])
      .from('company')
      .where('id', companyId);

    if (res.length <= 0) {
      throw Error500(
        req,
        __('CompanyService.getCompanyIndexData.internalError')
      );
    }

    const data = res[0];

    const planId = data.sub_model;
    const conf: any[] = config.get('plans');

    const planData = conf.find((plan) => {
      return plan.id === planId;
    });

    if (!planData) {
      throw Error500(
        req,
        __('CompanyService.getCompanyIndexData.internalError')
      );
    }

    return {
      tokens: data.tokens,
      hrs: data.hrs,
      inactiveHrs: data.inactive_hrs,
      divs: data.divs,
      plan: {
        id: planData.id,
        name: planData.name,
        color: planData.color,
        colorHex: planData.colorHex,
      },
    };
  }

  static async getMeInfoCompany(req: any): Promise<MeInfoCompany> {
    const companyId = req.session.companyId;

    const hrData = await SQLManager.knex
      .select('name')
      .from('company')
      .where('id', companyId)
      .limit(1);

    if (hrData.length <= 0) {
      throw Error404(req, __('CompanyService.getMeInfoCompany.userNotFound'));
    }

    return {
      name: hrData[0].name,
    };
  }

  static async activateCompany(
    req: any,
    code: string
  ): Promise<LoginGlobalResponse> {
    const queryData = await SQLManager.knex
      .select(['id', 'email', 'domain'])
      .from('company')
      .where('activation_code', code)
      .limit(1);

    if (queryData.length <= 0) {
      throw Error400(req, __('CompanyService.activateCompany.invalidLink'));
    }

    const id = queryData[0].id;
    const email = queryData[0].email;
    const domain = queryData[0].domain;

    EmailManager.sendCompanyRegistrationFinishEmail(email, domain, {});

    await SQLManager.knex
      .update({
        activation_code: null,
      })
      .table('company')
      .where('id', id);

    const key = Utils.generateUuid();
    await SQLManager.knex
      .update({
        auth_key: key,
      })
      .table('company')
      .where('id', id);

    req.session.companyId = id;

    return {
      success: true,
      message: __('CompanyService.activateCompany.success'),
      domain: domain,
      key: key,
    };
  }

  static async resetCompanyPasswordValidate(
    req: any,
    data: {
      resetPassKey: string;
    }
  ): Promise<BasicResponse> {
    const validateRes = await SQLManager.knex
      .select(['id'])
      .from('company')
      .where('reset_pass_key', data.resetPassKey)
      .limit(1);
    if (validateRes.length <= 0) {
      throw Error400(
        req,
        __('CompanyService.resetCompanyPasswordValidate.invalidLink')
      );
    }

    return {
      success: true,
      message: __('CompanyService.resetCompanyPasswordValidate.success'),
    };
  }

  static async resetCompanyPassword(
    req: any,
    data: {
      password: string;
      passwordAgain: string;
      resetPassKey: string;
    }
  ): Promise<BasicResponse> {
    if (data.password !== data.passwordAgain) {
      throw Error400(
        req,
        __('CompanyService.resetCompanyPassword.passwordsDoesntMatch')
      );
    }

    const validateRes = await SQLManager.knex
      .select(['id', 'domain', 'email'])
      .from('company')
      .where('reset_pass_key', data.resetPassKey)
      .limit(1);

    if (validateRes.length <= 0) {
      throw Error400(
        req,
        __('CompanyService.resetCompanyPassword.invalidLink')
      );
    }

    const hashedPass = AES.encrypt(data.password, process.env.PASS_ENCTYPT_KEY);

    const email = validateRes[0].email;
    const domain = validateRes[0].domain;

    EmailManager.sendResetPasswordSuccessEmailCompany(email, domain, {});

    await SQLManager.knex
      .update({
        reset_pass_key: null,
        pass: hashedPass,
      })
      .table('company')
      .where('id', validateRes[0].id);

    return {
      success: true,
      message: __('CompanyService.resetCompanyPassword.success'),
    };
  }

  static async requestResetCompanyPassword(
    req: any,
    data: {
      email: string;
    }
  ): Promise<BasicResponse> {
    if (Utils.isValidEmail(data.email) === false) {
      throw Error400(
        req,
        __('CompanyService.requestResetCompanyPassword.invalidLink')
      );
    }

    const validateRes = await SQLManager.knex
      .select(['reset_pass_at', 'id'])
      .from('company')
      .where('email', data.email)
      .limit(1);

    if (validateRes.length <= 0) {
      throw Error400(
        req,
        __(
          'CompanyService.requestResetCompanyPassword.companyWithThisMailDoesntExist'
        )
      );
    }

    const companyId = validateRes[0].id;
    const lastResetAt = +validateRes[0].reset_pass_at;
    const timeNow = Date.now();
    let canSendAgain = false;

    if (lastResetAt) {
      if (timeNow - 1000 * 60 * 60 > lastResetAt) {
        // Posle iba 1x za hodinu
        canSendAgain = true;
      }
    } else {
      canSendAgain = true;
    }

    if (canSendAgain === false) {
      throw Error400(
        req,
        __('CompanyService.requestResetCompanyPassword.passwordResetTimeLimit')
      );
    }

    const key = Utils.generateUuid();

    const domain = await Utils.companyIdToDomain(req, companyId);

    EmailManager.sendResetPasswordEmail(data.email, domain, {
      resetPassKey: key,
    });

    await SQLManager.knex
      .update({
        reset_pass_at: Date.now().toString(),
        reset_pass_key: key,
      })
      .table('company')
      .where('email', data.email);

    return {
      success: true,
      message: __('CompanyService.requestResetCompanyPassword.success'),
    };
  }

  static async loginCompany(
    req: any,
    data: CompanyLoginData
  ): Promise<LoginGlobalResponse> {
    if (!Utils.isValidEmail(data.email)) {
      throw Error400(
        req,
        req.$localize(
          ':loginCompany - invalid email@@so99yrn:Please enter a valid email.'
        )
      );
    }

    const domainRes = await SQLManager.knex
      .select([SQLManager.knex.raw('1')])
      .from('company')
      .where('domain', data.domain)
      .limit(1);

    if (domainRes.length <= 0) {
      throw Error400(
        req,
        req.$localize(
          ':loginCompany - domain not found@@so99Eda:There is no company on this domain.'
        )
      );
    }

    const dataRes = await SQLManager.knex
      .select(['pass', 'id', 'activation_code', 'domain'])
      .from('company')
      .where('email', data.email)
      .where('domain', data.domain)
      .limit(1);

    if (dataRes.length <= 0) {
      throw Error400(
        req,
        req.$localize(
          ':loginCompany - wrong login data@@so99Kid:Incorrect email or password.'
        )
      );
    }

    if (dataRes[0].activation_code) {
      throw Error400(
        req,
        req.$localize(
          ':loginCompany - unfinished registration@@so99Kid:Please check your email and finish the registration.'
        )
      );
    }

    const plainPass = AES.decrypt(
      dataRes[0].pass,
      process.env.PASS_ENCTYPT_KEY
    );

    if (plainPass !== data.password) {
      throw Error400(
        req,
        req.$localize(
          ':loginCompany - wrong login data@@so99Kid:Incorrect email or password.'
        )
      );
    }

    const key = Utils.generateUuid();
    await SQLManager.knex
      .update({
        auth_key: key,
      })
      .table('company')
      .where('id', dataRes[0].id);

    req.session.companyId = dataRes[0].id;

    return {
      success: true,
      message: req.$localize(
        ':loginCompany - success@@so99WOF:Successfully logged in.'
      ),
      domain: dataRes[0].domain,
      key,
    };
  }

  static async purchaseTokens(
    req: any,
    data: { packageId: string }
  ): Promise<BasicResponse> {
    const companyId = req.session.companyId;
    const pack = new TokensPackage(req, data.packageId);

    await SQLManager.knex
      .update({})
      .increment('tokens', pack.getAmount())
      .table('company')
      .where('id', companyId);

    const res = await SQLManager.knex
      .select('tokens')
      .from('company')
      .where('id', companyId)
      .limit(1);

    if (res.length <= 0) {
      throw Error500(req, __('CompanyService.purchaseTokens.companyNotFound'));
    }

    const newAmount = res[0].tokens;

    return {
      success: true,
      message: __('CompanyService.purchaseTokens.success', {
        toAdd: pack.getAmount(),
        newAmount,
      }),
    };
  }

  static async authCheckCompany(
    req: any,
    data: { authKey: string }
  ): Promise<BasicResponse> {
    const keyData = await SQLManager.knex
      .select(SQLManager.knex.raw('id'))
      .from('company')
      .where('auth_key', data.authKey)
      .limit(1);

    if (keyData.length <= 0) {
      throw Error404(req, __('CompanyService.authCheckCompany.keyNotFound'));
    }

    if (!req.session.companyId) {
      req.session.companyId = keyData[0].id;
    }

    return {
      success: true,
      message: __('CompanyService.authCheckCompany.success'),
    };
  }

  static async registerCompany(
    req: any,
    data: CompanyRegisterData
  ): Promise<BasicResponse> {
    if (data.subModel !== 0 && data.subModel !== 1 && data.subModel !== 2) {
      throw Error400(
        req,
        req.$localize(
          ':registerCompany - wrong model@@sogBGB3:You selected non-existing company plan.'
        )
      );
    }

    if (!Utils.isValidEmail(data.email)) {
      throw Error400(req, __('CompanyService.registerCompany.invalidEmail'));
    }

    if (data.password !== data.passwordConfirm) {
      throw Error400(
        req,
        req.$localize(
          ':registerCompany - passwords does not match@@sogBMZW:Passwords you have entered does not match.'
        )
      );
    }

    // if (!IcoValidator.validIco(data.ico)) {
    //   throw Error400(req, __('CompanyService.registerCompany.invalidIco'));
    // }

    if (!Utils.isValidSubdomain(data.domain)) {
      throw Error400(
        req,
        req.$localize(
          ':registerCompany - invalid company domain@@sogBWJM:The domain name you have entered is invalid.'
        )
      );
    }

    // const asyncValid = await IcoValidator.validIcoAsync(data.ico);
    // if (!asyncValid) {
    //   throw Error400(req, __('CompanyService.registerCompany.invalidIco'));
    // }

    // const icoCheckQuery = SQLManager.knex
    //   .select(SQLManager.knex.raw('1'))
    //   .from('company')
    //   .where('ico', data.ico)
    //   .limit(1);

    const emailCheckQuery = SQLManager.knex
      .select(SQLManager.knex.raw('1'))
      .from('company')
      .where('email', data.email)
      .limit(1);

    const domainCheckQuery = SQLManager.knex
      .select(SQLManager.knex.raw('1'))
      .from('company')
      .where('domain', data.domain)
      .limit(1);

    const [
      // icoQueryRes,
      emailQueryRes,
      domainQueryRes,
    ] = await Promise.all([
      // icoCheckQuery,
      emailCheckQuery,
      domainCheckQuery,
    ]);

    // if (icoQueryRes.length >= 1) {
    //   throw Error400(req, __('CompanyService.registerCompany.icoAlreadyUsed'));
    // }

    if (emailQueryRes.length >= 1) {
      throw Error400(
        req,
        req.$localize(
          ':registerCompany - email used@@sogC2lT:Email you have entered is already registered as a company owner.'
        )
      );
    }

    if (domainQueryRes.length >= 1) {
      throw Error400(
        req,
        req.$localize(
          ':registerCompany - domain used@@sogCbiL:Company domain you have entered is already registered.'
        )
      );
    }

    const encryptedPass = AES.encrypt(
      data.password,
      process.env.PASS_ENCTYPT_KEY
    );

    const activationCode = Utils.generateUuid();

    await EmailManager.sendRegistrationEmail(data.email, data.domain, {
      activationCode,
    });

    await SQLManager.knex
      .insert({
        name: data.name,
        // ico: data.ico,
        email: data.email,
        pass: encryptedPass,
        sub_model: data.subModel,
        activation_code: activationCode,
        domain: data.domain,
      })
      .table('company');

    return {
      success: true,
      message: req.$localize(
        ':registerCompany - success@@sogCdYU:Company successfully registered. Please check your email inbox to finish the registration.'
      ),
    };
  }
}
