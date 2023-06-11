import * as nodemailer from 'nodemailer';
import { LogManager } from './LogManager';
import { Error500 } from '../helpers/errors';

export class MailManager {
  private static i: MailManager;

  transporter: any = null;

  static getInstance(): MailManager {
    if (!MailManager.i) {
      MailManager.i = new MailManager();
    }

    return MailManager.i;
  }

  constructor() {
    this.setup();
  }

  async setup() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.MAIL_USER, // generated ethereal user
        pass: process.env.MAIL_PASS, // generated ethereal password
      },
    });
  }

  async sendMail(req, subject: string, text: string) {
    try {
      const info = await this.transporter.sendMail({
        from: `"${process.env.MAIL_NAME}" <${process.env.MAIL_USER}>`,
        to: process.env.MAIL_RECIEVER,
        subject: 'Contact - ' + subject,
        text,
        html: text.split('\n\r').join('<br>').split('\n').join('<br>'),
      });
    } catch (err) {
      LogManager.error('Mail Send Error: ');
      LogManager.error(err);
      throw Error500(req, __('MailManager.sendMail.coundNotSend'));
    }
  }
}
