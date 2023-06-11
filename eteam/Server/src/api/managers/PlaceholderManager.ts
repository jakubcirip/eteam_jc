import { MailPlaceholder } from '../models/swaggerTypes';

import { PlaceholderData } from '../classes/placeholders/SharedEmailPlaceholders';

export interface PlaceholderType {
  name: string;
  placeholders: Placeholder[];
}

export interface Placeholder {
  name: string;
  title: string;
  parse(req: any): Promise<(a: string) => string>;
}

export class PlaceholderManager {
  static i: PlaceholderManager;

  private types: PlaceholderType[] = [];

  static getInstance(): PlaceholderManager {
    if (!PlaceholderManager.i) {
      PlaceholderManager.i = new PlaceholderManager();
    }

    return PlaceholderManager.i;
  }

  constructor() {}

  async parseEmail(
    mail: string,
    type: string,
    obj: PlaceholderData
  ): Promise<string> {
    let newMail = mail;

    const typeObj = this.types.find((t) => t.name === type);

    const parseMethods = [];

    const promises = typeObj.placeholders.map(async (p) => {
      const method = await p.parse(obj);

      parseMethods.push(method);
    });

    await Promise.all(promises);

    parseMethods.forEach((m) => {
      newMail = m(newMail);
    });

    return newMail;
  }

  registerType(type: PlaceholderType): PlaceholderManager {
    this.types.push(type);
    return this;
  }

  getPlaceholders(type: string): MailPlaceholder[] {
    const pType = this.types.find((t) => {
      return t.name === type;
    });

    if (!pType) {
      return [];
    }

    return pType.placeholders.map((p) => {
      return {
        name: p.name,
        title: p.title,
      };
    });
  }
}
