import { SQLManager } from './SQLManager';

export enum EmailType {
  COMPANY_REGISTRATION = 'company_registration',
  COMPANY_REGISTRATION_FINISH = 'company_registration_finish',

  COMPANY_RESET_PASSWORD = 'company_resetpass',
  COMPANY_RESET_PASSWORD_FINISH = 'company_resetpass_finish',

  COMPANY_CHANGE_PASS = 'company_changepass',

  HR_RESET_PASSWORD = 'hr_resetpass',
  HR_RESET_PASSWORD_FINISH = 'hr_resetpass_finish',

  HR_CHANGE_PASS = 'hr_changepass',

  HR_REGISTRATION = 'hr_registration',
  HR_REGISTRATION_FINISH = 'hr_registration_finish',

  COMPANY_SUPPORT_EMAIL = 'company_support_email',

  EMPTY = 'empty',
}

export interface RegistrationEmailData {
  activationCode: string;
  domain: string;
}

export class EmailManager {
  static async sendEmptyMailWithId(
    email: string,
    mail: string,
    subject: string,
    emailId: number
  ) {
    this.sendEmail(
      email,
      EmailType.EMPTY,
      {
        mail,
        subject,
      },
      emailId
    );
  }

  static async sendEmptyMail(email: string, mail: string, subject: string) {
    this.sendEmail(email, EmailType.EMPTY, {
      mail,
      subject,
    });
  }

  static async sendResetPasswordSuccessEmailHr(
    email: string,
    domain: string,
    data: any
  ) {
    this.sendEmail(email, EmailType.HR_RESET_PASSWORD_FINISH, {
      ...data,
      domain,
    });
  }

  static async sendChangePasswordEmailCompany(
    email: string,
    domain: string,
    data: any
  ) {
    this.sendEmail(email, EmailType.COMPANY_CHANGE_PASS, {
      ...data,
      domain,
    });
  }

  static async sendChangePasswordEmailHr(
    email: string,
    domain: string,
    data: any
  ) {
    this.sendEmail(email, EmailType.HR_CHANGE_PASS, {
      ...data,
      domain,
    });
  }

  static async sendSupportEmail(data: any) {
    this.sendEmail(
      process.env.SUPPORT_EMAIL,
      EmailType.COMPANY_SUPPORT_EMAIL,
      data
    );
  }

  static async sendResetPasswordSuccessEmailCompany(
    email: string,
    domain: string,
    data: any
  ) {
    this.sendEmail(email, EmailType.COMPANY_RESET_PASSWORD_FINISH, {
      ...data,
      domain,
    });
  }

  static async sendHrRegistrationFinishEmail(
    email: string,
    domain: string,
    data: any
  ) {
    this.sendEmail(email, EmailType.HR_REGISTRATION_FINISH, {
      ...data,
      domain,
    });
  }

  static async sendCompanyRegistrationFinishEmail(
    email: string,
    domain: string,
    data: any
  ) {
    this.sendEmail(email, EmailType.COMPANY_REGISTRATION_FINISH, {
      ...data,
      domain,
    });
  }

  static async sendHrRegistrationEmail(
    email: string,
    domain: string,
    data: any
  ) {
    this.sendEmail(email, EmailType.HR_REGISTRATION, { ...data, domain });
  }

  static async sendResetPasswordEmail(
    email: string,
    domain: string,
    data: any
  ) {
    this.sendEmail(email, EmailType.COMPANY_RESET_PASSWORD, {
      ...data,
      domain,
    });
  }
  static async sendResetPasswordEmailHr(
    email: string,
    domain: string,
    data: any
  ) {
    this.sendEmail(email, EmailType.HR_RESET_PASSWORD, { ...data, domain });
  }
  static async sendRegistrationEmail(email: string, domain: string, data: any) {
    this.sendEmail(email, EmailType.COMPANY_REGISTRATION, { ...data, domain });
  }

  private static async sendEmail(
    email: string,
    type: EmailType,
    data: any,
    hrEmailId = null
  ) {
    await SQLManager.knex
      .insert({
        email,
        type,
        data: JSON.stringify(data),
        hr_email_id: hrEmailId,
      })
      .into('mails');
  }
}
