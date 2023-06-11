import { ExportHrInterviewPdfParamIntId } from '../models/swaggerTypes';
import { UpdateInterviewNotesResponse } from '../models/swaggerTypes';
import * as archiver from 'archiver';

import { UpdateInterviewNotesParamIntId } from '../models/swaggerTypes';
import { UpdateInterviewNotesParamCanId } from '../models/swaggerTypes';
import {
  GetHrInterviewImagesResponse,
  PublicInterviewResponse,
} from '../models/swaggerTypes';

import { SetHrInterviewImageParamIntId } from '../models/swaggerTypes';
import { SetHrInterviewImageParamBody } from '../models/swaggerTypes';
import { SetHrInterviewColorParamIntId } from '../models/swaggerTypes';
import { SetHrInterviewColorParamBody } from '../models/swaggerTypes';
import { UpdateInterviewMedalsParamIntId } from '../models/swaggerTypes';
import { InterviewEmojiObject, BasicResponse } from '../models/swaggerTypes';
import * as config from 'config';
import * as path from 'path';
import * as fs from 'fs';
import * as fse from 'fs-extra';
import { Utils } from '../../Utils';
import { handleRequest } from '../helpers/utils';
import { HrService } from './HrService';
import { Error404, Error400, Error500 } from '../helpers/errors';
import { FmService } from './FmService';
import { SQLManager } from '../managers/SQLManager';
import { InternalService } from './InternalService';
import { AnalyseService } from './AnalyseService';

import * as puppeteer from 'puppeteer';

declare const initPage: any;
declare const firstInitData: any;

let emojis = null;

const backgroundImagesPath = path.join(
  process.env.dirname,
  '../public',
  'backgrounds'
);

export class InterviewService {
  static async exportHrInterviewPdf(
    req: any,
    intId: ExportHrInterviewPdfParamIntId
  ): Promise<any> {
    const dateNow = Date.now();

    const tmpFolder = path.join(
      process.env.dirname,
      '../temp/pdf/exp_' + dateNow
    );

    const tmpZipFile = path.join(
      process.env.dirname,
      '../temp/pdf/zip_exp_' + dateNow + '.zip'
    );

    await fse.ensureDir(tmpFolder);

    const data = await AnalyseService.getInterviewPeople(req, intId);

    const cans = data.candidates;

    const browser = await puppeteer.launch({
      args: ['--no-sandbox'],
      headless: true,
    });

    var page = await browser.newPage();

    for (const can of cans) {
      var options = {
        format: 'A4',
        path: path.join(tmpFolder, 'c_' + can.id + '.pdf'),
        margin: {
          bottom: '0cm',
          top: '0cm',
          left: '1cm',
          right: '1cm',
        },
      };

      await page.goto(`http://localhost:3000/public/pdf-gen/`, {
        waitUntil: 'networkidle0',
      });

      await page.evaluate(
        async (obj) => {
          return firstInitData(obj.data);
        },
        { data }
      );

      await page.evaluate(
        async (obj) => {
          return initPage(obj.can);
        },
        { can }
      );

      await page.pdf(options);
    }

    await browser.close();

    await new Promise((res, rej) => {
      var archiver = require('archiver');

      const output = fs.createWriteStream(tmpZipFile);
      const archive = archiver('zip');

      output.on('close', function () {
        res(true);
      });

      archive.on('error', function (err) {
        rej(err);
      });

      archive.pipe(output);

      archive.directory(tmpFolder, 'candidates');
      archive.finalize();
    });

    await fse.remove(tmpFolder);

    return { fileUrl: tmpZipFile };
  }

  static async updateInterviewNotes(
    req: any,
    intId: UpdateInterviewNotesParamIntId,
    canId: UpdateInterviewNotesParamCanId,
    note: string
  ): Promise<BasicResponse> {
    const intData = await SQLManager.knex
      .select({
        tag: 'tag',
        testUserTag: 'test_user_tag',
      })
      .from('job_interviews')
      .where('id', intId)
      .limit(1);

    const [{ tag, testUserTag }] = intData;

    let canTag;
    let intTag;

    intTag = tag;

    if (canId === 9999999) {
      canTag = testUserTag;
    } else {
      const personData = await SQLManager.knex
        .select({
          personId: 'job_interview_person_id',
        })
        .from('job_interviews_candidates')
        .where('id', canId)
        .limit(1);

      const [{ personId }] = personData;

      const canData = await SQLManager.knex
        .select({
          tag: 'tag',
        })
        .from('job_interviews_people')
        .where('id', personId)
        .limit(1);

      canTag = canData[0].tag;
    }

    const jsonPath = path.join(
      process.env.dirname,
      '../private/fm/int',
      intTag,
      canTag + '.json'
    );
    const currentBuffer = await fse.readFile(jsonPath);
    const currentJson = JSON.parse(currentBuffer.toString());
    currentJson.note = note;

    await fse.writeFile(jsonPath, JSON.stringify(currentJson));

    return {
      success: true,
      message: __('InterviewService.updateInterviewNotes.success'),
    };
  }

  static async getHrInterviewImages(
    req: any
  ): Promise<GetHrInterviewImagesResponse> {
    const folders = fs
      .readdirSync(backgroundImagesPath, { withFileTypes: true })
      .filter(
        (dirent) => !dirent.isDirectory() && !dirent.name.startsWith('.')
      );

    const envKey = process.env.NODEMAIL_PRODUCTION;
    const envData: any = config.get(envKey);

    return {
      images: folders.map((f) => {
        const fileName = f.name;

        return {
          type: 'apiurl',
          name: fileName,
          url: envData.apiUrl + '/public/backgrounds/' + fileName,
          urlSmall: envData.apiUrl + '/public/backgrounds-small/' + fileName,
        };
      }),
    };
  }

  static async setHrInterviewImage(
    req: any,
    intId: SetHrInterviewImageParamIntId,
    body: SetHrInterviewImageParamBody
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
        __('InterviewService.setHrInterviewImage.interviewNoLongerExists')
      );
    }

    const imageUrl = body.type + ':' + body.data;

    await SQLManager.knex
      .update({
        image: imageUrl,
      })
      .table('job_interviews')
      .where('id', intId);

    return {
      success: true,
      message: __('InterviewService.setHrInterviewImage.success'),
    };
  }

  static async setHrInterviewColor(
    req: any,
    intId: SetHrInterviewColorParamIntId,
    body: SetHrInterviewColorParamBody
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
        __('InterviewService.setHrInterviewColor.interviewNoLongerExists')
      );
    }

    await SQLManager.knex
      .update({
        color: body.color,
      })
      .table('job_interviews')
      .where('id', intId);

    return {
      success: true,
      message: __('InterviewService.setHrInterviewColor.success'),
    };
  }

  static async updateInterviewMedals(
    req: any,
    formId: UpdateInterviewMedalsParamIntId
  ): Promise<BasicResponse> {
    const hrId = req.session.hrId;
    const companyId = await Utils.hrIdToCompanyId(req, hrId);
    const { sub_model: companyPlan } = await Utils.companyToMany(
      req,
      companyId,
      ['sub_model']
    );

    const globalMedalsRes = await SQLManager.knex
      .select({
        id: 'id',
        defaultWeight: 'default_weight',
        planId: 'plan_id',
      })
      .from('medals')
      .where('is_global', true);

    for (const globalMedal of globalMedalsRes) {
      const {
        defaultWeight: medalWeight,
        id: medalId,
        planId: medalRequiredPlan,
      } = globalMedal;

      if (medalRequiredPlan <= companyPlan) {
        const globalMedalCheck = await SQLManager.knex
          .select('id')
          .from('job_interviews_weight')
          .where('form_id', formId)
          .where('medal_id', medalId)
          .whereNull('qp_uuid');

        if (globalMedalCheck.length <= 0) {
          await SQLManager.knex
            .insert({
              form_id: formId,
              medal_id: medalId,
              qp_uuid: null,
              weight: medalWeight,
            })
            .into('job_interviews_weight');
        }

        if (globalMedalCheck.length > 1) {
          let i = 0;
          for (const medalCheck of globalMedalCheck) {
            if (i > 0) {
              await SQLManager.knex
                .delete()
                .table('job_interviews_weight')
                .where('id', medalCheck.id);
            }
            i++;
          }
        }
      }
    }

    const formData = await SQLManager.knex
      .select({
        data: 'data',
      })
      .from('job_positions_forms')
      .where('id', formId)
      .limit(1);

    if (formData.length > 0) {
      const formJson = JSON.parse(formData[0].data);

      for (const pair of formJson.pairs) {
        let prefix;
        let toRemoveArr = ['audio_', 'select_one_', 'select_many_', 'text_'];

        switch (pair.a.type.id) {
          case 'text_answer':
            prefix = 'text_';
            break;
          case 'speak_answer':
            prefix = 'audio_';
            break;
          case 'select_one':
            prefix = 'select_one_';
            break;
          case 'select_many':
            prefix = 'select_many_';
            break;
        }

        toRemoveArr = toRemoveArr.filter((p) => p !== prefix);

        for (const toRemove of toRemoveArr) {
          const medalIds = SQLManager.knex
            .select(['id'])
            .from('medals')
            .where('tag', 'LIKE', toRemove + '%');

          await SQLManager.knex
            .delete()
            .from('job_interviews_weight')
            .where('form_id', formId)
            .whereIn('medal_id', medalIds)
            .where('qp_uuid', pair.uuid);
        }

        const allMedalsRes = await SQLManager.knex
          .select({
            tag: 'tag',
            defaultWeight: 'default_weight',
            id: 'id',
            planId: 'plan_id',
          })
          .from('medals')
          .where('tag', 'LIKE', prefix + '%')
          .where('is_global', false);

        for (const medal of allMedalsRes) {
          if (medal.planId <= companyPlan) {
            const medalCheck = await SQLManager.knex
              .select('id')
              .from('job_interviews_weight')
              .where('medal_id', medal.id)
              .where('form_id', formId)
              .where('qp_uuid', pair.uuid);

            if (medalCheck.length <= 0) {
              await SQLManager.knex
                .insert({
                  form_id: formId,
                  medal_id: medal.id,
                  qp_uuid: pair.uuid,
                  weight: medal.defaultWeight,
                })
                .into('job_interviews_weight');
            }

            if (medalCheck.length > 1) {
              let i = 0;
              for (const medalCheckTmp of medalCheck) {
                if (i > 0) {
                  await SQLManager.knex
                    .delete()
                    .table('job_interviews_weight')
                    .where('id', medalCheckTmp.id);
                }
                i++;
              }
            }
          }
        }
      }
    }

    return {
      success: true,
      message: __('InterviewService.updateInterviewMedals.success'),
    };
  }

  static async getEmojis(req: any): Promise<InterviewEmojiObject> {
    return {
      emojis,
    };
  }

  static async submitInterviewResponse(
    req: any,
    intTag: string,
    userTag: string,
    httpData,
    body: any
  ): Promise<BasicResponse> {
    const isValid = await Utils.isInterviewUserTagValid(userTag, intTag);

    if (!isValid) {
      throw Error404(
        req,
        __('QuestionType.submitInterviewResponse.noLongerValidLink')
      );
    }

    const didSubmit = await FmService.didCandidateAlreadySubmit(
      intTag,
      userTag
    );

    if (didSubmit) {
      throw Error400(
        req,
        __('QuestionType.submitInterviewResponse.submitAlready')
      );
    }

    body.id = Utils.generateUuid();
    const pointsRes = await AnalyseService.generateResults(req, body);
    await FmService.saveInterviewResults(intTag, userTag, pointsRes);
    await FmService.saveInterviewResults(intTag, userTag, body, true);

    // Send Email
    const mailData = await SQLManager.knex
      .select({
        intId: 'job_interviews.id',
        divId: 'job_interviews.division_id',
        companyId: 'division.company_id',
      })
      .from('job_interviews')
      .where('job_interviews.tag', intTag)
      .leftJoin('division', 'division.id', 'job_interviews.division_id')
      .limit(1);

    const canData = await SQLManager.knex
      .select({
        canId: 'id',
      })
      .from('job_interviews_people')
      .where('tag', userTag)
      .limit(1);

    if (mailData.length <= 0 || canData.length <= 0) {
      throw Error500(
        req,
        __('QuestionType.submitInterviewResponse.couldNotLoadDataForEmail')
      );
    }

    const [{ intId, divId, companyId }] = mailData;
    const [{ canId }] = canData;

    const mailIdData = await SQLManager.knex
      .select({
        mailId: 'mail_id',
      })
      .from('job_interviews_data')
      .where('int_id', intId)
      .where('type', 'submit')
      .limit(1);

    if (mailIdData.length <= 0) {
      throw Error500(
        req,
        __('QuestionType.submitInterviewResponse.couldNotLoadDataForEmail')
      );
    }

    const [{ mailId }] = mailIdData;

    const parsedMailData = await InternalService.parseInternalEmailPlaceholders(
      req,
      canId,
      companyId,
      divId,
      intId,
      mailId,
      null
    );

    const { candidateEmail, subject, text } = parsedMailData;

    await SQLManager.knex
      .insert({
        email: candidateEmail,
        type: 'empty',
        data: JSON.stringify({
          subject,
          mail: text,
        }),
        hr_email_id: mailId,
        division_sender_id: divId,
      })
      .into('mails');

    return {
      success: true,
      message: __('QuestionType.submitInterviewResponse.success'),
    };
  }

  static async validateInterviewUser(
    req: any,
    intTag: string,
    userTag: string,
    httpData
  ): Promise<BasicResponse> {
    const isValid = await Utils.isInterviewUserTagValid(userTag, intTag);

    if (!isValid) {
      throw Error404(
        req,
        __('QuestionType.validateInterviewUser.noLongerValidLink')
      );
    }

    return {
      success: true,
      message: __('QuestionType.validateInterviewUser.success'),
    };
  }

  static async getInterviewForm(
    req: any,
    intTag: string,
    userTag: string,
    httpData
  ): Promise<PublicInterviewResponse> {
    const isValid = await Utils.isInterviewUserTagValid(userTag, intTag);

    if (!isValid) {
      throw Error404(
        req,
        __('QuestionType.getInterviewForm.noLongerValidLink')
      );
    }

    const intData = await SQLManager.knex
      .select(['id'])
      .from('job_interviews')
      .where('tag', intTag)
      .limit(1);

    if (intData.length <= 0) {
      throw Error404(
        req,
        __('QuestionType.getInterviewForm.interviewNotFound')
      );
    }

    const intId = intData[0].id;

    const data = await Utils.interviewTagToData(req, intTag);
    const formData = await HrService.getJobPositionForm(
      req,
      data.posId,
      data.formId,
      true
    );
    const apiData = JSON.parse(formData.data);

    const getQuestionType = (n) => {
      switch (n) {
        case 'text_question':
          return QuestionType.TEXT;
        case 'mp3_question':
          return QuestionType.MP3;
        case 'mp4_question':
          return QuestionType.MP4;
        case 'image_question':
          return QuestionType.IMAGE;
      }
    };

    const getAnswerType = (n) => {
      switch (n) {
        case 'text_answer':
          return AnswerType.TYPE;
        case 'speak_answer':
          return AnswerType.SPEAK;
        case 'select_one':
          return AnswerType.SELECT_ONE;
        case 'select_many':
          return AnswerType.SELECT_MANY;
      }
    };

    const parseQuestion = (p, uuid) => {
      const type = getQuestionType(p.type.id);
      const obj = {
        type,
        data: {},
      };

      if (type === QuestionType.TEXT) {
        obj.data = {
          text: p.data.find((pd) => pd.type === 0).value,
          textMp3: process.env.API_URL + '/public_tts/' + uuid + '_q.mp3',
          readTime: +p.data.find((pd) => pd.type === 3).value,
        };
      }

      if (type === QuestionType.MP3) {
        const srcName = p.data.find((pd) => pd.title === 'Question MP3 Source')
          .value;
        const srcFullName = p.data.find(
          (pd) => pd.title === 'Question MP3 Source'
        ).isTemplate
          ? 'T_' + srcName
          : srcName;

        obj.data = {
          beforeText: p.data.find((pd) => pd.title === 'Text Before Question')
            .value,
          afterText: p.data.find((pd) => pd.title === 'Text After Question')
            .value,
          beforeTextMp3:
            process.env.API_URL + '/public_tts/' + uuid + '_q_before.mp3',
          afterTextMp3:
            process.env.API_URL + '/public_tts/' + uuid + '_q_after.mp3',
          src:
            process.env.API_URL +
            '/public/fm/mp3/' +
            srcFullName +
            '/' +
            intTag,
        };
      }

      if (type === QuestionType.MP4) {
        const srcName = p.data.find((pd) => pd.title === 'Question MP4 Source')
          .value;
        const srcFullName = p.data.find(
          (pd) => pd.title === 'Question MP4 Source'
        ).isTemplate
          ? 'T_' + srcName
          : srcName;

        obj.data = {
          beforeText: p.data.find((pd) => pd.title === 'Text Before Question')
            .value,
          afterText: p.data.find((pd) => pd.title === 'Text After Question')
            .value,
          beforeTextMp3:
            process.env.API_URL + '/public_tts/' + uuid + '_q_before.mp3',
          afterTextMp3:
            process.env.API_URL + '/public_tts/' + uuid + '_q_after.mp3',
          src:
            process.env.API_URL +
            '/public/fm/mp4/' +
            srcFullName +
            '/' +
            intTag,
        };
      }

      if (type === QuestionType.IMAGE) {
        const srcName = p.data.find(
          (pd) => pd.title === 'Question Image Source'
        ).value;
        const srcFullName = p.data.find(
          (pd) => pd.title === 'Question Image Source'
        ).isTemplate
          ? 'T_' + srcName
          : srcName;

        obj.data = {
          beforeText: p.data.find((pd) => pd.title === 'Text Before Question')
            .value,
          afterText: p.data.find((pd) => pd.title === 'Text After Question')
            .value,
          beforeTextMp3:
            process.env.API_URL + '/public_tts/' + uuid + '_q_before.mp3',
          afterTextMp3:
            process.env.API_URL + '/public_tts/' + uuid + '_q_after.mp3',
          src:
            process.env.API_URL +
            '/public/fm/png/' +
            srcFullName +
            '/' +
            intTag,
        };
      }

      return obj;
    };

    const parseAnswer = (p) => {
      const type = getAnswerType(p.type.id);
      const obj = {
        type,
        data: {},
      };

      if (type === AnswerType.TYPE) {
        obj.data = {
          prepareTime: +p.data.find((pd) => pd.type === 3).value,
        };
      }

      if (type === AnswerType.SPEAK) {
        obj.data = {
          prepareTime: +p.data.find((pd) => pd.type === 3).value,
        };
      }

      if (type === AnswerType.SELECT_MANY || type === AnswerType.SELECT_ONE) {
        obj.data = {
          options: p.data.find((pd) => pd.type === 4).value,
        };
      }

      return obj;
    };

    const newData = {
      dark: data.dark,
      prelog: data.prelog,
      image: data.image,
      color: data.color,
      pairs: apiData.pairs.map((p) => {
        return {
          uuid: p.uuid,
          answerTime: +p.answerTime,
          q: parseQuestion(p.q, p.uuid),
          a: parseAnswer(p.a),
          response: {
            rating: 0,
            data: {},
          },
        };
      }),
    };

    return newData;
  }

  static async processEmojiFolder(dirent: fs.Dirent) {
    const images = [];
    const folder = path.join(emojiPath, dirent.name);
    const files = fs.readdirSync(folder).filter((f) => f.endsWith('.png'));
    for (const file of files) {
      const fileBuffer = fs.readFileSync(path.join(folder, file));
      const fileData = new Buffer(fileBuffer).toString('base64');
      images.push(fileData);
    }

    return {
      name: dirent.name,
      images,
    };
  }
}

const emojiPath = path.join(
  process.env.dirname,
  '../public',
  'small-compressed'
);

const emojiSetup = async () => {
  const folders = fs
    .readdirSync(emojiPath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory());

  const emFinal = [];

  for (const dirent of folders) {
    const emoji = await InterviewService.processEmojiFolder(dirent);
    emFinal.push(emoji);
  }

  emojis = emFinal;
};

emojiSetup();

export class QuestionType {
  static readonly TEXT = new QuestionType(1, 'read'); // q { data: text, readTime }
  static readonly MP3 = new QuestionType(2, 'listen to'); // q { data: src, beforeText, afterText }
  static readonly MP4 = new QuestionType(3, 'watch video'); // q { data: src, beforeText, afterText }
  static readonly IMAGE = new QuestionType(4, 'view image'); // q { data: src, beforeText, afterText }

  private constructor(readonly id, readonly name) {}
}

export class AnswerType {
  static readonly TYPE = new AnswerType(1, 'typing'); // a { data: prepareTime } | response { data: inputValue }
  static readonly SPEAK = new AnswerType(2, 'speaking'); // a { data: prepareTime } | response { data: base64, type }
  static readonly SELECT_ONE = new AnswerType(3, 'selecting an option'); // a { data: options } | response { data: selected }
  static readonly SELECT_MANY = new AnswerType(4, 'selecting multiple options'); // a { data: options } | response { data: selected }

  private constructor(readonly id, readonly name) {}
}
