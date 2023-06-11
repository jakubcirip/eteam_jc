import { GetSharedVideoTutorialsResponse } from '../models/swaggerTypes';

import { SetHrInterviewBackgroundColorParamIntId } from '../models/swaggerTypes';
import { SetHrInterviewBackgroundColorParamBody } from '../models/swaggerTypes';
import { TestHrInterviewParamIntId } from '../models/swaggerTypes';
import { UpdateHrJobPositiomFormMedalsParamPositionId } from '../models/swaggerTypes';
import { UpdateHrJobPositiomFormMedalsParamFormId } from '../models/swaggerTypes';
import { UpdateHrJobPositiomFormMedalsParamBody } from '../models/swaggerTypes';
import { EditHrInterviewPrelogParamIntId } from '../models/swaggerTypes';
import { EditHrInterviewPrelogParamBody } from '../models/swaggerTypes';
import { HrCanEditMp4Response } from '../models/swaggerTypes';

import { HrCanEditMp4ParamMp4Id } from '../models/swaggerTypes';
import { HrCanEditMp3Response } from '../models/swaggerTypes';

import { HrCanEditMp3ParamMp3Id } from '../models/swaggerTypes';
import { HrCanEditJobFormularResponse } from '../models/swaggerTypes';

import { HrCanEditJobFormularParamPositionId } from '../models/swaggerTypes';
import { HrCanEditJobFormularParamFormId } from '../models/swaggerTypes';
import { HrCanEditJobPositionResponse } from '../models/swaggerTypes';

import { HrCanEditJobPositionParamPositionId } from '../models/swaggerTypes';
import { HrCanEditEmailResponse } from '../models/swaggerTypes';

import { HrCanEditEmailParamEmailId } from '../models/swaggerTypes';
import { HrCanEditPersonResponse } from '../models/swaggerTypes';

import { HrCanEditPersonParamPersonId } from '../models/swaggerTypes';
import { HrGetCalendarResponse } from '../models/swaggerTypes';

import * as config from 'config';

import {
  BasicResponse,
  PreconfirmHr,
  LoginGlobalResponse,
  MeInfoHr,
  FaqCompany,
  JobPositions,
  JobPositionForms,
  HrSettings,
  JobPositionForm,
  InterviewPeople,
  MailsResponse,
  Mail,
  InterviewArray,
  InterviewSettings,
  InterviewSettingsEmail,
  InterviewData,
  MailTypes,
  InterviewCandidatesData,
  MailPlaceholderRes,
  InterviewSummary,
  InterviewSummaryWarning,
  MailPreview,
  InterviewResultsData,
  FormTemplatesObject,
} from '../models/swaggerTypes';
import { SQLManager } from '../managers/SQLManager';
import { Error400, Error404, Error500 } from '../helpers/errors';
import { Utils } from '../../Utils';
import { EmailManager } from '../managers/EmailManager';
import * as AES from 'aes-everywhere';
import { SocketServer } from '../api';
import * as fs from 'fs-extra';
import * as path from 'path';
import { PlaceholderManager } from '../managers/PlaceholderManager';
import { LogManager } from '../managers/LogManager';
import { PlaceholderData } from '../classes/placeholders/SharedEmailPlaceholders';
import { DeleteManager } from '../managers/DeleteManager';
import { PricingManager } from '../managers/PricingManager';
import { InterviewService } from './InterviewService';
import {
  TableJobInterviewsWeight,
  TableMedals,
  TableJobPositionsForms,
} from '../models/dbTypes';
import { getTableName } from '@wwwouter/typed-knex';
import { GoogleManager } from '../managers/GoogleManager';
import { AnalyseService } from './AnalyseService';

export interface HrLoginData {
  email: string;
  password: string;
  domain: string;
}

export class HrService {
  static async getSharedVideoTutorials(
    req: any
  ): Promise<GetSharedVideoTutorialsResponse> {
    return {
      paths: config.get<any[]>('videoTutorials'),
    };
  }

  static async setHrInterviewBackgroundColor(
    req: any,
    intId: SetHrInterviewBackgroundColorParamIntId,
    body: SetHrInterviewBackgroundColorParamBody
  ): Promise<BasicResponse> {
    const hrId = req.session.hrId;
    const divId = await Utils.hrToDivId(req, hrId);

    const checkData = await SQLManager.knex
      .select([SQLManager.knex.raw('1')])
      .from('job_interviews')
      .where('id', intId)
      .where('division_id', divId)
      .limit(1);

    if (checkData.length <= 0) {
      throw Error400(
        req,
        __('HrService.setHrInterviewBackgroundColor.interviewNoLongerExists')
      );
    }

    await SQLManager.knex
      .update({
        dark: body.isDark ? 1 : 0,
      })
      .table('job_interviews')
      .where('id', intId);

    return {
      success: true,
      message: __('HrService.setHrInterviewBackgroundColor.success'),
    };
  }

  static async testHrInterview(
    req: any,
    intId: TestHrInterviewParamIntId
  ): Promise<BasicResponse> {
    const hrId = req.session.hrId;
    const divId = await Utils.hrToDivId(req, hrId);

    let warningsData: InterviewSummary;

    try {
      warningsData = await HrService.getHrInterviewSummaryInternal(
        req,
        divId,
        intId
      );
    } catch (err) {
      LogManager.error(err);
      throw Error500(
        req,
        __('HrService.testHrInterview.couldNotLoadInterviewData')
      );
    }

    const errorsAmount = warningsData.warnings.filter(
      (w) => w.type === 'danger'
    ).length;

    if (errorsAmount > 0) {
      throw Error500(
        req,
        __('HrService.testHrInterview.fixInterviewErrorsFirst')
      );
    }

    const formIdData = await SQLManager.knex
      .select(['job_position_form_id'])
      .from('job_interviews')
      .where('id', intId);

    const formId = formIdData[0] ? +formIdData[0].job_position_form_id : null;

    if (!formId) {
      throw Error500(req, __('HrService.testHrInterview.cantGetFormData'));
    }

    await GoogleManager.prepareFormTTS(req, intId, formId);

    return {
      success: true,
      message: __('HrService.testHrInterview.success'),
    };
  }

  static async updateHrJobPositiomFormMedals(
    req: any,
    positionId: UpdateHrJobPositiomFormMedalsParamPositionId,
    formId: UpdateHrJobPositiomFormMedalsParamFormId,
    body: UpdateHrJobPositiomFormMedalsParamBody
  ): Promise<BasicResponse> {
    await SQLManager.knex
      .delete()
      .table(getTableName(TableJobInterviewsWeight))
      .where('form_id', formId);

    await SQLManager.typedKnex.query(TableJobInterviewsWeight).insertItems(
      body.medals.map((m) => {
        return {
          form_id: formId,
          medal_id: m.medalId,
          weight: m.weight,
          qp_uuid: m.qpUuid,
        };
      })
    );

    await InterviewService.updateInterviewMedals(req, formId);

    return {
      success: true,
      message: __('HrService.updateHrJobPositiomFormMedals.success'),
    };
  }

  static async editHrInterviewPrelog(
    req: any,
    intId: EditHrInterviewPrelogParamIntId,
    body: EditHrInterviewPrelogParamBody
  ): Promise<BasicResponse> {
    const hrId = req.session.hrId;
    const divId = await Utils.hrToDivId(req, hrId);

    const checkData = await SQLManager.knex
      .select([SQLManager.knex.raw('1')])
      .from('job_interviews')
      .where('id', intId)
      .where('division_id', divId)
      .limit(1);

    if (checkData.length <= 0) {
      throw Error400(
        req,
        __('HrService.editHrInterviewPrelog.interviewNoLongerExists')
      );
    }

    await SQLManager.knex
      .update({
        prelog: body.prelog,
      })
      .table('job_interviews')
      .where('id', intId);

    return {
      success: true,
      message: __('HrService.editHrInterviewPrelog.success'),
    };
  }

  static async hrCanEditMp4(
    req: any,
    mp4Id: HrCanEditMp4ParamMp4Id
  ): Promise<HrCanEditMp4Response> {
    const hrId = req.session.hrId;
    const divId = await Utils.hrToDivId(req, hrId);

    const objArr = (
      await SQLManager.knex
        .select(['data'])
        .from('job_positions_forms')
        .where('division_id', divId)
    ).map((l) => JSON.parse(l.data));

    let isUsingFile = false;
    let isUsingInActive = false;

    for (const objChunk of objArr) {
      const obj = objChunk;
      const state = objChunk.state;

      if (isUsingFile && isUsingInActive) {
        break;
      }

      for (const pair of obj.pairs) {
        if (isUsingFile && isUsingInActive) {
          break;
        }

        if (pair.q.type === 'Video Question') {
          for (const attr of pair.q.data) {
            if (isUsingFile && isUsingInActive) {
              break;
            }

            if (attr.title === 'Question MP4 Source' && !attr.isTemplate) {
              if (attr.value === mp4Id) {
                isUsingFile = true;

                if (state === 'started') {
                  isUsingInActive = true;
                }
              }
            }
          }
        }
      }
    }

    return {
      canEdit: !isUsingInActive,
      canDelete: !isUsingFile,
    };
  }

  static async hrCanEditMp3(
    req: any,
    mp3Id: HrCanEditMp3ParamMp3Id
  ): Promise<HrCanEditMp3Response> {
    const hrId = req.session.hrId;
    const divId = await Utils.hrToDivId(req, hrId);

    const objArr = (
      await SQLManager.knex
        .select(['data'])
        .from('job_positions_forms')
        .where('division_id', divId)
    ).map((l) => JSON.parse(l.data));

    let isUsingFile = false;
    let isUsingInActive = false;

    for (const objChunk of objArr) {
      const obj = objChunk;
      const state = objChunk.state;

      if (isUsingFile && isUsingInActive) {
        break;
      }

      for (const pair of obj.pairs) {
        if (isUsingFile && isUsingInActive) {
          break;
        }

        if (pair.q.type === 'Audio Question') {
          for (const attr of pair.q.data) {
            if (isUsingFile && isUsingInActive) {
              break;
            }

            if (attr.title === 'Question MP3 Source' && !attr.isTemplate) {
              if (attr.value === mp3Id) {
                isUsingFile = true;

                if (state === 'started') {
                  isUsingInActive = true;
                }
              }
            }
          }
        }
      }
    }

    return {
      canEdit: !isUsingInActive,
      canDelete: !isUsingFile,
    };
  }

  static async hrCanEditImg(
    req: any,
    imgId: HrCanEditMp3ParamMp3Id
  ): Promise<HrCanEditMp3Response> {
    const hrId = req.session.hrId;
    const divId = await Utils.hrToDivId(req, hrId);

    const objArr = (
      await SQLManager.knex
        .select(['data'])
        .from('job_positions_forms')
        .where('division_id', divId)
    ).map((l) => JSON.parse(l.data));

    let isUsingFile = false;
    let isUsingInActive = false;

    for (const objChunk of objArr) {
      const obj = objChunk;
      const state = objChunk.state;

      if (isUsingFile && isUsingInActive) {
        break;
      }

      for (const pair of obj.pairs) {
        if (isUsingFile && isUsingInActive) {
          break;
        }

        if (pair.q.type === 'Image Question') {
          for (const attr of pair.q.data) {
            if (isUsingFile && isUsingInActive) {
              break;
            }

            if (attr.title === 'Question Image Source' && !attr.isTemplate) {
              if (attr.value === imgId) {
                isUsingFile = true;

                if (state === 'started') {
                  isUsingInActive = true;
                }
              }
            }
          }
        }
      }
    }

    return {
      canEdit: !isUsingInActive,
      canDelete: !isUsingFile,
    };
  }

  static async hrCanEditJobFormular(
    req: any,
    positionId: HrCanEditJobFormularParamPositionId,
    formId: HrCanEditJobFormularParamFormId
  ): Promise<HrCanEditJobFormularResponse> {
    const hrId = req.session.hrId;
    const divId = await Utils.hrToDivId(req, hrId);

    const intData = await SQLManager.knex
      .select([SQLManager.knex.raw('1')])
      .from('job_interviews')
      .where('division_id', divId)
      .where('job_position_id', positionId)
      .where('job_position_form_id', formId)
      .limit(1);

    const int2Data = await SQLManager.knex
      .select([SQLManager.knex.raw('1')])
      .from('job_interviews')
      .where('division_id', divId)
      .where('state', 'pending')
      .where('job_position_id', positionId)
      .where('job_position_form_id', formId)
      .limit(1);

    return {
      canEdit: int2Data.length > 0 ? false : true,
      canDelete: intData.length > 0 ? false : true,
    };
  }

  static async hrCanEditJobPosition(
    req: any,
    positionId: HrCanEditJobPositionParamPositionId
  ): Promise<HrCanEditJobPositionResponse> {
    const hrId = req.session.hrId;
    const divId = await Utils.hrToDivId(req, hrId);

    const intData = await SQLManager.knex
      .select([SQLManager.knex.raw('1')])
      .from('job_interviews')
      .where('division_id', divId)
      .where('job_position_id', positionId)
      .limit(1);

    const int2Data = await SQLManager.knex
      .select([SQLManager.knex.raw('1')])
      .from('job_interviews')
      .where('division_id', divId)
      .where('state', 'pending')
      .where('job_position_id', positionId)
      .limit(1);

    return {
      canEdit: int2Data.length > 0 ? false : true,
      canDelete: intData.length > 0 ? false : true,
    };
  }

  static async hrCanEditEmail(
    req: any,
    emailId: HrCanEditEmailParamEmailId
  ): Promise<HrCanEditEmailResponse> {
    const hrId = req.session.hrId;
    const divId = await Utils.hrToDivId(req, hrId);

    const intIdArr: number[] = (
      await SQLManager.knex
        .select(['int_id'])
        .from('job_interviews_data')
        .where('mail_id', emailId)
    ).map((p) => p.int_id);

    const intIds: number[] = [...new Set(intIdArr)];

    let isIntRunning = false;
    let canDelete = true;

    const intPromises = intIds.map(async (intId) => {
      const intData = await SQLManager.knex
        .select(['state'])
        .from('job_interviews')
        .where('division_id', divId)
        .where('id', intId)
        .limit(1);

      if (intData.length > 0) {
        canDelete = false;
        const state = intData[0].state;

        if (state === 'pending') {
          isIntRunning = true;
        }
      }
    });

    await Promise.all(intPromises);

    return {
      canEdit: !isIntRunning,
      canDelete,
    };
  }

  static async hrCanEditPerson(
    req: any,
    personId: HrCanEditPersonParamPersonId
  ): Promise<HrCanEditPersonResponse> {
    const hrId = req.session.hrId;
    const divId = await Utils.hrToDivId(req, hrId);

    const candidatesData: number[] = (
      await SQLManager.knex
        .select(['job_interview_id'])
        .where('division_id', divId)
        .from('job_interviews_candidates')
        .where('job_interview_person_id', personId)
    ).map((i) => i.job_interview_id);

    const intIds = [...new Set(candidatesData)];

    let isIntRunning = false;
    let canDelete = true;

    const intPromises = intIds.map(async (intId) => {
      const intData = await SQLManager.knex
        .select(['state'])
        .from('job_interviews')
        .where('division_id', divId)
        .where('id', intId)
        .limit(1);

      if (intData.length > 0) {
        canDelete = false;
        const state = intData[0].state;

        if (state === 'pending') {
          isIntRunning = true;
        }
      }
    });

    await Promise.all(intPromises);

    return {
      canEdit: !isIntRunning,
      canDelete,
    };
  }

  static async hrGetCalendar(req: any): Promise<HrGetCalendarResponse> {
    const hrId = req.session.hrId;
    const divId = await Utils.hrToDivId(req, hrId);

    const intArr: {
      id: number;
      name: string;
    }[] = await SQLManager.knex
      .select(['id', 'name'])
      .from('job_interviews')
      .where('state', 'pending')
      .where('division_id', divId);

    const intDateData: {
      events: { type: string; date: string }[];
      intName: string;
    }[] = await Promise.all(
      intArr.map(async (int) => {
        const intId = int.id;

        const intDataArr: {
          type: string;
          date: string;
        }[] = await SQLManager.knex
          .select(['type', 'date'])
          .from('job_interviews_data')
          .where('int_id', intId)
          .whereNotNull('date');

        return {
          intName: int.name,
          events: intDataArr,
        };
      })
    );

    const intArrBeforeFlat = intDateData.map((int) => {
      return int.events.map((e) => {
        return {
          color:
            e.type === 'start'
              ? '#14bae4'
              : e.type === 'remind'
              ? '#f54394'
              : '#31c971',
          start: e.date,
          end: e.date,
          title: int.intName,
        };
      });
    });

    const intArrFlat = [];

    intArrBeforeFlat.forEach((el) => {
      el.forEach((el2) => {
        intArrFlat.push(el2);
      });
    });

    const res: HrGetCalendarResponse = {
      events: intArrFlat,
    };

    return res;
  }

  static async getFaqHr(req: any): Promise<FaqCompany> {
    return config.get('hrFaq');
  }

  static async getHrEmailTypes(req: any): Promise<MailTypes> {
    return {
      types: config.get('mailTypes'),
    };
  }

  static async addFormTemplates(
    req: any,
    jobPositionId: number,
    body: { name: string; templateId: number }
  ): Promise<BasicResponse> {
    const name = body.name;
    const hrId = req.session.hrId;
    const divId = await Utils.hrToDivId(req, hrId);

    const templatePair = await SQLManager.knex
      .select(['data'])
      .from('job_positions_forms_templates')
      .where('id', body.templateId)
      .limit(1);

    if (templatePair.length <= 0) {
      throw Error404(req, __('HrService.addFormTemplates.templateNotFound'));
    }

    await SQLManager.knex
      .insert({
        job_position_id: jobPositionId,
        division_id: divId,
        name,
        data: templatePair[0].data,
      })
      .into('job_positions_forms');

    return {
      success: true,
      message: __('HrService.addFormTemplates.success'),
    };
  }

  static async getFormTemplates(req: any): Promise<FormTemplatesObject> {
    const templates = await SQLManager.knex
      .select(['id', 'name'])
      .from('job_positions_forms_templates');

    return {
      templates,
    };
  }

  static async startHrInterview(
    req: any,
    intId: number
  ): Promise<BasicResponse> {
    const hrId = req.session.hrId;
    const divId = await Utils.hrToDivId(req, hrId);
    const companyId = await Utils.hrIdToCompanyId(req, hrId);

    const checkRes = await SQLManager.knex
      .select(['tag'])
      .from('job_interviews')
      .where('division_id', divId)
      .where('id', intId)
      .limit(1);

    if (checkRes.length <= 0) {
      throw Error404(
        req,
        __('HrService.startHrInterview.interviewNoLongerExists')
      );
    }

    const intTag = checkRes[0].tag;

    let warningsData: InterviewSummary;

    try {
      warningsData = await HrService.getHrInterviewSummaryInternal(
        req,
        divId,
        intId
      );
    } catch (err) {
      LogManager.error(err);
      throw Error500(
        req,
        __('HrService.startHrInterview.couldNotLoadInterviewData')
      );
    }

    if (
      warningsData.warnings.length >= 1 &&
      warningsData.warnings[0].type !== 'success'
    ) {
      throw Error500(req, __('HrService.startHrInterview.thereAreWarnings'));
    }

    const intsData = await SQLManager.knex
      .select({
        total: SQLManager.knex.raw('COUNT(id)'),
      })
      .from('job_interviews')
      .where('division_id', divId)
      .where('state', 'pending');

    const intAmount = +intsData[0].total;

    const canAdd = await PricingManager.canIncrementAmount(
      req,
      hrId,
      intAmount,
      'activeInterviewTotal'
    );
    if (!canAdd) {
      throw Error400(
        req,
        __('HrService.startHrInterview.activeInterviewTotalLimitReached')
      );
    }

    const { tokens } = await Utils.companyToMany(req, companyId, ['tokens']);
    if (tokens < warningsData.totalPrice) {
      throw Error500(
        req,
        __('HrService.startHrInterview.companyNotEnoughTokens')
      );
    }

    await SQLManager.knex
      .update({
        tokens: SQLManager.knex.raw('?? - ??', [
          'tokens',
          warningsData.totalPrice,
        ]),
      })
      .table('company')
      .where('id', companyId);

    const endDateRes = await SQLManager.knex
      .select(['date'])
      .from('job_interviews_data')
      .where('type', 'end')
      .where('int_id', intId);

    if (endDateRes.length <= 0) {
      throw Error404(
        req,
        __('HrService.startHrInterview.interviewNotSetupCorrectly')
      );
    }

    const endDate = new Date(endDateRes[0].date);

    await SQLManager.knex
      .update({
        state: 'pending',
        finish_at: endDate,
        start_at: SQLManager.knex.raw('NOW()'),
      })
      .table('job_interviews')
      .where('division_id', divId)
      .where('id', intId);

    const intDir = path.join(
      process.env.dirname,
      '../private/fm/int/' + intTag
    );

    await fs.ensureDir(intDir);

    return {
      success: true,
      message: __('HrService.startHrInterview.success'),
    };
  }

  static async getHrInterviewSummary(
    req: any,
    intId: number
  ): Promise<InterviewSummary> {
    const hrId = req.session.hrId;
    const divId = await Utils.hrToDivId(req, hrId);
    return HrService.getHrInterviewSummaryInternal(req, divId, intId);
  }

  static async getHrInterviewSummaryInternal(
    req: any,
    divId: number,
    intId: number
  ): Promise<InterviewSummary> {
    const warnings: InterviewSummaryWarning[] = [];

    const intData = await SQLManager.knex
      .select(
        'name',
        'job_position_id',
        'job_position_form_id',
        'prelog',
        'state',
        'tag',
        'prelog',
        'test_user_tag'
      )
      .from('job_interviews')
      .where('id', intId)
      .where('division_id', divId)
      .limit(1);

    if (intData.length <= 0) {
      throw Error404(
        req,
        __('HrService.getHrInterviewSummaryInternal.interviewNoLongerExists')
      );
    }

    if (intData[0].state !== 'created') {
      warnings.push({
        type: 'danger',
        text: __(
          'HrService.getHrInterviewSummaryInternal.interviewAlreadyStarted'
        ),
      });
    }

    if (!intData[0].prelog) {
      warnings.push({
        type: 'danger',
        text: __('HrService.getHrInterviewSummaryInternal.needToWritePrelog'),
      });
    }

    const posData = await SQLManager.knex
      .select('name')
      .from('job_positions')
      .where('id', intData[0].job_position_id)
      .where('division_id', divId)
      .limit(1);

    const formData = await SQLManager.knex
      .select('name', 'data')
      .from('job_positions_forms')
      .where('id', intData[0].job_position_form_id)
      .where('division_id', divId)
      .limit(1);

    const canData = await SQLManager.knex
      .select([SQLManager.knex.raw('COUNT(id) AS total')])
      .from('job_interviews_candidates')
      .where('division_id', divId)
      .where('job_interview_id', intId);

    if (posData.length <= 0) {
      warnings.push({
        type: 'danger',
        text: __(
          'HrService.getHrInterviewSummaryInternal.needToAsignJobPosition'
        ),
      });
    }

    if (formData.length <= 0) {
      warnings.push({
        type: 'danger',
        text: __(
          'HrService.getHrInterviewSummaryInternal.needToAsignJobTemplate'
        ),
      });
    }

    let totalSeconds = 0;
    const formObj = formData[0] ? JSON.parse(formData[0].data) : { pairs: [] };

    if (formObj.pairs.length > 0) {
      totalSeconds = formObj.pairs
        .map((p) => (p.answerTime ? p.answerTime : 0))
        .reduce((total, n) => +total + +n);
    }

    const mailTypesObj: any[] = config
      .get<any[]>('mailTypes')
      .filter((m) => m.usages.includes('normal'));
    const mailTypes: string[] = mailTypesObj.map((m) => m.name);

    const dateNow = Date.now();

    const promises = mailTypes.map(async (mType) => {
      const mailRes = await SQLManager.knex
        .select(['date', 'mail_id'])
        .from('job_interviews_data')
        .where('type', mType)
        .where('int_id', intId)
        .limit(1);

      if (mailRes.length <= 0) {
        warnings.push({
          type: 'danger',
          text: __('HrService.getHrInterviewSummaryInternal.needToAsignEmail', {
            emailName: mType.charAt(0).toUpperCase() + mType.substring(1),
          }),
        });
      } else {
        const hasStaticDate = mailTypesObj.find((m) => m.name === mType)
          .staticDate;
        if (hasStaticDate) {
          if (!mailRes[0].date) {
            warnings.push({
              type: 'danger',
              text: __(
                'HrService.getHrInterviewSummaryInternal.needToSetEmailDate',
                {
                  emailName: mType.charAt(0).toUpperCase() + mType.substring(1),
                }
              ),
            });
          } else {
            if (!mailRes[0] || !mailRes[0].date) {
              warnings.push({
                type: 'danger',
                text: __(
                  'HrService.getHrInterviewSummaryInternal.emailConfigurationNotValid',
                  {
                    emailName:
                      mType.charAt(0).toUpperCase() + mType.substring(1),
                  }
                ),
              });
            } else {
              const dateMailObj = new Date(mailRes[0].date);
              const dateMail = dateMailObj.getTime();

              if (dateMail < dateNow) {
                warnings.push({
                  type: 'danger',
                  text: __(
                    'HrService.getHrInterviewSummaryInternal.emailDateInPast',
                    {
                      emailName:
                        mType.charAt(0).toUpperCase() + mType.substring(1),
                    }
                  ),
                });
              }
            }
          }
        }
      }

      return {
        type: mType,
        date:
          mailRes[0] && mailRes[0].date
            ? mailRes[0].date
            : __('HrService.getHrInterviewSummaryInternal.dateNotSpecified'),
        id: mailRes[0] ? mailRes[0].mail_id : -1,
      };
    });

    const mailData = await Promise.all(promises);

    const mailPromises = mailData.map(async (m) => {
      const mailDetail: any[] = await SQLManager.knex
        .select(['subject'])
        .from('hr_emails')
        .where('division_id', divId)
        .where('id', m.id)
        .limit(1);

      if (mailDetail.length <= 0) {
        return {};
      }

      const mail = mailDetail[0];

      return {
        type: m.type,
        subject: mail.subject ? mail.subject : null,
      };
    });

    const mails = await Promise.all(mailPromises);
    const emptyMails = mails.filter((m) => m.subject === null);

    emptyMails.forEach((m) => {
      warnings.push({
        type: 'danger',
        text: __('HrService.getHrInterviewSummaryInternal.emailNeedsSubject', {
          emailName: m.type,
        }),
      });
    });

    if (formObj.pairs.length <= 0) {
      warnings.push({
        type: 'warning',
        text: __(
          'HrService.getHrInterviewSummaryInternal.jobPositionTemplateCantBeEmpty'
        ),
      });
    }

    if (!canData[0] || canData[0].total <= 0) {
      warnings.push({
        type: 'warning',
        text: __(
          'HrService.getHrInterviewSummaryInternal.noCandidatedJoinedYet'
        ),
      });
    }

    const sortedMailTypes = mailTypesObj.filter((m) => m.staticDate);
    sortedMailTypes.sort((a, b) => (a.order > b.order ? 1 : -1));
    const mailsInOrder = sortedMailTypes.map((m) => m.name);

    const orderMailData = await SQLManager.knex
      .select(['type', 'date'])
      .from('job_interviews_data')
      .where('int_id', intId);
    const interviewMails = orderMailData.filter((m) => {
      const mailConfig = mailTypesObj.find((t) => t.name === m.type);
      return mailConfig.staticDate;
    });
    interviewMails.sort((a, b) => {
      if (!a || !a.date || !b || !b.date) {
        return 1;
      }

      return a.date.getTime() > b.date.getTime() ? 1 : -1;
    });

    for (let i = 0; i < mailsInOrder.length; i++) {
      if (!interviewMails[i]) {
        continue;
      }

      if (mailsInOrder[i] !== interviewMails[i].type) {
        if (mailsInOrder.indexOf(interviewMails[i].type) > i) {
          warnings.push({
            type: 'danger',
            text: __(
              'HrService.getHrInterviewSummaryInternal.emailNeedsToBeEarlierThanOtherEmail',
              {
                emailName: mailsInOrder[i],
                earlierThanEmail: interviewMails[i].type,
              }
            ),
          });
        }
      }
    }

    if (warnings.length <= 0) {
      warnings.push({
        type: 'success',
        text: __('HrService.getHrInterviewSummaryInternal.success'),
      });
    }

    return {
      testUserTag: intData[0].test_user_tag,
      interviewTag: intData[0].tag,
      interviewName: intData[0].name,
      prelog: intData[0].prelog,
      warnings,
      formularName: `${
        formData[0]
          ? formData[0].name
          : __('HrService.getHrInterviewSummaryInternal.templateNotSpecified')
      } (${
        posData[0]
          ? posData[0].name
          : __('HrService.getHrInterviewSummaryInternal.templateNotSpecified')
      })`,
      totalQuestions: formObj.pairs.length,
      totalCandidates: canData[0] ? canData[0].total : 0,
      emails: mailData,
      pricePerSecond: +config.get('price.perSecond'),
      interviewSeconds: totalSeconds,
      totalPrice:
        totalSeconds *
        (canData[0] ? canData[0].total : 0) *
        +config.get('price.perSecond'),
    };
  }

  static async getHrEmailPlaceholders(
    req: any,
    emailType: string
  ): Promise<MailPlaceholderRes> {
    const placeholders = PlaceholderManager.i.getPlaceholders(emailType);

    return {
      placeholders,
    };
  }

  static async createHrInterviewCandidate(
    req: any,
    intId: number,
    personId: number
  ): Promise<BasicResponse> {
    const hrId = req.session.hrId;
    const divId = await Utils.hrToDivId(req, hrId);

    const intData = await SQLManager.knex
      .select([SQLManager.knex.raw('1')])
      .from('job_interviews')
      .where('id', intId)
      .where('division_id', divId)
      .limit(1);

    if (intData.length <= 0) {
      throw Error404(
        req,
        __('HrService.createHrInterviewCandidate.interviewNoLongerExists')
      );
    }

    const personData = await SQLManager.knex
      .select([SQLManager.knex.raw('1')])
      .from('job_interviews_people')
      .where('id', personId)
      .where('division_id', divId)
      .limit(1);

    if (personData.length <= 0) {
      throw Error404(
        req,
        __('HrService.createHrInterviewCandidate.personNoLongerExist')
      );
    }

    const canData = await SQLManager.knex
      .select([SQLManager.knex.raw('1')])
      .from('job_interviews_candidates')
      .where('job_interview_person_id', personId)
      .where('division_id', divId)
      .where('job_interview_id', intId)
      .limit(1);

    if (canData.length > 0) {
      throw Error404(
        req,
        __('HrService.createHrInterviewCandidate.candidateAlreadyExist')
      );
    }

    await SQLManager.knex
      .insert({
        division_id: divId,
        job_interview_id: intId,
        job_interview_person_id: personId,
        type: 'manual',
      })
      .into('job_interviews_candidates');

    return {
      success: true,
      message: __('HrService.createHrInterviewCandidate.success'),
    };
  }

  static async removeHrInterviewCandidate(
    req: any,
    intId: number,
    canId: number
  ): Promise<BasicResponse> {
    const hrId = req.session.hrId;
    const divId = await Utils.hrToDivId(req, hrId);

    const intData = await SQLManager.knex
      .select([SQLManager.knex.raw('1')])
      .from('job_interviews')
      .where('id', intId)
      .where('division_id', divId)
      .limit(1);

    if (intData.length <= 0) {
      throw Error404(
        req,
        __('HrService.removeHrInterviewCandidate.interviewNoLongerExist')
      );
    }

    await SQLManager.knex
      .delete()
      .from('job_interviews_candidates')
      .where('division_id', divId)
      .where('job_interview_id', intId)
      .where('job_interview_person_id', canId);

    return {
      success: true,
      message: __('HrService.removeHrInterviewCandidate.success'),
    };
  }

  static async getHrInterviewCandidates(
    req: any,
    intId: number
  ): Promise<InterviewCandidatesData> {
    const hrId = req.session.hrId;
    const divId = await Utils.hrToDivId(req, hrId);

    const intData = await SQLManager.knex
      .select(['name'])
      .from('job_interviews')
      .where('id', intId)
      .where('division_id', divId)
      .limit(1);

    if (intData.length <= 0) {
      throw Error404(
        req,
        __('HrService.getHrInterviewCandidates.interviewNoLongerExists')
      );
    }

    const candidatesData = await SQLManager.knex
      .select([
        'job_interviews_candidates.email_uid',
        'job_interviews_people.id',
        'job_interviews_people.name',
        'job_interviews_people.email',
        'job_interviews_people.type',
        'job_interviews_people.tag',
      ])
      .from('job_interviews_candidates')
      .leftJoin(
        'job_interviews_people',
        'job_interviews_people.id',
        'job_interviews_candidates.job_interview_person_id'
      )
      .where('job_interviews_candidates.division_id', divId)
      .where('job_interviews_candidates.job_interview_id', intId);

    return {
      candidates: candidatesData,
      interviewName: intData[0].name,
    };
  }

  static async editHrInterviewDate(
    req: any,
    intId: number,
    date: string,
    type: string
  ): Promise<BasicResponse> {
    const hrId = req.session.hrId;
    const divId = await Utils.hrToDivId(req, hrId);

    const checkData = await SQLManager.knex
      .select([SQLManager.knex.raw('1')])
      .from('job_interviews')
      .where('id', intId)
      .where('division_id', divId)
      .limit(1);

    if (checkData.length <= 0) {
      throw Error400(
        req,
        __('HrService.editHrInterviewDate.interviewNoLongerExist')
      );
    }

    const mailData = await SQLManager.knex
      .select([SQLManager.knex.raw('1')])
      .from('job_interviews_data')
      .where('type', type)
      .where('int_id', intId)
      .limit(1);

    if (mailData.length <= 0) {
      await SQLManager.knex
        .insert({
          int_id: intId,
          type,
          date: new Date(date),
          mail_id: null,
        })
        .into('job_interviews_data');
    } else {
      await SQLManager.knex
        .update({
          date: new Date(date),
        })
        .table('job_interviews_data')
        .where('type', type)
        .where('int_id', intId);
    }

    return {
      success: true,
      message: __('HrService.editHrInterviewDate.success'),
    };
  }

  static async editHrInterviewEmail(
    req: any,
    intId: number,
    emailId: number,
    type: string
  ): Promise<BasicResponse> {
    const hrId = req.session.hrId;
    const divId = await Utils.hrToDivId(req, hrId);

    if (emailId === -1) {
      emailId = null;
    }

    const checkData = await SQLManager.knex
      .select([SQLManager.knex.raw('1')])
      .from('job_interviews')
      .where('id', intId)
      .where('division_id', divId)
      .limit(1);

    if (checkData.length <= 0) {
      throw Error400(
        req,
        __('HrService.editHrInterviewEmail.interviewNoLongerExist')
      );
    }

    const mailData = await SQLManager.knex
      .select([SQLManager.knex.raw('1')])
      .from('job_interviews_data')
      .where('type', type)
      .where('int_id', intId)
      .limit(1);

    if (mailData.length <= 0) {
      await SQLManager.knex
        .insert({
          int_id: intId,
          type,
          mail_id: emailId,
          date: null,
        })
        .into('job_interviews_data');
    } else {
      await SQLManager.knex
        .update({
          mail_id: emailId,
        })
        .table('job_interviews_data')
        .where('type', type)
        .where('int_id', intId);
    }

    return {
      success: true,
      message: __('HrService.editHrInterviewEmail.success'),
    };
  }

  static async editHrInterviewPosition(
    req: any,
    intId: number,
    posId: number,
    formId: number
  ): Promise<BasicResponse> {
    const hrId = req.session.hrId;
    const divId = await Utils.hrToDivId(req, hrId);

    const checkData = await SQLManager.knex
      .select([SQLManager.knex.raw('1')])
      .from('job_interviews')
      .where('id', intId)
      .where('division_id', divId)
      .limit(1);

    if (checkData.length <= 0) {
      throw Error400(
        req,
        __('HrService.editHrInterviewPosition.interviewNoLongerExist')
      );
    }

    await SQLManager.knex
      .update({
        job_position_id: posId,
        job_position_form_id: formId,
      })
      .table('job_interviews')
      .where('id', intId);

    return {
      success: true,
      message: __('HrService.editHrInterviewPosition.success'),
    };
  }

  static async getHrInterview(req: any, intId: number): Promise<InterviewData> {
    const hrId = req.session.hrId;
    const divId = await Utils.hrToDivId(req, hrId);

    const posReq = SQLManager.knex
      .select(['id', 'name'])
      .from('job_positions')
      .where('division_id', divId);

    const formReq = SQLManager.knex
      .select(['id', 'name', 'job_position_id'])
      .from('job_positions_forms')
      .where('division_id', divId);

    const mailReq = SQLManager.knex
      .select(['id', 'name', 'type'])
      .from('hr_emails')
      .where('division_id', divId);

    const intReq = SQLManager.knex
      .select([
        'prelog',
        'name',
        'tag',
        'state',
        SQLManager.knex.raw('job_position_id AS posId'),
        SQLManager.knex.raw('job_position_form_id AS formId'),
        'color',
        'image',
        'dark',
      ])
      .from('job_interviews')
      .where('id', intId);

    const intDataReq = SQLManager.knex
      .select(['type', 'date', SQLManager.knex.raw('mail_id AS mailId')])
      .from('job_interviews_data')
      .where('int_id', intId);

    const [posRes, formRes, mailRes, intRes, intDataRes] = await Promise.all([
      posReq,
      formReq,
      mailReq,
      intReq,
      intDataReq,
    ]);

    const mails = mailRes
      .filter(
        (thing, index, self) =>
          index === self.findIndex((t) => t.type === thing.type)
      )
      .map((type) => {
        return {
          type: type.type,
          values: mailRes.filter((mR) => {
            return mR.type === type.type;
          }),
        };
      });

    return {
      types: config.get('mailTypes'),
      basicData: {
        ...intRes[0],
        dark: intRes[0].dark === 0 ? false : true,
      },
      advancedData: intDataRes,
      settings: {
        jobs: {
          positions: posRes.map((pR) => {
            return {
              ...pR,
              forms: formRes.filter((fR) => {
                return fR.job_position_id === pR.id;
              }),
            };
          }),
        },
        emails: mails,
      },
    };
  }
  static async getHrInterviews(req: any): Promise<InterviewArray> {
    const hrId = req.session.hrId;
    const divId = await Utils.hrToDivId(req, hrId);

    const data = await SQLManager.knex
      .select({
        name: 'name',
        id: 'id',
        state: 'state',
        tag: 'tag',
        startAt: 'start_at',
        finishAt: 'finish_at',
      })
      .from('job_interviews')
      .where('division_id', divId);

    return {
      interviews: data,
    };
  }

  static async deleteHrInterview(req: any, id: number): Promise<BasicResponse> {
    const hrId = req.session.hrId;
    const divId = await Utils.hrToDivId(req, hrId);

    const checkRes = await SQLManager.knex
      .select([SQLManager.knex.raw('1')])
      .from('job_interviews')
      .where('division_id', divId)
      .where('id', id)
      .limit(1);

    if (checkRes.length <= 0) {
      throw Error400(
        req,
        __('HrService.deleteHrInterview.interviewNoLongerExist')
      );
    }

    await DeleteManager.deleteInterview(id);

    return {
      success: true,
      message: __('HrService.deleteHrInterview.success'),
    };
  }

  static async addHrInterview(
    req: any,
    name: string,
    isNonstop: boolean
  ): Promise<BasicResponse> {
    const hrId = req.session.hrId;
    const divId = await Utils.hrToDivId(req, hrId);

    const checkRes = await SQLManager.knex
      .select([SQLManager.knex.raw('1')])
      .from('job_interviews')
      .where('name', name)
      .where('division_id', divId)
      .limit(1);

    if (checkRes.length > 0) {
      throw Error400(
        req,
        __('HrService.addHrInterview.interviewNameAlreadyUsed')
      );
    }

    const tag = await Utils.generateInterviewTag();
    const userTag = await Utils.generateFileId();

    if (!tag) {
      throw Error500(req, __('HrService.addHrInterview.couldNotGenerateTag'));
    }

    const intsData = await SQLManager.knex
      .select({
        total: SQLManager.knex.raw('COUNT(id)'),
      })
      .from('job_interviews')
      .where('division_id', divId)
      .where('state', 'created');
    const intAmount = +intsData[0].total;

    const canAdd = await PricingManager.canIncrementAmount(
      req,
      hrId,
      intAmount,
      'idleInterviewTotal'
    );
    if (!canAdd) {
      throw Error400(
        req,
        __('HrService.addHrInterview.idleInterviewTotalLimitReached')
      );
    }

    const intId = await SQLManager.knex
      .insert({
        division_id: divId,
        name,
        state: isNonstop ? 'nonstop' : 'created',
        tag,
        test_user_tag: userTag,
        image: 'apiurl:bulksplash-e_ambursley-Q_DK3kxXhbo.jpg',
        color: 'blue',
      })
      .returning('id')
      .into('job_interviews');

    return {
      success: true,
      message: __('HrService.addHrInterview.success'),
      data: {
        intId,
      },
    };
  }

  static async editHrInterview(
    req: any,
    id: number,
    name: string
  ): Promise<BasicResponse> {
    const hrId = req.session.hrId;
    const divId = await Utils.hrToDivId(req, hrId);

    const [checkRes, checkRes2] = await Promise.all([
      SQLManager.knex
        .select([SQLManager.knex.raw('1')])
        .from('job_interviews')
        .where('division_id', divId)
        .where('id', id)
        .limit(1),

      SQLManager.knex
        .select([SQLManager.knex.raw('1')])
        .from('job_interviews')
        .where('division_id', divId)
        .where('name', name)
        .whereNot('id', id)
        .limit(1),
    ]);

    if (checkRes.length <= 0) {
      throw Error400(
        req,
        __('HrService.editHrInterview.interviewNoLongerExist')
      );
    }

    if (checkRes2.length > 0) {
      throw Error400(req, __('HrService.editHrInterview.nameAleradyUsed'));
    }

    await SQLManager.knex
      .update({
        name,
      })
      .from('job_interviews')
      .where('id', id);

    return {
      success: true,
      message: __('HrService.editHrInterview.success'),
    };
  }

  static async editInterviewPerson(
    req: any,
    personId: number,
    name: string,
    email: string
  ): Promise<BasicResponse> {
    const hrId = req.session.hrId;
    const divId = await Utils.hrToDivId(req, hrId);

    if (!(await HrService.hrCanEditPerson(req, personId)).canEdit) {
      throw Error400(
        req,
        __('HrService.editInterviewPerson.positionUsedByInterview')
      );
    }

    if (!Utils.isValidEmail(email)) {
      throw Error400(req, __('HrService.editInterviewPerson.emailNotValid'));
    }

    const checkRes = await SQLManager.knex
      .select([SQLManager.knex.raw('1')])
      .from('job_interviews_people')
      .where('division_id', divId)
      .limit(1);

    if (checkRes.length <= 0) {
      throw Error400(
        req,
        __('HrService.editInterviewPerson.personNoLongerExist')
      );
    }

    const validateRes = await SQLManager.knex
      .select(SQLManager.knex.raw('1'))
      .from('job_interviews_people')
      .where('division_id', divId)
      .where('email', email)
      .whereNot('id', personId)
      .limit(1);

    if (validateRes.length > 0) {
      throw Error400(
        req,
        __('HrService.editInterviewPerson.personWithThisEmailAlreadyExist')
      );
    }

    await SQLManager.knex
      .update({
        name,
        email,
      })
      .table('job_interviews_people')
      .where('id', personId);

    return {
      success: true,
      message: __('HrService.editInterviewPerson.success'),
    };
  }

  static async deleteInterviewPerson(
    req: any,
    personData: { id: number }
  ): Promise<BasicResponse> {
    const hrId = req.session.hrId;
    const divId = await Utils.hrToDivId(req, hrId);

    if (!(await HrService.hrCanEditPerson(req, personData.id)).canEdit) {
      throw Error400(
        req,
        __('HrService.deleteInterviewPerson.positionUsedByInterview')
      );
    }

    const personNameCheck = await SQLManager.knex
      .select(SQLManager.knex.raw('1'))
      .from('job_interviews_people')
      .where('division_id', divId)
      .where('id', personData.id)
      .limit(1);

    if (personNameCheck.length <= 0) {
      throw Error400(
        req,
        __('HrService.deleteInterviewPerson.personNoLongerExist')
      );
    }

    await DeleteManager.deletePerson(personData.id, divId);

    return {
      success: true,
      message: __('HrService.deleteInterviewPerson.success'),
    };
  }

  static async addInterviewPerson(
    req: any,
    personData: { name: string; email: string }
  ): Promise<BasicResponse> {
    const hrId = req.session.hrId;
    const divId = await Utils.hrToDivId(req, hrId);
    const { name, email } = personData;

    const personNameCheck = SQLManager.knex
      .select(SQLManager.knex.raw('1'))
      .from('job_interviews_people')
      .where('division_id', divId)
      .where('name', name)
      .limit(1);

    const personEmailCheck = SQLManager.knex
      .select(SQLManager.knex.raw('1'))
      .from('job_interviews_people')
      .where('division_id', divId)
      .where('email', email)
      .limit(1);

    const [nameData, emailData] = await Promise.all([
      personNameCheck,
      personEmailCheck,
    ]);

    if (nameData.length > 0) {
      throw Error400(
        req,
        __('HrService.addInterviewPerson.personWithThisNameAlreadyExist')
      );
    }

    if (emailData.length > 0) {
      throw Error400(
        req,
        __('HrService.addInterviewPerson.personWithThisEmailAlreadyExist')
      );
    }

    await SQLManager.knex
      .insert({
        name,
        email,
        type: 'manual',
        division_id: divId,
        tag: Utils.generateFileId(),
      })
      .into('job_interviews_people');

    return {
      success: true,
      message: __('HrService.addInterviewPerson.success'),
    };
  }

  static async getInterviewPeopleForAdding(req: any): Promise<any> {
    const hrId = req.session.hrId;
    console.log('NOW ', hrId);
    const divId = await Utils.hrToDivId(req, hrId);

    const peopleData = await SQLManager.knex
      .select(['id', 'name', 'tag', 'email', 'type'])
      .from('job_interviews_people')
      .where('division_id', divId);

    return {
      people: peopleData,
    };
  }

  static async getInterviewPeople(req: any, intId: number): Promise<any> {
    return await AnalyseService.getInterviewPeople(req, intId);
  }

  static async updateHrPassword(
    req: any,
    data: { oldPass: string; newPass: string; newPassAgain: string }
  ): Promise<BasicResponse> {
    const hrId = req.session.hrId;

    if (data.newPass !== data.newPassAgain) {
      throw Error400(
        req,
        __('HrService.updateHrPassword.newPasswordsDoesntMatch')
      );
    }

    if (data.newPass === data.oldPass) {
      throw Error400(
        req,
        __('HrService.updateHrPassword.passwordSameAsBefore')
      );
    }

    const hrData = await Utils.hrToMany(req, hrId, ['pass', 'email']);

    const plainPass = AES.decrypt(hrData.pass, process.env.PASS_ENCTYPT_KEY);

    if (plainPass !== data.oldPass) {
      throw Error400(
        req,
        __('HrService.updateHrPassword.wrongCurrentPassword')
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
      .table('hrs')
      .where('id', hrId);

    const companyData = await Utils.hrToManyCompany(req, hrId, ['domain']);

    EmailManager.sendChangePasswordEmailHr(
      hrData.email,
      companyData.domain,
      {}
    );

    return {
      success: true,
      message: __('HrService.updateHrPassword.success'),
    };
  }

  static async editJobPosition(
    req: any,
    data: { id: number; newName: string }
  ): Promise<BasicResponse> {
    const positionId = data.id;
    const hrId = req.session.hrId;
    const divId = await Utils.hrToDivId(req, hrId);

    if (!(await HrService.hrCanEditJobPosition(req, data.id)).canEdit) {
      throw Error400(
        req,
        __('HrService.editJobPosition.positionUsedByInterview')
      );
    }

    const rightsCheck = await SQLManager.knex
      .select(SQLManager.knex.raw('1'))
      .from('job_positions')
      .where('id', positionId)
      .where('division_id', divId)
      .limit(1);

    if (rightsCheck.length <= 0) {
      throw Error400(
        req,
        __('HrService.editJobPosition.jobPositionNoLongerExist')
      );
    }

    const nameCheck = await SQLManager.knex
      .select(SQLManager.knex.raw('1'))
      .from('job_positions')
      .where('name', data.newName)
      .where('division_id', divId)
      .limit(1);

    if (nameCheck.length > 0) {
      throw Error400(req, __('HrService.editJobPosition.nameAlreadyUsed'));
    }

    await SQLManager.knex
      .update({
        name: data.newName,
      })
      .table('job_positions')
      .where('id', positionId)
      .where('division_id', divId);

    return {
      success: true,
      message: __('HrService.editJobPosition.success'),
    };
  }

  static async deleteJobPositionForm(
    req: any,
    data: { id: number; jobPositionId: number }
  ): Promise<BasicResponse> {
    const posId = data.jobPositionId;
    const formId = data.id;
    const hrId = req.session.hrId;
    const divId = await Utils.hrToDivId(req, hrId);

    if (
      !(await HrService.hrCanEditJobFormular(req, data.id, data.jobPositionId))
        .canEdit
    ) {
      throw Error400(
        req,
        __('HrService.deleteJobPositionForm.positionUsedByInterview')
      );
    }

    await DeleteManager.deleteForm(formId);

    return {
      success: true,
      message: __('HrService.deleteJobPositionForm.success'),
    };
  }

  static async deleteJobPosition(
    req: any,
    data: { id: number }
  ): Promise<BasicResponse> {
    const positionId = data.id;
    const hrId = req.session.hrId;
    const divId = await Utils.hrToDivId(req, hrId);

    if (!(await HrService.hrCanEditJobPosition(req, data.id)).canEdit) {
      throw Error400(
        req,
        __('HrService.deleteJobPosition.positionUsedByInterview')
      );
    }

    const rightsCheck = await SQLManager.knex
      .select(SQLManager.knex.raw('1'))
      .from('job_positions')
      .where('id', positionId)
      .where('division_id', divId)
      .limit(1);

    if (rightsCheck.length <= 0) {
      throw Error400(
        req,
        __('HrService.deleteJobPosition.positionNoLongerExist')
      );
    }

    await SQLManager.knex
      .delete()
      .from('job_positions_forms')
      .where('job_position_id', positionId)
      .where('division_id', divId);

    await DeleteManager.deletePosition(positionId);

    return {
      success: true,
      message: __('HrService.deleteJobPosition.success'),
    };
  }

  static async addJobPositionForm(
    req: any,
    data: { name: string; langCode: string; jobPositionId: number }
  ): Promise<BasicResponse> {
    const name = data.name;
    const hrId = req.session.hrId;
    const divId = await Utils.hrToDivId(req, hrId);

    const formsData = await SQLManager.knex
      .select({
        total: SQLManager.knex.raw('COUNT(id)'),
      })
      .from('job_positions_forms')
      .where('division_id', divId);
    const formsAmout = +formsData[0].total;

    const canAdd = await PricingManager.canIncrementAmount(
      req,
      hrId,
      formsAmout,
      'formsTotal'
    );
    if (!canAdd) {
      throw Error400(
        req,
        __('HrService.addJobPositionForm.formsTotalLimitReached')
      );
    }

    await SQLManager.knex
      .insert({
        job_position_id: data.jobPositionId,
        division_id: divId,
        lang_code: data.langCode,
        name,
        data: '{ "pairs": [] }',
      })
      .into('job_positions_forms');

    return {
      success: true,
      message: __('HrService.addJobPositionForm.success'),
    };
  }

  static async editJobPositionForm(
    req: any,
    data: {
      id: number;
      newName: string;
      newLangCode: string;
      jobPositionId: number;
    }
  ): Promise<BasicResponse> {
    const name = data.newName;
    const formId = data.id;
    const posId = data.jobPositionId;
    const hrId = req.session.hrId;
    const divId = await Utils.hrToDivId(req, hrId);

    if (
      !(await HrService.hrCanEditJobFormular(req, data.id, data.jobPositionId))
        .canEdit
    ) {
      throw Error400(
        req,
        __('HrService.editJobPositionForm.positionUsedByInterview')
      );
    }

    await SQLManager.knex
      .update({
        name,
        lang_code: data.newLangCode,
      })
      .table('job_positions_forms')
      .where('id', formId)
      .where('division_id', divId);

    return {
      success: true,
      message: __('HrService.editJobPositionForm.success'),
    };
  }

  static async addJobPosition(
    req: any,
    data: { name: string }
  ): Promise<BasicResponse> {
    const name = data.name;
    const hrId = req.session.hrId;
    const divId = await Utils.hrToDivId(req, hrId);

    const nameCheck = await SQLManager.knex
      .select(SQLManager.knex.raw('1'))
      .from('job_positions')
      .where('name', name)
      .where('division_id', divId)
      .limit(1);

    if (nameCheck.length > 0) {
      throw Error400(req, __('HrService.addJobPosition.nameAlreadyUsed'));
    }

    const posesData = await SQLManager.knex
      .select({
        total: SQLManager.knex.raw('COUNT(id)'),
      })
      .from('job_positions')
      .where('division_id', divId);
    const posAmount = +posesData[0].total;

    const canAdd = await PricingManager.canIncrementAmount(
      req,
      hrId,
      posAmount,
      'positionTotal'
    );
    if (!canAdd) {
      throw Error400(
        req,
        __('HrService.addJobPosition.positionTotalLimitReached')
      );
    }

    const {
      company_id: companyId,
      division_id: divisionId,
    } = await Utils.hrToMany(req, hrId, ['company_id', 'division_id']);

    await SQLManager.knex
      .insert({
        company_id: companyId,
        division_id: divisionId,
        name,
      })
      .into('job_positions');

    return {
      success: true,
      message: __('HrService.addJobPosition.success'),
    };
  }

  static async getJobPositionForms(
    req: any,
    positionId: number
  ): Promise<JobPositionForms> {
    const hrId = req.session.hrId;
    const divId = await Utils.hrToDivId(req, hrId);

    const positionData = SQLManager.knex
      .select('name')
      .from('job_positions')
      .where('id', positionId)
      .where('division_id', divId)
      .limit(1);

    const formsData = SQLManager.knex
      .select(['id', 'name', 'data', 'lang_code'])
      .from('job_positions_forms')
      .where('division_id', divId)
      .where('job_position_id', positionId);

    const [pos, forms] = await Promise.all([positionData, formsData]);

    if (pos.length <= 0) {
      throw Error400(
        req,
        __('HrService.getJobPositionForms.positionNoLongerExist')
      );
    }

    const posName = pos[0].name;

    return {
      name: posName,
      forms: forms.map((f) => {
        return {
          id: f.id,
          name: f.name,
          questions: JSON.parse(f.data).pairs.length,
          defaultLanguage: f.lang_code,
        };
      }),
    };
  }

  static async editJobPositionFormData(
    req: any,
    positionId: number,
    formId: number,
    data: { data: string }
  ): Promise<BasicResponse> {
    const hrId = req.session.hrId;
    const divId = await Utils.hrToDivId(req, hrId);

    if (
      !(await HrService.hrCanEditJobFormular(req, positionId, formId)).canEdit
    ) {
      throw Error400(
        req,
        __('HrService.editJobPositionFormData.positionUsedByInterview')
      );
    }

    const checkQuery = await SQLManager.knex
      .select(SQLManager.knex.raw('1'))
      .from('job_positions_forms')
      .where('id', formId)
      .where('division_id', divId)
      .limit(1);

    if (checkQuery.length <= 0) {
      throw Error400(
        req,
        __('HrService.editJobPositionFormData.templateNoLongerExist')
      );
    }

    await SQLManager.knex
      .update({
        data: data.data,
      })
      .table('job_positions_forms')
      .where('id', formId)
      .where('division_id', divId);

    await InterviewService.updateInterviewMedals(req, formId);

    return {
      success: true,
      message: __('HrService.editJobPositionFormData.success'),
    };
  }

  static async getJobPositionForm(
    req: any,
    positionId: number,
    formId: number,
    withoutLogin: boolean
  ): Promise<JobPositionForm> {
    let formData;

    if (withoutLogin) {
      formData = await SQLManager.knex
        .select('name', 'data', 'lang_code')
        .from('job_positions_forms')
        .where('id', formId)
        .limit(1);
    } else {
      const hrId = req.session.hrId;
      const divId = await Utils.hrToDivId(req, hrId);

      formData = await SQLManager.knex
        .select('name', 'data', 'lang_code')
        .from('job_positions_forms')
        .where('id', formId)
        .where('division_id', divId)
        .limit(1);
    }

    if (formData.length <= 0) {
      throw Error400(
        req,
        __('HrService.getJobPositionForm.templateNoLongerExist')
      );
    }

    const medalCategories = [];

    const formJson = JSON.parse(formData[0].data);

    const medalsData = await SQLManager.knex
      .select({
        id: 'medals.id',
        tag: 'medals.tag',
        uuid: 'job_interviews_weight.qp_uuid',
        weight: 'job_interviews_weight.weight',
      })
      .from('job_interviews_weight')
      .leftJoin('medals', 'job_interviews_weight.medal_id', 'medals.id')

      .where('job_interviews_weight.form_id', formId);

    const medalsObj = {};

    const getMedalCategoryName = (uuid: string) => {
      const qp = formJson.pairs.find((p) => p.uuid === uuid);
      if (!qp) {
        return __('HrService.getHrInterview.unnamedMedalCategory');
      }

      return `${qp.name} - ${qp.a.type} Medals`;
    };

    for (const medal of medalsData) {
      const { tag, uuid, weight, id } = medal;
      const objKey = uuid ? uuid : 'global';

      if (!medalsObj[objKey]) {
        medalsObj[objKey] = {
          name: uuid
            ? getMedalCategoryName(uuid)
            : __('HrService.getHrInterview.globalMedalCategory'),
          medals: [],
        };
      }

      medalsObj[objKey].medals.push({
        name: Utils.getMedalName(tag),
        qpUuid: uuid,
        medalId: id,
        tag,
        weight,
      });
    }

    Object.keys(medalsObj).forEach((k) => {
      const medal = medalsObj[k];
      medalCategories.push({
        medals: medal.medals,
        name: medal.name,
      });
    });

    return {
      defaultLanguage: formData[0].lang_code,
      name: formData[0].name,
      data: formData[0].data,
      medalCategories,
    };
  }

  static async getHrMailPass(req: any): Promise<BasicResponse> {
    const hrId = req.session.hrId;

    const { division_id: divId } = await Utils.hrToMany(req, hrId, [
      'division_id',
    ]);

    const divData = await SQLManager.knex
      .select(['mail_pass'])
      .from('division')
      .where('id', divId);

    if (divData <= 0) {
      throw Error400(req, __('HrService.getHrMailPass.divisionNoLongerExist'));
    }

    const mailPass = divData[0].mail_pass;

    const plainPass = AES.decrypt(mailPass, process.env.PASS_ENCTYPT_KEY);

    return {
      success: true,
      message: __('HrService.getHrMailPass.success', { pass: plainPass }),
    };
  }

  static async loginSocketHr(
    req: any,
    socketId: string
  ): Promise<BasicResponse> {
    const hrId = req.session.hrId;
    const divId = await Utils.hrToDivId(req, hrId);

    SocketServer.loginHr(socketId, divId, hrId);

    return { success: true, message: __('HrService.loginSocketHr.success') };
  }

  static async getHrSettings(req: any): Promise<HrSettings> {
    const hrId = req.session.hrId;

    const hrQuery = SQLManager.knex
      .select(['name', 'email', 'division_id'])
      .from('hrs')
      .where('id', hrId)
      .limit(1);

    const companyQuery = Utils.hrToManyCompany(req, hrId, [
      'name',
      'sub_model',
      'domain',
      'tokens',
    ]);

    const [[hrData], companyData] = await Promise.all([hrQuery, companyQuery]);

    const divData = await SQLManager.knex
      .select(['tag', 'name'])
      .from('division')
      .where('id', hrData.division_id)
      .limit(1);

    if (divData.length <= 0) {
      throw Error400(req, __('HrService.getHrSettings.divisionNoLongerExist'));
    }

    const conf: any[] = config.get('plans');
    const planData = conf.find((plan) => {
      return plan.id === companyData['sub_model'];
    });

    return {
      name: hrData.name,
      email: hrData.email,
      company: companyData.name,
      tokens: companyData.tokens,
      plan: planData.name,
      domain: companyData.domain,
      divName: divData[0].name,
      divMail: `${companyData.domain}.${divData[0].tag}@hiroo.eu`,
    };
  }

  static async getJobPositions(req: any): Promise<JobPositions> {
    const hrId = req.session.hrId;
    const divId = await Utils.hrToDivId(req, hrId);

    const posId = SQLManager.knex.raw('??', 'job_positions.id');

    const formsQuery = SQLManager.knex
      .select([])
      .count('id')
      .from('job_positions_forms')
      .where('job_position_id', posId)
      .as('forms');

    const data = await SQLManager.knex
      .select(['id', 'name', formsQuery])
      .from('job_positions')
      .where('division_id', divId);

    if (data.length <= 0) {
      return {
        positions: [],
      };
    }

    return {
      positions: data,
    };
  }

  static async resetHrPasswordValidate(
    req: any,
    data: {
      resetPassKey: string;
    }
  ): Promise<BasicResponse> {
    const validateRes = await SQLManager.knex
      .select(['id'])
      .from('hrs')
      .where('reset_pass_key', data.resetPassKey)
      .limit(1);
    if (validateRes.length <= 0) {
      throw Error400(
        req,
        __('HrService.resetHrPasswordValidate.linkNoLongerValid')
      );
    }

    return {
      success: true,
      message: __('HrService.resetHrPasswordValidate.success'),
    };
  }

  static async resetHrPassword(
    req: any,
    data: {
      password: string;
      passwordAgain: string;
      resetPassKey: string;
    }
  ): Promise<BasicResponse> {
    if (data.password !== data.passwordAgain) {
      throw Error400(req, __('HrService.resetHrPassword.passwordsDoesntMatch'));
    }

    const validateRes = await SQLManager.knex
      .select(['id', 'email', 'company_id'])
      .from('hrs')
      .where('reset_pass_key', data.resetPassKey)
      .limit(1);

    if (validateRes.length <= 0) {
      throw Error400(req, __('HrService.resetHrPassword.linkNoLongerValid'));
    }

    const hashedPass = AES.encrypt(data.password, process.env.PASS_ENCTYPT_KEY);

    const email = validateRes[0].email;
    const domain = await Utils.companyIdToDomain(
      req,
      validateRes[0].company_id
    );

    EmailManager.sendResetPasswordSuccessEmailHr(email, domain, {});

    await SQLManager.knex
      .update({
        reset_pass_key: null,
        pass: hashedPass,
      })
      .table('hrs')
      .where('id', validateRes[0].id);

    return {
      success: true,
      message: __('HrService.resetHrPassword.success'),
    };
  }

  static async requestResetHrPassword(
    req: any,
    data: {
      email: string;
    }
  ): Promise<BasicResponse> {
    if (Utils.isValidEmail(data.email) === false) {
      throw Error400(req, __('HrService.requestResetHrPassword.emailNotValid'));
    }

    const validateRes = await SQLManager.knex
      .select(['id', 'reset_pass_at'])
      .from('hrs')
      .where('email', data.email)
      .limit(1);

    if (validateRes.length <= 0) {
      throw Error400(
        req,
        __('HrService.requestResetHrPassword.emailUsedByOtherHr')
      );
    }

    const hrId = validateRes[0].id;
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
        __('HrService.requestResetHrPassword.emailRquestLimitReached')
      );
    }

    const key = Utils.generateUuid();

    const domain = await Utils.hrToDomain(req, hrId);

    EmailManager.sendResetPasswordEmailHr(data.email, domain, {
      resetPassKey: key,
    });

    await SQLManager.knex
      .update({
        reset_pass_at: Date.now().toString(),
        reset_pass_key: key,
      })
      .table('hrs')
      .where('email', data.email);

    return {
      success: true,
      message: __('HrService.requestResetHrPassword.success'),
    };
  }

  static async sendHrSupportEmail(
    req: any,
    data: {
      name: string;
      email: string;
      subject: string;
      description: string;
    }
  ): Promise<BasicResponse> {
    const hrId = req.session.hrId;
    const companyId = await Utils.hrIdToCompanyId(req, hrId);

    await SQLManager.knex
      .insert({
        ...data,
        company_id: companyId,
      })
      .into('support');

    EmailManager.sendSupportEmail({
      ...data,
      companyId,
      hrId,
    });

    return {
      success: true,
      message: __('HrService.sendHrSupportEmail.success'),
    };
  }

  static async getMeInfoHr(req: any): Promise<MeInfoHr> {
    const hrId = req.session.hrId;

    const hrData = await SQLManager.knex
      .select('name')
      .from('hrs')
      .where('id', hrId)
      .limit(1);

    if (hrData.length <= 0) {
      throw Error404(req, __('HrService.getMeInfoHr.hrNotFound'));
    }

    return {
      name: hrData[0].name,
    };
  }

  static async authCheckHr(
    req: any,
    data: { authKey: string }
  ): Promise<BasicResponse> {
    const keyData = await SQLManager.knex
      .select(SQLManager.knex.raw('id'))
      .from('hrs')
      .where('auth_key', data.authKey)
      .limit(1);

    if (keyData.length <= 0) {
      throw Error404(req, __('HrService.authCheckHr.hrNotFound'));
    }

    if (!req.session.hrId) {
      req.session.hrId = keyData[0].id;
    }

    const hrId = keyData[0].id;
    const divId = await Utils.hrToDivId(req, hrId);
    const companyId = await Utils.hrIdToCompanyId(req, hrId);

    const posData = await SQLManager.knex
      .select(['id'])
      .from('job_positions')
      .where('division_id', divId)
      .where('company_id', companyId)
      .orderBy('id', 'asc')
      .limit(1);

    const posId = posData[0].id;

    return {
      success: true,
      message: __('HrService.authCheckHr.success'),
      data: {
        posId,
      },
    };
  }

  static async loginHr(
    req: any,
    data: HrLoginData
  ): Promise<LoginGlobalResponse> {
    if (!Utils.isValidEmail(data.email)) {
      throw Error400(req, __('HrService.loginHr.emailNotValid'));
    }

    const domainRes = await SQLManager.knex
      .select(['id'])
      .from('company')
      .where('domain', data.domain)
      .limit(1);

    if (domainRes.length <= 0) {
      throw Error404(req, __('HrService.loginHr.domainNotFound'));
    }

    const companyId = domainRes[0].id;

    const dataRes = await SQLManager.knex
      .select(['pass', 'id', 'activation_code'])
      .from('hrs')
      .where('email', data.email)
      .where('company_id', companyId)
      .limit(1);

    if (dataRes.length <= 0) {
      throw Error400(req, __('HrService.loginHr.wrongLoginInfo'));
    }

    if (dataRes[0].activation_code) {
      throw Error400(req, __('HrService.loginHr.registrationNotFinished'));
    }

    const plainPass = AES.decrypt(
      dataRes[0].pass,
      process.env.PASS_ENCTYPT_KEY
    );

    if (plainPass !== data.password) {
      throw Error400(req, __('HrService.loginHr.wrongLoginInfo'));
    }

    const key = Utils.generateUuid();
    await SQLManager.knex
      .update({
        auth_key: key,
      })
      .table('hrs')
      .where('id', dataRes[0].id);

    req.session.hrId = dataRes[0].id;

    return {
      success: true,
      message: __('HrService.loginHr.success'),
      domain: data.domain,
      key,
    };
  }

  static async getPreconfirmPerson(
    req: any,
    confirmationCode: string
  ): Promise<PreconfirmHr> {
    const hrRes = await SQLManager.knex
      .select('email')
      .from('hrs')
      .where('activation_code', confirmationCode)
      .limit(1);

    if (hrRes.length <= 0) {
      throw Error400(
        req,
        __('HrService.getPreconfirmPerson.linkNoLongerValid')
      );
    }

    return {
      email: hrRes[0].email,
    };
  }

  static async confirmPerson(
    req: any,
    data: {
      passwordConfirm: string;
      password: string;
      actiovationCode: string;
    }
  ): Promise<BasicResponse> {
    if (data.password !== data.passwordConfirm) {
      throw Error400(req, __('HrService.confirmPerson.passwordsDoesntMatch'));
    }

    const validateRes = await SQLManager.knex
      .select(['id', 'email', 'company_id'])
      .from('hrs')
      .where('activation_code', data.actiovationCode)
      .limit(1);

    if (validateRes.length <= 0) {
      throw Error400(req, __('HrService.confirmPerson.linkNoLongerValid'));
    }

    const hrId = validateRes[0].id;
    const hrEmail = validateRes[0].email;
    const companyId = validateRes[0].company_id;

    const domainRes = await SQLManager.knex
      .select(['domain'])
      .from('company')
      .where('id', companyId)
      .limit(1);

    if (domainRes.length <= 0) {
      throw Error400(req, __('HrService.confirmPerson.companyNoLongerExist'));
    }

    const domain = domainRes[0].domain;

    await EmailManager.sendHrRegistrationFinishEmail(hrEmail, domain, {});

    const encryptedPass = AES.encrypt(
      data.password,
      process.env.PASS_ENCTYPT_KEY
    );

    await SQLManager.knex
      .update({
        activation_code: null,
        pass: encryptedPass,
      })
      .table('hrs')
      .where('id', hrId);

    return {
      success: true,
      message: __('HrService.confirmPerson.success'),
    };
  }

  static async getHrEmails(req: any): Promise<MailsResponse> {
    const hrId = req.session.hrId;
    const divId = await Utils.hrToDivId(req, hrId);

    const emails = await SQLManager.knex
      .select(['id', 'name', 'type', 'content'])
      .from('hr_emails')
      .where('division_id', divId);

    return { mails: emails };
  }

  static async addHrEmail(
    req: any,
    name: string,
    type: string
  ): Promise<BasicResponse> {
    const hrId = req.session.hrId;
    const divId = await Utils.hrToDivId(req, hrId);

    const nameCheck = await SQLManager.knex
      .select('name')
      .from('hr_emails')
      .where('division_id', divId)
      .where('name', name);

    if (nameCheck.length > 0) {
      throw Error400(req, __('HrService.addHrEmail.nameAlreadyUsed'));
    }

    const mailsData = await SQLManager.knex
      .select({
        total: SQLManager.knex.raw('COUNT(id)'),
      })
      .from('hr_emails')
      .where('division_id', divId);
    const mailsAmount = +mailsData[0].total;

    const templateData = await SQLManager.knex
      .select(['content'])
      .from('hr_email_templates')
      .where('type', type)
      .limit(1);

    let contentInit =
      '<p>' + __('HrService.addHrEmail.defaultEmailText') + '</p>';

    if (templateData.length > 0) {
      contentInit = templateData[0].content;
    }

    const canAdd = await PricingManager.canIncrementAmount(
      req,
      hrId,
      mailsAmount,
      'mailTotal'
    );
    if (!canAdd) {
      throw Error400(req, __('HrService.addHrEmail.mailTotalLimitReached'));
    }

    await SQLManager.knex
      .insert({
        division_id: divId,
        name,
        type,
        content: contentInit,
        attachments: '[]',
      })
      .into('hr_emails');

    return {
      success: true,
      message: __('HrService.addHrEmail.success'),
    };
  }

  static async getHrEmail(req: any, emailId: number): Promise<Mail> {
    const hrId = req.session.hrId;
    const divId = await Utils.hrToDivId(req, hrId);

    const email = await SQLManager.knex
      .select(['id', 'name', 'type', 'content', 'subject', 'attachments'])
      .from('hr_emails')
      .where('division_id', divId)
      .where('id', emailId)
      .limit(1);

    if (email.length <= 0) {
      throw Error400(req, __('HrService.getHrEmail.emailNotFound'));
    }
    return {
      ...email[0],
      attachments: JSON.parse(email[0].attachments),
    };
  }

  static async sendHrEmailPreview(
    req: any,
    emailId: number,
    reciever: string,
    intId: number
  ): Promise<BasicResponse> {
    const data = await HrService.getHrEmailPreview(req, emailId, intId);

    await EmailManager.sendEmptyMailWithId(
      reciever,
      data.content,
      data.subject,
      emailId
    );

    return {
      success: true,
      message: __('HrService.sendHrEmailPreview.success'),
    };
  }

  static async getHrEmailPreview(
    req: any,
    emailId: number,
    intId: number
  ): Promise<MailPreview> {
    const hrId = req.session.hrId;
    const divId = await Utils.hrToDivId(req, hrId);

    const email = await SQLManager.knex
      .select(['content', 'type', 'subject'])
      .from('hr_emails')
      .where('division_id', divId)
      .where('id', emailId)
      .limit(1);

    if (email.length <= 0) {
      throw Error404(req, __('HrService.getHrEmailPreview.emailNotFound'));
    }

    const content = email[0].content;

    const interviewData = await SQLManager.knex
      .select({
        testUserTag: 'test_user_tag',
      })
      .from('job_interviews')
      .where('id', intId)
      .limit(1);

    if (interviewData.length <= 0) {
      throw Error404(req, __('HrService.getHrEmailPreview.interviewNotFound'));
    }

    const { testUserTag } = interviewData[0];

    const obj: PlaceholderData = {
      companyId: await Utils.hrIdToCompanyId(req, req.session.hrId),
      divId: await Utils.hrToDivId(req, req.session.hrId),
      intId,
      candidateEmail: __('HrService.getHrEmailPreview.testCandidate.email'),
      candidateName: __('HrService.getHrEmailPreview.testCandidate.name'),
      candidateTag: testUserTag,
      candidateType: 'automatic',
    };

    const newContent = await PlaceholderManager.i.parseEmail(
      content,
      email[0].type,
      obj
    );

    return {
      content: newContent,
      subject: email[0].subject,
    };
  }

  static async deleteHrEmail(
    req: any,
    emailId: number
  ): Promise<BasicResponse> {
    const hrId = req.session.hrId;
    const divId = await Utils.hrToDivId(req, hrId);

    DeleteManager.deleteEmail(emailId);

    return { success: true, message: __('HrService.deleteHrEmail.success') };
  }

  static async editHrEmail(
    req: any,
    emailId: number,
    name: string,
    type: string
  ): Promise<BasicResponse> {
    const hrId = req.session.hrId;
    const divId = await Utils.hrToDivId(req, hrId);

    if (!(await HrService.hrCanEditEmail(req, +emailId)).canEdit) {
      throw Error400(
        req,
        __('HrService.editHrEmailContent.positionUsedByInterview')
      );
    }

    const prevName = await SQLManager.knex
      .select('name')
      .from('hr_emails')
      .where('division_id', divId)
      .where('id', emailId)
      .limit(1);

    if (prevName[0].name !== name) {
      const nameCheck = await SQLManager.knex
        .select('name')
        .from('hr_emails')
        .where('division_id', divId)
        .where('name', name)
        .limit(1);

      if (nameCheck.length > 0) {
        throw Error400(req, __('HrService.editHrEmail.nameAlreadyUsed'));
      }
    }

    await SQLManager.knex
      .update({
        name,
        type,
      })
      .table('hr_emails')
      .where('division_id', divId)
      .where('id', emailId);

    return { success: true, message: __('HrService.editHrEmail.success') };
  }

  static async editHrEmailContent(
    req: any,
    emailId: string,
    content: string,
    subject: string,
    attachments: string[]
  ): Promise<BasicResponse> {
    const hrId = req.session.hrId;
    const divId = await Utils.hrToDivId(req, hrId);

    if (!(await HrService.hrCanEditEmail(req, +emailId)).canEdit) {
      throw Error400(
        req,
        __('HrService.editHrEmailContent.positionUsedByInterview')
      );
    }

    const canAdd = await PricingManager.canUploadFile(
      req,
      hrId,
      Buffer.byteLength(Buffer.from(content)),
      'mailSize'
    );
    if (!canAdd) {
      throw Error400(req, __('HrService.addHrEmail.mailTotalLimitReached'));
    }

    await SQLManager.knex
      .update({
        content,
        subject,
        attachments: JSON.stringify(attachments),
      })
      .table('hr_emails')
      .where('division_id', divId)
      .where('id', emailId);

    return {
      success: true,
      message: __('HrService.editHrEmailContent.success'),
    };
  }
}
