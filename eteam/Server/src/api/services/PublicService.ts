import { GenerateInterviewZipParamBody } from '../models/swaggerTypes';
import { GetSupportedLanguagesResponse } from '../models/swaggerTypes';

import { BasicResponse, IndexResponse } from '../models/swaggerTypes';
import { MailManager } from '../managers/MailManager';
import { GoogleManager } from '../managers/GoogleManager';

export class PublicService {
  static async getSupportedLanguages(
    req: any
  ): Promise<GetSupportedLanguagesResponse> {
    return {
      languages: GoogleManager.getLangCodes(),
    };
  }

  static async getIndexData(): Promise<IndexResponse> {
    return {
      success: true,
    };
  }

  static async sendContactEmail(
    req: any,
    name: string,
    email: string,
    subject: string,
    text: string
  ): Promise<BasicResponse> {
    const newText = `Sender: ${name} - ${email}\nSubject: ${subject}\n\nText:\n${text}`;
    await MailManager.getInstance().sendMail(req, subject, newText);

    return {
      success: true,
      message: __('PublicService.sendContactEmail.success'),
    };
  }

  static async sendRegisterEmail(
    req: any,
    company: string,
    city: string,
    email: string,
    canContact: boolean
  ): Promise<BasicResponse> {
    const newText = `Company: ${company}\nCity: ${city}\nEmail: ${email}\nCan be Contacted: ${
      canContact ? 'Yes' : 'No'
    }`;
    await MailManager.getInstance().sendMail(req, 'New Registration', newText);

    return {
      success: true,
      message: __('PublicService.sendRegisterEmail.success'),
    };
  }
}
