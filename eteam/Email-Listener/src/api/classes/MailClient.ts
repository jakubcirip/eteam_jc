import * as notifier from 'mail-notifier';
import * as nodemailer from 'nodemailer';

import { LogManager } from '../managers/LogManager';
import { MailClientManager } from '../managers/MailClientManager';
import { SQLManager } from '../managers/SQLManager';
import { Utils } from '../../Utils';
import { send } from '@sendgrid/mail';

export class MailClient {
  divId: number;
  companyId: number;

  mailNick: string;
  mailPass: string;

  listener;
  transporter;

  getSender() {
    return `Hiroo Interview <${this.mailNick}>`;
  }

  async listen() {
    LogManager.log(
      'Registering mail listener for ' + this.mailNick + ', ' + this.mailPass
    );

    if (!this.divId || !this.mailPass || !this.mailNick) {
      return;
    }

    const divData = await SQLManager.knex
      .select({
        companyId: 'company_id',
      })
      .from('division')
      .where('id', this.divId)
      .limit(1);

    if (divData.length <= 0) {
      return;
    }

    this.companyId = divData[0].companyId;

    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: false,
      auth: {
        user: this.mailNick,
        pass: this.mailPass,
      },
    });

    this.listener = {
      username: this.mailNick,
      password: this.mailPass,
      host: 'imap.hostcreators.sk',
      port: 993,
      tls: true,
      tlsOptions: { rejectUnauthorized: false },
    };

    const n = notifier(this.listener);

    n.on('connected', () => {
      LogManager.success('Successfully listening for ' + this.mailNick);
    });

    n.on('end', () => {
      LogManager.warning('Disconected from ' + this.mailNick);
      MailClientManager.getInstance().clients.filter((c) => c !== this);
    });

    n.on('error', (err) => {
      LogManager.error('Disconnected from Mail server ' + this.mailNick);
      LogManager.error(err);

      MailClientManager.getInstance().clients = MailClientManager.getInstance().clients.filter(
        (c) => {
          if (c.divId === this.divId) {
            return false;
          }

          return true;
        }
      );
    });

    n.on('mail', async (mail) => {
      try {
        // NZbD6gDZ Matej Nejaky Baco
        const subject = mail.subject;

        if (/........ .+/.test(subject) === false) {
          LogManager.error('Wrong email' + subject);
        }

        const sender = mail.from[0].address;

        const uId = mail.uid;

        LogManager.log('Recieved mail | ' + subject + ' | ' + sender);

        const parts = subject.split(' ');
        const intTag = parts[0];
        parts.shift();
        const name = parts.join(' ');

        LogManager.info(
          'Parsed mail | ' + sender + ' | ' + name + ' | ' + intTag
        );

        const intData = await SQLManager.knex
          .select(['id', 'state'])
          .from('job_interviews')
          .where('tag', intTag)
          .where('division_id', this.divId)
          .limit(1);

        if (intData.length <= 0) {
          throw Error('Division doesnt exist.');
        }

        const intId = intData[0].id;
        const intState = intData[0].state;

        const mailIdData = await SQLManager.knex
          .select({
            registerMailId: 'mail_id',
          })
          .from('job_interviews_data')
          .where('type', 'registration')
          .where('int_id', intId)
          .limit(1);

        if (mailIdData.length <= 0) {
          LogManager.error(
            'Could not load registration/registration_fail email data'
          );
          return;
        }

        const [{ registerMailId }] = mailIdData;

        if (intState !== 'created') {
          LogManager.log(
            'Interview is ' + intState + ' instead of created. Ignoring email.'
          );
          // send registration_fail mail
          await MailClientManager.getInstance().processCandidate(
            -1,
            intId,
            this.divId,
            this.companyId,
            registerMailId,
            sender
          );

          LogManager.success('Email successfully parsed, registration_fail');
        }

        let personId = null;
        let candidateId = null;

        const personCheck = await SQLManager.knex
          .select('id')
          .from('job_interviews_people')
          .where('division_id', this.divId)
          .where('name', name)
          .where('email', sender)
          .limit(1);

        if (personCheck.length <= 0) {
          // person doesnt exist yet
          LogManager.log('Registering person ' + sender + this.divId + name);

          await SQLManager.knex
            .insert({
              email: sender,
              name,
              division_id: this.divId,
              type: 'automatic',
              tag: Utils.generateFileId(),
            })
            .into('job_interviews_people');
        } else {
          // person already exists
          personId = personCheck[0].id;
        }

        if (personId === null) {
          const personData = await SQLManager.knex
            .select('id')
            .from('job_interviews_people')
            .where('division_id', this.divId)
            .where('name', name)
            .where('email', sender)
            .limit(1);

          personId = personData[0].id;
        }

        const candidateCheck = await SQLManager.knex
          .select('id')
          .from('job_interviews_candidates')
          .where('division_id', this.divId)
          .where('job_interview_id', intId)
          .where('job_interview_person_id', personId)
          .limit(1);

        if (candidateCheck.length <= 0) {
          // not a candidate
          await SQLManager.knex
            .insert({
              division_id: this.divId,
              job_interview_id: intId,
              job_interview_person_id: personId,
              type: 'automatic',
              email_uid: uId,
            })
            .into('job_interviews_candidates');
        } else {
          candidateId = candidateCheck[0].id;
        }

        if (candidateId === null) {
          const canData = await SQLManager.knex
            .select('id')
            .from('job_interviews_candidates')
            .where('division_id', this.divId)
            .where('job_interview_id', intId)
            .where('job_interview_person_id', personId)
            .limit(1);

          candidateId = canData[0].id;
        }

        // send mail
        await MailClientManager.getInstance().processCandidate(
          candidateId,
          intId,
          this.divId,
          this.companyId,
          registerMailId
        );

        LogManager.success('Email successfully parsed');
      } catch (exp) {
        LogManager.warning('Wrong email revieved!');
        LogManager.warning(mail);
        LogManager.warning(exp);
      }
    });

    n.start();
  }
}
