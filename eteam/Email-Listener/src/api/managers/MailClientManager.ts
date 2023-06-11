import * as AES from 'aes-everywhere';
import * as request from 'request';

import { SQLManager } from './SQLManager';
import { MailClient } from '../classes/MailClient';
import { LogManager } from './LogManager';

export class MailClientManager {
  private static i: MailClientManager;

  clients: MailClient[] = [];

  private updateInit = false;

  static getInstance(): MailClientManager {
    if (!MailClientManager.i) {
      MailClientManager.i = new MailClientManager();
    }

    return MailClientManager.i;
  }

  async init() {
    const mailData: any[] = await SQLManager.knex
      .select([
        'division.id',
        'company.domain',
        'division.tag',
        'division.mail_pass',
      ])
      .from('division')
      .leftJoin('company', 'company.id', 'division.company_id');

    const accounts = mailData.map((mail) => {
      const plainPass = AES.decrypt(
        mail.mail_pass,
        process.env.PASS_ENCTYPT_KEY
      );

      return {
        id: mail.id,
        username: `${mail.domain}.${mail.tag}@hiroo.eu`,
        password: plainPass,
      };
    });

    for (const acc of accounts) {
      const oldClient = this.clients.find((c) => c.divId === acc.id);

      if (oldClient) {
        continue;
      }

      const newClient = new MailClient();
      newClient.divId = acc.id;
      newClient.mailNick = acc.username;
      newClient.mailPass = acc.password;
      await newClient.listen();

      this.clients.push(newClient);
    }

    if (!this.updateInit) {
      this.runUpdateInterval();
    }
  }

  runUpdateInterval() {
    setTimeout(async () => {
      await this.init();
      this.runUpdateInterval();
    }, 1000 * 10);

    this.updateInit = true;
  }

  processCandidate(
    candidateId: number,
    intId: number,
    divId: number,
    companyId: number,
    mailId: number,
    customCanEmail?: string
  ) {
    return new Promise((p) => {
      const path = process.env.API_URL + '/internal/parse-email-placeholders';
      const body: any = {
        candidateId,
        intId,
        divId,
        companyId,
        mailId,
      };

      if (customCanEmail) {
        body.customCanEmail = customCanEmail;
      }

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

          LogManager.info(
            'Candiadte email repared' + candidateEmail + subject + text
          );

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

          p(null);
        }
      );
    });
  }
}
