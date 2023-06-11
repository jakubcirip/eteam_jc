import { CreateFastInterviewParamBody } from '../models/swaggerTypes';
import { v4 as uuidv4 } from 'uuid';

import {
  LikeHrEmailCatalogParamEmailId,
  LikeHrFormCatalogParamEmailId,
  ImportHrFormCatalogParamBody,
  GetHrFormCatalogResponse,
} from '../models/swaggerTypes';
import { ImportHrEmailCatalogParamBody } from '../models/swaggerTypes';
import { GetHrEmailCatalogResponse } from '../models/swaggerTypes';
import * as config from 'config';

import { BasicResponse } from '../models/swaggerTypes';
import { SQLManager } from '../managers/SQLManager';
import { Error404, Error400, Error500 } from '../helpers/errors';
import { Utils } from '../../Utils';
import { PricingManager } from '../managers/PricingManager';
import { TableCompany } from '../models/dbTypes';
import { GoogleManager } from '../managers/GoogleManager';
import { HrService } from './HrService';
import { InterviewService } from './InterviewService';

// 'emailId': number;
// 'startDate': string;
// 'endDate': string;
// 'remindDate': string;

export class CatalogService {
  static async createFastInterview(
    req: any,
    body: CreateFastInterviewParamBody
  ): Promise<BasicResponse> {
    const mailPromise = CatalogService.importHrEmailCatalog(req, {
      catalogId: body.emailId,
    });

    const formPromise = CatalogService.importHrFormCatalog(req, {
      catalogId: body.formId,
    });

    const [mailRes, formRes] = await Promise.all([mailPromise, formPromise]);

    const { idsArr } = mailRes.data;

    const { posId, formId } = formRes.data;

    const intRes = await HrService.addHrInterview(req, body.name, false);

    const intId = intRes.data.intId;

    const bgPromise = HrService.setHrInterviewBackgroundColor(req, intId, {
      isDark: body.isDark,
    });

    const prelogPromise = HrService.editHrInterviewPrelog(req, intId, {
      prelog: body.prelog,
    });

    const posPromise = HrService.editHrInterviewPosition(
      req,
      intId,
      posId,
      formId
    );

    const colorPromise = InterviewService.setHrInterviewColor(req, intId, {
      color: body.color,
    });

    const imgPromise = InterviewService.setHrInterviewImage(req, intId, {
      type: body.imageType,
      data: body.imageData,
    });

    await Promise.all([
      bgPromise,
      prelogPromise,
      posPromise,
      colorPromise,
      imgPromise,
    ]);

    for (const emailData of idsArr) {
      await HrService.editHrInterviewEmail(
        req,
        intId,
        emailData.id,
        emailData.type
      );
    }

    await Promise.all([
      HrService.editHrInterviewDate(req, intId, body.startDate, 'start'),
      HrService.editHrInterviewDate(req, intId, body.remindDate, 'remind'),
      HrService.editHrInterviewDate(req, intId, body.endDate, 'end'),
    ]);

    return {
      success: true,
      message: __('CatalogService.createFastInterview.success'),
    };
  }

  static async likeHrEmailCatalog(
    req: any,
    emailId: LikeHrEmailCatalogParamEmailId
  ): Promise<BasicResponse> {
    const hrId = req.session.hrId;

    const emailRes = await SQLManager.knex
      .select([SQLManager.knex.raw('1')])
      .table('hr_email_templates_catalog')
      .where('id', emailId)
      .limit(1);

    if (emailRes.length <= 0) {
      throw Error404(
        req,
        __('CatalogService.likeHrEmailCatalog.templateNotFound')
      );
    }

    const likeRes = await SQLManager.knex
      .select(SQLManager.knex.raw('1'))
      .from('hr_email_templates_catalog_likes')
      .where('catalog_id', emailId)
      .where('hr_id', hrId)
      .limit(1);

    if (likeRes.length > 0) {
      throw Error400(req, __('CatalogService.likeHrEmailCatalog.alreadyVoted'));
    }

    await SQLManager.knex
      .update({})
      .increment('likes')
      .table('hr_email_templates_catalog')
      .where('id', emailId);

    await SQLManager.knex
      .insert({
        catalog_id: emailId,
        hr_id: hrId,
      })
      .into('hr_email_templates_catalog_likes');

    return {
      success: true,
      message: __('CatalogService.likeHrEmailCatalog.success'),
    };
  }

  static async importHrEmailCatalog(
    req: any,
    body: ImportHrEmailCatalogParamBody
  ): Promise<BasicResponse> {
    const hrId = req.session.hrId;
    const divId = await Utils.hrToDivId(req, hrId);

    const catalogRes: any[] = await SQLManager.knex
      .select(['name', 'cat_id', 'plan_id'])
      .from('hr_email_templates_catalog')
      .where('id', body.catalogId)
      .limit(1);

    if (catalogRes.length <= 0) {
      throw Error404(
        req,
        __('CatalogService.importHrEmailCatalog.catalogNotFound')
      );
    }

    const catalogName = catalogRes[0].name;
    const requiredPlan = catalogRes[0].plan_id;
    const comapnyId = await Utils.hrIdToCompanyId(req, hrId);
    const { sub_model: currentPlan } = await Utils.companyToMany(
      req,
      comapnyId,
      ['sub_model']
    );

    if (currentPlan < requiredPlan) {
      throw Error400(
        req,
        __('CatalogService.importHrEmailCatalog.youNeedHigherPlan')
      );
    }

    const groupsRes: any[] = await SQLManager.knex
      .select(['type', 'subject', 'email', 'attachments'])
      .from('hr_email_templates_catalog_data')
      .where('catalog_id', body.catalogId);

    const requiredMails = groupsRes.length;
    const mailsData = await SQLManager.knex
      .select({
        total: SQLManager.knex.raw('COUNT(id)'),
      })
      .from('hr_emails')
      .where('division_id', divId);
    const mailsAmount = +mailsData[0].total;

    const canAdd = await PricingManager.canIncrementAmount(
      req,
      hrId,
      mailsAmount,
      'mailTotal',
      requiredMails
    );
    if (!canAdd) {
      throw Error400(
        req,
        __('CatalogService.importHrEmailCatalog.mailTotalLimitReached')
      );
    }

    const idsArr = [];

    for (const g of groupsRes) {
      const newId = await SQLManager.knex
        .insert({
          division_id: divId,
          name: `${catalogName} - ${g.type}`,
          type: g.type,
          subject: g.subject,
          content: g.email,
          attachments: g.attachments,
        })
        .returning('id')
        .into('hr_emails');

      idsArr.push({
        type: g.type,
        id: newId,
      });
    }

    await SQLManager.knex
      .update({})
      .increment('downloads')
      .table('hr_email_templates_catalog')
      .where('id', body.catalogId);

    return {
      success: true,
      message: __('CatalogService.importHrEmailCatalog.success'),
      data: {
        idsArr,
      },
    };
  }

  static async getHrEmailCatalog(req: any): Promise<GetHrEmailCatalogResponse> {
    const catalogRes: any[] = await SQLManager.knex
      .select({
        id: 'id',
        name: 'name',
        catId: 'cat_id',
        planId: 'plan_id',
        desc: 'desc',
        likes: 'likes',
        downloads: 'downloads',
        createdAt: 'created_at',
      })
      .from('hr_email_templates_catalog');

    const resArr = catalogRes.map(async (cat) => {
      const groupsRes: any[] = await SQLManager.knex
        .select(['type', 'subject', 'email', 'attachments'])
        .from('hr_email_templates_catalog_data')
        .where('catalog_id', cat.id);

      const groups = groupsRes.map((g) => {
        return {
          id: g.type.toLowerCase(),
          title: g.type,
          html: g.email,
          subject: g.subject,
          attachments: JSON.parse(g.attachments),
        };
      });

      const planArr: any[] = config.get('plans');
      const plan = planArr.find((p) => {
        return p.id === cat.planId;
      });

      if (!plan) {
        throw Error500(
          req,
          __('CatalogService.getHrEmailCatalog.coundNotFindPlan')
        );
      }

      const planName = plan.name;

      return {
        id: cat.id,
        name: cat.name,
        catId: cat.catId,
        planId: planName,
        desc: cat.desc,
        groups,
        createdAt: cat.createdAt,
        downloads: cat.downloads,
        likes: cat.likes,
      };
    });

    return {
      catalogs: await Promise.all(resArr),
    };
  }

  static async likeHrFormCatalog(
    req: any,
    formId: LikeHrFormCatalogParamEmailId
  ): Promise<BasicResponse> {
    const hrId = req.session.hrId;

    const formRes = await SQLManager.knex
      .select([SQLManager.knex.raw('1')])
      .table('hr_form_templates_catalog')
      .where('id', formId)
      .limit(1);

    if (formRes.length <= 0) {
      throw Error404(
        req,
        __('CatalogService.likeHrFormCatalog.templateNotFound')
      );
    }

    const likeRes = await SQLManager.knex
      .select(SQLManager.knex.raw('1'))
      .from('hr_form_templates_catalog_likes')
      .where('catalog_id', formId)
      .where('hr_id', hrId)
      .limit(1);

    if (likeRes.length > 0) {
      throw Error400(req, __('CatalogService.likeHrFormCatalog.alreadyVoted'));
    }

    await SQLManager.knex
      .update({})
      .increment('likes')
      .table('hr_form_templates_catalog')
      .where('id', formId);

    await SQLManager.knex
      .insert({
        catalog_id: formId,
        hr_id: hrId,
      })
      .into('hr_form_templates_catalog_likes');

    return {
      success: true,
      message: __('CatalogService.likeHrFormCatalog.success'),
    };
  }

  static async importHrFormCatalog(
    req: any,
    body: ImportHrFormCatalogParamBody
  ): Promise<BasicResponse> {
    const hrId = req.session.hrId;
    const divId = await Utils.hrToDivId(req, hrId);

    const catalogRes: any[] = await SQLManager.knex
      .select(['name', 'cat_id', 'plan_id'])
      .from('hr_form_templates_catalog')
      .where('id', body.catalogId)
      .limit(1);

    if (catalogRes.length <= 0) {
      throw Error404(
        req,
        __('CatalogService.importHrFormCatalog.catalogNotFound')
      );
    }

    const catalogName = catalogRes[0].name;
    const requiredPlan = catalogRes[0].plan_id;
    const comapnyId = await Utils.hrIdToCompanyId(req, hrId);
    const { sub_model: currentPlan } = await Utils.companyToMany(
      req,
      comapnyId,
      ['sub_model']
    );

    if (currentPlan < requiredPlan) {
      throw Error400(
        req,
        __('CatalogService.importHrFormCatalog.youNeedHigherPlan')
      );
    }

    const groupsRes: any[] = await SQLManager.knex
      .select(['data', 'lang_code', 'name'])
      .from('hr_form_templates_catalog_data')
      .where('catalog_id', body.catalogId);

    const requiredForms = groupsRes.length;
    const formsData = await SQLManager.knex
      .select({
        total: SQLManager.knex.raw('COUNT(id)'),
      })
      .from('job_positions_forms')
      .where('division_id', divId);
    const formsAmount = +formsData[0].total;

    const canAdd = await PricingManager.canIncrementAmount(
      req,

      hrId,
      formsAmount,
      'formsTotal',
      requiredForms
    );
    if (!canAdd) {
      throw Error400(
        req,
        __('CatalogService.importHrFormCatalog.formTotalLimitReached')
      );
    }

    const jobPosQuery = await SQLManager.knex
      .select(['id'])
      .from('job_positions')
      .where('division_id', divId)
      .limit(1);
    const jobPosId = jobPosQuery[0].id;

    let idRes;

    for (const g of groupsRes) {
      const dataJson = JSON.parse(g.data);
      dataJson.pairs = dataJson.pairs.map((p) => {
        return {
          ...p,
          uuid: uuidv4(),
        };
      });

      idRes = await SQLManager.knex
        .insert({
          job_position_id: jobPosId,
          division_id: divId,
          lang_code: g.lang_code,
          name: catalogName,
          data: JSON.stringify(dataJson),
        })
        .returning('id')
        .into('job_positions_forms');
    }

    await SQLManager.knex
      .update({})
      .increment('downloads')
      .table('hr_form_templates_catalog')
      .where('id', body.catalogId);

    await InterviewService.updateInterviewMedals(req, idRes);

    return {
      success: true,
      message: __('CatalogService.importHrFormCatalog.success'),
      data: {
        formId: idRes,
        posId: jobPosId,
      },
    };
  }

  static async getHrFormCatalog(req: any): Promise<GetHrFormCatalogResponse> {
    const catalogRes: any[] = await SQLManager.knex
      .select({
        id: 'id',
        name: 'name',
        catId: 'cat_id',
        planId: 'plan_id',
        desc: 'desc',
        likes: 'likes',
        downloads: 'downloads',
        createdAt: 'created_at',
      })
      .from('hr_form_templates_catalog');

    const resArr = catalogRes.map(async (cat) => {
      const groupsRes: any[] = await SQLManager.knex
        .select(['data', 'lang_code', 'name'])
        .from('hr_form_templates_catalog_data')
        .where('catalog_id', cat.id);

      const groups = groupsRes.map((g) => {
        const langObj = GoogleManager.getLangCodes().find(
          (lang) => lang.code === g.lang_code
        );
        return {
          lang_code: `${langObj.name} (${langObj.code})`,
          name: g.name,
          pairs: JSON.parse(g.data).pairs.map((p) => {
            let q = '';

            for (const d of p.q.data) {
              if (q) {
                break;
              }

              if (d.data.type === 'question_text_message') {
                q = d.value;
              } else if (d.data.type === 'question_mp4_aftertext') {
                q = d.value;
              } else if (d.data.type === 'question_mp3_aftertext') {
                q = d.value;
              }
            }

            return {
              name: p.name,
              question: q,
            };
          }),
        };
      });

      const planArr: any[] = config.get('plans');
      const plan = planArr.find((p) => {
        return p.id === cat.planId;
      });

      if (!plan) {
        throw Error500(
          req,
          __('CatalogService.getHrFormCatalog.coundNotFindPlan')
        );
      }

      const planName = plan.name;

      return {
        id: cat.id,
        name: cat.name,
        catId: cat.catId,
        planId: planName,
        desc: cat.desc,
        groups,
        createdAt: cat.createdAt,
        downloads: cat.downloads,
        likes: cat.likes,
      };
    });

    return {
      catalogs: await Promise.all(resArr),
    };
  }
}
