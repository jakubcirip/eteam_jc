import * as Handlebars from 'handlebars';
import * as fs from 'fs';
import * as config from 'config';
import * as path from 'path';
import { Mail } from '../models/Mail';
import { LogManager } from '../managers/LogManager';
import * as textversionjs from 'textversionjs';
import { MailClient } from '../classes/MailClient';

export enum MailServiceTypes {
  GMAIL = 'gmail',
}

export enum MailFiles {
  SUBJECT = 'data.json',
  BODY = 'plain.txt',
  HTML = 'html.txt',
}

export class SendGridService {
  private fsRoute: string;
  private reciever: string;
  private subject: string;
  private body: string;
  private html: string;
  private attArr: string[] = [];

  private mail: Mail;
  private customSender: MailClient;

  static start(): void {}

  async send() {
    return new Promise((res, rej) => {
      if (this.customSender) {
        const customFrom = this.customSender.getSender();
        this.customSender.transporter.sendMail(
          this.generateMailOptions(customFrom),
          (err, info) => {
            if (err) return rej(err);
            res(info);
          }
        );
      } else {
        // sgMail
        //   .send(this.generateMailOptions())
        //   .then((sgRes) => {
        //     res();
        //   })
        //   .catch((sgErr) => {
        //     rej(sgErr);
        //   });
      }
    });
  }

  constructor(mail: Mail) {
    this.mail = mail;

    this.reciever = mail.email;

    if (mail.type !== 'empty') {
      this.fsRoute = path.join(__dirname, '../../../public');
      this.getEmailData(mail);
    }
  }

  setSender(sender: MailClient) {
    this.customSender = sender;
  }

  addAttachments(attArr: string[]) {
    this.attArr = [...this.attArr, ...attArr];
  }

  private async getEmailData(mail: Mail) {
    try {
      let mailData = JSON.parse(mail.data);

      const configKey = process.env.NODEMAIL_PRODUCTION;
      const configData: any = config.get(configKey);

      const placeholderData = {
        ...configData,
      };

      placeholderData.companyUrl = placeholderData.companyUrl
        .split('{{domain}}')
        .join(mailData.domain);

      mailData = {
        ...mailData,
        ...placeholderData,
      };

      this.subject = Handlebars.compile(
        JSON.parse(
          fs
            .readFileSync(path.join(this.fsRoute, mail.type, MailFiles.SUBJECT))
            .toString()
        ).subject
      )(mailData);

      this.body = Handlebars.compile(
        fs
          .readFileSync(path.join(this.fsRoute, mail.type, MailFiles.BODY))
          .toString()
      )(mailData);

      this.html = Handlebars.compile(
        fs
          .readFileSync(path.join(this.fsRoute, mail.type, MailFiles.HTML))
          .toString()
      )(mailData);
    } catch (exp) {
      LogManager.error(exp);
    }
  }

  private generateMailOptions(customFrom: string = null) {
    if (this.mail.type !== 'empty') {
      const newObj = {
        to: this.reciever,
        from: customFrom ? customFrom : process.env.MAIL_USER,
        subject: this.subject,
        text: this.body,
        html: this.html,
      };
      return newObj;
    } else {
      const parsedData = JSON.parse(this.mail.data);

      const plainText = textversionjs(parsedData.mail, {
        imgProcess: () => {
          return '';
        },
        linkProcess: () => {
          return '';
        },
      });

      const obj: any = {
        subject: parsedData.subject,
        text: plainText,
        html: parsedData.mail,
        from: customFrom
          ? customFrom
          : `${process.env.MAIL_NAME} <${process.env.MAIL_USER}>`,
        to: this.reciever,
      };

      const re = /<img.*src=["\'](.+?)["\'](.*)>/g;
      const matches = parsedData.mail.matchAll(re);
      const attachmentsArr = [];

      let i = 0;
      let didChange = false;
      let newMailHtml = parsedData.mail;

      for (const match of matches) {
        didChange = true;
        i++;

        const name = 'att_c' + i;

        newMailHtml = newMailHtml.split(match[1]).join('cid:' + name);

        attachmentsArr.push({
          path: match[1],
          cid: name,
        });
      }

      if (didChange) {
        obj.html = newMailHtml;
        obj.attachments = attachmentsArr;
      }

      if (!obj.attachments) {
        obj.attachments = [];
      }

      obj.attachments.push(
        ...this.attArr.map((a) => {
          return {
            filename: 'att_' + a.split('/')[a.split('/').length - 1],
            path: a,
          };
        })
      );

      const newObj = {
        to: obj.to,
        from: customFrom ? customFrom : process.env.MAIL_USER,
        subject: obj.subject,
        text: obj.text,
        html: obj.html,
      };

      return newObj;
    }
  }
}
