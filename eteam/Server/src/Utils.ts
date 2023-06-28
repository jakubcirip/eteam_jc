import * as request from 'request';
import * as uuidv4 from 'uuid/v4';
import { SQLManager } from './api/managers/SQLManager';
import { Error400 } from './api/helpers/errors';

import { Placeholder } from './api/managers/PlaceholderManager';

import * as config from 'config';
import {
  UniversalMailDataPlaceholder,
  DivisionTagPlaceholder,
  DivisionNamePlaceholder,
  CompanyEmailPlaceholder,
  CompanyNamePlaceholder,
  PositionFormQuestionsAmountPlaceholder,
  PositionFormNamePlaceholder,
  PositionNamePlaceholder,
  InterviewNamePlaceholder,
  InterviewCandidatesAmountPlaceholder,
  InterviewTagPlaceholder,
  CandidateEmailPlaceholder,
  CandidateNamePlaceholder,
  CandidateTagPlaceholder,
  CandidateTypePlaceholder,
  CandidateInterviewUrlPlaceholder,
} from './api/classes/placeholders/SharedEmailPlaceholders';

const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export class Utils {
  public static getMedalVerbose(medalId: string) {
    const obj = {
      global_answer_submit_speed: {
        title: 'Answer Submit Speed',
        description:
          'How fast did the candidate submit results after interview start?',
      },

      global_camera_over_mic: {
        title: 'Camera or Microphone',
        description: 'Did candidate select camera over microphone?',
      },

      text_writing_speed: {
        title: 'Writing Speed',
        description: 'How fast did candidate type while answering question?',
      },

      text_keywords: {
        title: 'Keywords',
        description: 'How many keywords did candidate use in answer?',
      },

      text_self_review: {
        title: 'Self Review',
        description: 'How many stars did candidate give himself after answer?',
      },

      text_did_skip_self_review: {
        title: 'Self Review Continue',
        description: 'Did candidate use continue button after self review?',
      },

      audio_face_emotions: {
        title: 'Face Emotions',
        description: 'Work in progress ...',
      },

      audio_talking_speed: {
        title: 'Talking Speed',
        description: 'How fast did candidate talk while answering question?',
      },

      audio_talking_pauses: {
        title: 'Talking Pauses',
        description:
          'How many percent of candidate answer was he talking without pause?',
      },

      audio_keywords: {
        title: 'Keywords',
        description: 'How many keywords did candidate use in answer?',
      },

      audio_self_review: {
        title: 'Self Review',
        description: 'How many stars did candidate give himself after answer?',
      },

      audio_did_skip_self_review: {
        title: 'Self Review Continue',
        description: 'Did candidate use continue button after self review?',
      },

      select_one_correct_option: {
        title: 'Select Correct One',
        description: 'Did candidate select correct option?',
      },

      select_one_did_skip: {
        title: 'Select Continue',
        description: 'Did candidate use continue button after answer?',
      },

      select_one_self_review: {
        title: 'Self Review',
        description: 'How many stars did candidate give himself after answer?',
      },

      select_one_did_skip_self_review: {
        title: 'Self Review Continue',
        description: 'Did candidate use continue button after self review?',
      },

      select_many_correct_option: {
        title: 'Select Correct Many',
        description: 'How many correct options did candidate select?',
      },

      select_many_did_skip: {
        title: 'Select Continue',
        description: 'Did candidate use continue button after answer?',
      },

      select_many_self_review: {
        title: 'Self Review',
        description: 'How many stars did candidate give himself after answer?',
      },

      select_many_did_skip_self_review: {
        title: 'Self Review Continue',
        description: 'Did candidate use continue button after self review?',
      },
    };

    return obj[medalId]
      ? obj[medalId]
      : {
          title: 'Unnamed medal',
          description: 'Medal not found.',
        };
  }

  static getMedalName(tag: string) {
    return Utils.getMedalVerbose(tag).title;
  }

  static isValidSubdomain(str: string) {
    const isValidSlug = /^[a-z](-?[a-z])*$/g.test(str);
    return isValidSlug;
  }

  static isValidEmail(email: string): boolean {
    return re.test(String(email).toLowerCase());
  }

  static generateUuid(): string {
    return uuidv4();
  }

  static getAllMailPlaceholders(): Placeholder[] {
    return [
      new CandidateInterviewUrlPlaceholder(),
      new CandidateEmailPlaceholder(),
      new CandidateNamePlaceholder(),
      new CandidateTagPlaceholder(),
      new CandidateTypePlaceholder(),
      new DivisionTagPlaceholder(),
      new DivisionNamePlaceholder(),
      new CompanyEmailPlaceholder(),
      new CompanyNamePlaceholder(),
      // new CompanyIcoPlaceholder(),
      new PositionFormQuestionsAmountPlaceholder(),
      new PositionFormNamePlaceholder(),
      new PositionNamePlaceholder(),
      new InterviewNamePlaceholder(),
      new InterviewTagPlaceholder(),
      new InterviewCandidatesAmountPlaceholder(),
      ...Utils.getMailDataPlaceholders(),
    ];
  }

  static getMailDataPlaceholders(): Placeholder[] {
    const langObj = [
      {
        name: 'registration',
        title: __('emailPlaceholders.shared.registrationDate.title'),
      },
      {
        name: 'registration_fail',
        title: __('emailPlaceholders.shared.registrationFailDate.title'),
      },
      {
        name: 'nonstopinterview_accept',
        title: __('emailPlaceholders.shared.nonstopAccept.title'),
      },
      {
        name: 'nonstopinterview_reject',
        title: __('emailPlaceholders.shared.nonstopReject.title'),
      },
      {
        name: 'start',
        title: __('emailPlaceholders.shared.startDate.title'),
      },
      {
        name: 'remind',
        title: __('emailPlaceholders.shared.remindDate.title'),
      },
      {
        name: 'submit',
        title: __('emailPlaceholders.shared.submitDate.title'),
      },
      {
        name: 'end',
        title: __('emailPlaceholders.shared.enDate.title'),
      },
    ];
    const configData: any[] = config.get('mailTypes');
    const mailTypes = configData
      .map((t) => {
        if (t.staticDate) {
          return new UniversalMailDataPlaceholder(
            t.name,
            langObj.find((l) => l.name === t.name).title
          );
        } else {
          return null;
        }
      })
      .filter((i) => i !== null);

    return mailTypes;
  }

  static async isInterviewUserTagValid(
    userTag: string,
    intTag: string
  ): Promise<boolean> {
    const testRes = await SQLManager.knex
      .select([SQLManager.knex.raw('1')])
      .from('job_interviews')
      .where('tag', intTag)
      .where('test_user_tag', userTag)
      .limit(1);

    if (testRes.length > 0) {
      return true;
    }

    const intData = await SQLManager.knex
      .select(['id'])
      .from('job_interviews')
      .where('tag', intTag)
      .limit(1);

    if (intData.length <= 0) {
      return false;
    }

    const intId = intData[0].id;

    const typeRes = await SQLManager.knex
      .select([SQLManager.knex.raw('1')])
      .from('job_interviews')
      .where('state', 'pending')
      .limit(1);

    if (typeRes.length <= 0) {
      return false;
    }

    const startDateRes = await SQLManager.knex
      .select(['date'])
      .from('job_interviews_data')
      .where('int_id', intId)
      .where('type', 'start')
      .limit(1);

    if (startDateRes.length <= 0) {
      return false;
    }

    if (!startDateRes[0].date) {
      return false;
    }

    if (startDateRes[0].date.getTime() - Date.now() > 0) {
      return false;
    }

    const res = await SQLManager.knex
      .select([SQLManager.knex.raw('1')])
      .from('job_interviews_people')
      .where('tag', userTag)
      .limit(1);

    if (res.length > 0) {
      return true;
    }

    return false;
  }

  static async interviewTagToData(req, tag: string): Promise<any> {
    const res = await SQLManager.knex
      .select({
        posId: 'job_position_id',
        formId: 'job_position_form_id',
        prelog: 'prelog',
        color: 'color',
        image: 'image',
        dark: 'dark',
      })
      .from('job_interviews')
      .where('tag', tag)
      .limit(1);

    if (res.length <= 0) {
      throw Error400(req, __('Utils.interviewTagToData.interviewRemoved'));
    }

    return {
      ...res[0],
      dark: res[0].dark === 0 ? false : true,
    };
  }

  static async generateInterviewTag(i = 0): Promise<string> {
    const newTag = this.generateFileId(8);

    const checkQuery = await SQLManager.knex
      .select([SQLManager.knex.raw('1')])
      .from('job_interviews')
      .where('tag', newTag)
      .limit(1);

    if (checkQuery.length <= 0) {
      return newTag;
    }

    if (i >= 10) {
      return null;
    }

    return Utils.generateInterviewTag(i + 1);
  }

  static generateFileId(length = 8): string {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  static async getPlanByCompanyId(req: any, companyId: number) {
    const data = await SQLManager.knex
      .select(['sub_model'])
      .from('company')
      .where('id', companyId)
      .limit(1);

    if (data.length <= 0) {
      throw Error400(req, __('Utils.shared.companyNotFound'));
    }

    return data[0].sub_model;
  }

  static async deleteHr(hrId: number) {
    await SQLManager.knex.delete().from('hrs').where('id', hrId);
  }

  static async hrToMany(req: any, hrId: number, toSelect: string[]) {
    const data = await SQLManager.knex
      .select(toSelect)
      .from('hrs')
      .where('id', hrId)
      .limit(1);

    console.log(data);

    if (data.length <= 0) {
      throw Error400(req, __('Utils.shared.companyNotFound'));
    }

    return data[0];
  }

  static async hrToDivId(req, hrId: number) {
    return (await Utils.hrToMany(req, hrId, ['division_id'])).division_id;
  }

  static async divToMany(req: any, divId: number, toSelect: string[]) {
    const data = await SQLManager.knex
      .select(toSelect)
      .from('division')
      .where('id', divId)
      .limit(1);

    if (data.length <= 0) {
      throw Error400(req, __('Utils.divToMany.divisionRemoved'));
    }

    return data[0];
  }

  static async companyToMany(req, companyId: number, toSelect: string[]) {
    const data = await SQLManager.knex
      .select(toSelect)
      .from('company')
      .where('id', companyId)
      .limit(1);

    if (data.length <= 0) {
      throw Error400(req, __('Utils.shared.companyNotFound'));
    }

    return data[0];
  }

  static async hrToManyCompany(req, hrId: number, toSelect: string[]) {
    const hrQuery = SQLManager.knex
      .queryBuilder()
      .select('company_id')
      .from('hrs')
      .where('id', hrId);

    const data = await SQLManager.knex
      .select(toSelect)
      .from('company')
      .where('id', hrQuery)
      .limit(1);

    if (data.length <= 0) {
      throw Error400(req, __('Utils.shared.companyNotFound'));
    }

    return data[0];
  }

  static async hrIdToCompanyId(req: any, hrId: number) {
    const data = await SQLManager.knex
      .select(['company_id'])
      .from('hrs')
      .where('id', hrId)
      .limit(1);

    if (data.length <= 0) {
      throw Error400(req, __('Utils.shared.companyNotFound'));
    }

    return data[0].company_id;
  }

  static async companyIdToDomain(req: any, companyId: number) {
    const domainRes = await SQLManager.knex
      .select(['domain'])
      .from('company')
      .where('id', companyId)
      .limit(1);

    if (domainRes.length <= 0) {
      throw Error400(req, __('Utils.shared.companyNotFound'));
    }

    const domain = domainRes[0].domain;

    return domain;
  }

  static async hrToDomain(req: any, hrId: number) {
    const hrQuery = SQLManager.knex
      .queryBuilder()
      .select('company_id')
      .from('hrs')
      .where('id', hrId);

    const domainRes = await SQLManager.knex
      .select(['domain'])
      .from('company')
      .where('id', hrQuery)
      .limit(1);

    if (domainRes.length <= 0) {
      throw Error400(req, __('Utils.shared.companyNotFound'));
    }

    const domain = domainRes[0].domain;

    return domain;
  }
}

export class IcoValidator {
  static validIcoAsync(ico: string): Promise<boolean> {
    return new Promise((p) => {
      request.get(
        'https://ico.hiroo.eu/api.php?apikey=' +
          process.env.PHP_API_KEY +
          '&ico=' +
          ico,
        (err, res, body) => {
          if (err) {
            p(false);
            return;
          }

          if (body === 'true') {
            p(true);
          } else {
            p(false);
          }
        }
      );
    });
  }

  static validIco(value) {
    let $newValue;
    let $remainingDigits;
    let i;
    let j;

    if (value.length === 8) {
      return value.match(/^\d+$/) && IcoValidator.lastNumberValid(value);
    } else {
      $remainingDigits = 8 - value.length;
      $newValue = value;
      i = 0;
      j = $remainingDigits;
      while (i < j) {
        $newValue = '0' + $newValue;
        i++;
      }

      return (
        $newValue.length === 8 &&
        $newValue.match(/^\d+$/) &&
        IcoValidator.lastNumberValid($newValue)
      );
    }
  }

  static lastNumberValid(value) {
    return (
      parseInt(value[value.length - 1], 10) ===
      IcoValidator.calculateValidLastNumber(value)
    );
  }

  static calculateValidLastNumber(value) {
    let sum = 0;
    for (let i = 0; i <= 6; i++) {
      sum += value[i] * (8 - i);
    }
    const mod = sum % 11;
    if (mod === 0 || mod === 10) {
      return 1;
    }
    if (mod === 1) {
      return 0;
    }
    return 11 - mod;
  }
}
