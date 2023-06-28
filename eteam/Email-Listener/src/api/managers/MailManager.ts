import { LogManager } from './LogManager';
import { SQLManager } from './SQLManager';
import { Mail } from '../models/Mail';
import { MailService } from '../services/MailService';
import { MailClient } from '../classes/MailClient';
import { MailClientManager } from './MailClientManager';

export class MailManager {
  static transporter;

  static Start() {
    MailService.start();
  }

  static async Update() {
    try {
      const data: any[] = await SQLManager.knex
        .select()
        .from('mails')
        .where('attempt', '<=', 5)
        .where('success', 0);
      if (data.length <= 0) {
        LogManager.info('No emails found');
        this.timer();
        return;
      }

      for (const mail of data) {
        const m: Mail = mail;
        const mailService = new MailService(m);

        if (m.hr_email_id) {
          const attData = await SQLManager.knex
            .select('attachments')
            .from('hr_emails')
            .where('id', m.hr_email_id)
            .limit(1);

          if (attData.length > 0) {
            const arr = JSON.parse(attData[0].attachments);
            // TODO: Add attachment
            mailService.addAttachments(arr);
          }
        }

        if (m.division_sender_id) {
          const divData: any[] = await SQLManager.knex
            .select(['company.domain', 'division.tag'])
            .from('division')
            .leftJoin('company', 'company.id', 'division.company_id')
            .where('division.id', m.division_sender_id)
            .limit(1);

          if (divData.length <= 0) {
            LogManager.error('Cant get division data' + m.division_sender_id);
          } else {
            const divRow = divData[0];
            const senderEmail = `${divRow.domain}.${divRow.tag}@hiroo.eu`;

            const client = MailClientManager.getInstance().clients.find(
              (c) => c.mailNick === senderEmail
            );
            if (!client) {
              LogManager.error('Cant find custom client ' + senderEmail);
            } else {
              mailService.setSender(client);
            }
          }
        }

        await mailService.send();

        await SQLManager.knex
          .update({
            success: 1,
            data: '{}',
          })
          .table('mails')
          .where('id', m.id);

        LogManager.success(`Mail Sent: ${m.email}`);
      }

      this.timer();
    } catch (exp) {
      await SQLManager.knex
        .update({})
        .table('mails')
        .increment('attempt', 1)
        .where('attempt', '<=', 5)
        .where('success', 0);

      LogManager.error(exp);
      LogManager.error(`Could not send mail.. Trying again`);
      this.timer();
    }
  }

  // static async Update() {
  //   try {
  //     const data: any[] = await SQLManager.knex
  //       .select()
  //       .from('mails')
  //       .where('attempt', '<=', 5)
  //       .where('success', 0);
  //     if (data.length <= 0) {
  //       LogManager.info('No emails found');
  //       this.timer();
  //       return;
  //     }

  //     for (const mail of data) {
  //       const m: Mail = mail;
  //       const mailService = new MailService(m);

  //       if (m.hr_email_id) {
  //         const attData = await SQLManager.knex
  //           .select('attachments')
  //           .from('hr_emails')
  //           .where('id', m.hr_email_id)
  //           .limit(1);

  //         if (attData.length > 0) {
  //           const arr = JSON.parse(attData[0].attachments);
  //           mailService.addAttachments(arr);
  //         }
  //       }

  //       if (m.division_sender_id) {
  //         const divData: any[] = await SQLManager.knex
  //           .select(['company.domain', 'division.tag'])
  //           .from('division')
  //           .leftJoin('company', 'company.id', 'division.company_id')
  //           .where('division.id', m.division_sender_id)
  //           .limit(1);

  //         if (divData.length <= 0) {
  //           LogManager.error('Cant get division data' + m.division_sender_id);
  //         } else {
  //           const divRow = divData[0];
  //           const senderEmail = `${divRow.domain}.${divRow.tag}@hiroo.eu`;

  //           const client = MailClientManager.getInstance().clients.find(
  //             (c) => c.mailNick === senderEmail
  //           );
  //           if (!client) {
  //             LogManager.error('Cant find custom client ' + senderEmail);
  //           } else {
  //             mailService.setSender(client);
  //           }
  //         }
  //       }

  //       await mailService.send();

  //       await SQLManager.knex
  //         .update({
  //           success: 1,
  //           data: '{}',
  //         })
  //         .table('mails')
  //         .where('id', m.id);

  //       LogManager.success(`Mail Sent: ${m.email}`);
  //     }

  //     this.timer();
  //   } catch (exp) {
  //     await SQLManager.knex
  //       .update({})
  //       .table('mails')
  //       .increment('attempt', 1)
  //       .where('attempt', '<=', 5)
  //       .where('success', 0);

  //     LogManager.error(exp);
  //     LogManager.error(`Could not send mail.. Trying again`);
  //     this.timer();
  //   }
  // }

  static timer() {
    setTimeout(() => {
      MailManager.Update();
    }, 10000);
  }
}
