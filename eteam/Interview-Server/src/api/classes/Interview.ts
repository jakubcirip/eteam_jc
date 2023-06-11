import * as request from 'request';
import * as scheduler from 'node-schedule';
import * as AES from 'aes-everywhere';

import { SQLManager } from '../managers/SQLManager';

import { LogManager } from '../managers/LogManager';
import { EndWorker } from './Workers/EndWorker';
import { RemindWorker } from './Workers/RemindWorker';
import { UniversalWorker } from './Workers/UniversalWorker';

export class Interview {
  divId: number;
  companyId: number;

  constructor(public id: number) {}

  async init() {
    await this.initData();
    await this.initTimers();
  }

  async initData() {
    const intData = await SQLManager.knex
      .select({
        divId: 'division_id',
      })
      .from('job_interviews')
      .where('id', this.id)
      .limit(1);

    if (intData.length <= 0) {
      LogManager.error('Cant load Interview Data ' + this.id);
      return;
    }

    const { divId } = intData[0];
    this.divId = divId;

    const divData = await SQLManager.knex
      .select({
        companyId: 'company_id',
      })
      .from('division')
      .where('id', divId)
      .limit(1);

    if (divData.length <= 0) {
      LogManager.error('Cant load Division Data ' + this.id);
      return;
    }

    const { companyId } = divData[0];
    this.companyId = companyId;
  }

  async initTimers() {
    const mailData = await SQLManager.knex
      .select(['type', 'mail_id', 'date'])
      .from('job_interviews_data')
      .where('int_id', this.id)
      .whereNotNull('date');

    const p = mailData.map(async (m) => {
      const { type, mail_id: mailId, date } = m;

      if (date.getTime() - Date.now() < 0) {
        LogManager.info(
          'Interview Email is in PAST!' + ` [${this.id}] (${type})`
        );

        if (type === 'end') {
          LogManager.warning(
            'Past is END and state is pending.. ending now :)'
          );
          this.sendEmails(mailId, type);
        }
      } else {
        const job = scheduler.scheduleJob(date, () => {
          LogManager.success('Sending Mails' + ` [${this.id}] (${type})`);
          this.sendEmails(mailId, type);
        });

        LogManager.info(
          'Registering job for ' + date + ` [${this.id}] (${type})`
        );
      }
    });
  }

  async sendEmails(mailId: number, type: string) {
    if (type === 'end') {
      await EndWorker(this, type, mailId);
    } else if (type === 'remind') {
      await RemindWorker(this, type, mailId);
    } else {
      await UniversalWorker(this, type, mailId);
    }
  }

  getInterviewCandidateData(): Promise<any> {
    return new Promise((p) => {
      const path =
        process.env.API_URL +
        '/internal/interview-candidate-statistics/' +
        this.id;
      request(
        {
          method: 'GET',
          url: path,
          headers: {
            'x-api-key': process.env.API_KEY,
          },
        },
        async (err, res, resBody) => {
          if (err) {
            LogManager.error(err);
            p(null);
            return;
          }

          p(JSON.parse(resBody));
        }
      );
    });
  }

  getInterviewSummary(): Promise<any> {
    return new Promise((p) => {
      const path =
        process.env.API_URL + '/internal/interview-summary/' + this.id;
      request(
        {
          method: 'GET',
          url: path,
          headers: {
            'x-api-key': process.env.API_KEY,
          },
        },
        async (err, res, resBody) => {
          if (err) {
            LogManager.error(err);
            p(null);
            return;
          }

          p(JSON.parse(resBody));
        }
      );
    });
  }

  processCandidate(c, mailId) {
    return new Promise((p) => {
      const { candidateId } = c;

      const path = process.env.API_URL + '/internal/parse-email-placeholders';
      const body = {
        candidateId,
        intId: this.id,
        divId: this.divId,
        companyId: this.companyId,
        mailId,
      };

      request(
        {
          method: 'POST',
          json: body,
          url: path,
          headers: {
            'x-api-key': process.env.API_KEY,
          },
        },
        async (err, res, resBody) => {
          if (err) {
            LogManager.error(err);
            p(null);
            return;
          }
          const { candidateEmail, subject, text } = resBody;

          await SQLManager.knex
            .insert({
              email: candidateEmail,
              type: 'empty',
              data: JSON.stringify({
                subject,
                mail: text,
              }),
              hr_email_id: mailId,
              division_sender_id: this.divId,
            })
            .into('mails');

          p(null);
        }
      );
    });
  }
}
