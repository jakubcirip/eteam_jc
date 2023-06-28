import { Placeholder } from '../../managers/PlaceholderManager';

import { SQLManager } from '../../managers/SQLManager';
import { Utils } from '../../../Utils';

export interface PlaceholderData {
  intId: number;
  divId: number;
  companyId: number;
  candidateName?: string;
  candidateTag?: string;
  candidateEmail: string;
  candidateType?: string;
}

export class CandidateInterviewUrlPlaceholder implements Placeholder {
  title: string = __('emailPlaceholders.shared.candidateInterviewUrl.title');
  name: string = '{{candidateInterviewUrl}}';

  constructor() {}

  async parse(data: PlaceholderData): Promise<(a: string) => string> {
    const intData = await SQLManager.knex
      .select(['tag'])
      .from('job_interviews')
      .where('id', data.intId)
      .limit(1);

    if (intData.length <= 0) {
      return (a) => a;
    }
    const interviewTag = intData[0].tag;

    const url =
      process.env.INTERVIEW_URL +
      '/invite/' +
      interviewTag +
      '/' +
      data.candidateTag;
    return (str) => str.split(this.name).join(url);
  }
}

export class CandidateNamePlaceholder implements Placeholder {
  title: string = __('emailPlaceholders.shared.candidateName.title');
  name: string = '{{candidateName}}';

  constructor() {}

  async parse(data: PlaceholderData): Promise<(a: string) => string> {
    return (str) => str.split(this.name).join(data.candidateName);
  }
}

export class CandidateTagPlaceholder implements Placeholder {
  title: string = __('emailPlaceholders.shared.candidateTag.title');
  name: string = '{{candidateTag}}';

  constructor() {}

  async parse(data: PlaceholderData): Promise<(a: string) => string> {
    return (str) => str.split(this.name).join(data.candidateTag);
  }
}

export class CandidateEmailPlaceholder implements Placeholder {
  title: string = __('emailPlaceholders.shared.candidateEmail.title');
  name: string = '{{candidateEmail}}';

  constructor() {}

  async parse(data: PlaceholderData): Promise<(a: string) => string> {
    return (str) => str.split(this.name).join(data.candidateEmail);
  }
}

export class CandidateTypePlaceholder implements Placeholder {
  title: string = __('emailPlaceholders.shared.candidateType.title');
  name: string = '{{candidateType}}';

  constructor() {}

  async parse(data: PlaceholderData): Promise<(a: string) => string> {
    return (str) => str.split(this.name).join(data.candidateType);
  }
}

export class CompanyNamePlaceholder implements Placeholder {
  title: string = __('emailPlaceholders.shared.companyName.title');
  name: string = '{{companyName}}';

  constructor() {}

  async parse(data: PlaceholderData): Promise<(a: string) => string> {
    const companyId = data.companyId;
    const companyData = await SQLManager.knex
      .select(['name'])
      .from('company')
      .where('id', companyId)
      .limit(1);

    if (companyData.length <= 0) {
      return (a) => a;
    }

    return (str) => str.split(this.name).join(companyData[0].name);
  }
}

// export class CompanyIcoPlaceholder implements Placeholder {
//   title: string = __('emailPlaceholders.shared.companyIco.title');
//   name: string = '{{companyIco}}';

//   constructor() {}

//   async parse(data: PlaceholderData): Promise<(a: string) => string> {
//     const companyId = data.companyId;
//     const companyData = await SQLManager.knex
//       .select(['ico'])
//       .from('company')
//       .where('id', companyId)
//       .limit(1);

//     if (companyData.length <= 0) {
//       return (a) => a;
//     }
//     return (str) => str.split(this.name).join(companyData[0].ico);
//   }
// }

export class CompanyEmailPlaceholder implements Placeholder {
  title: string = __('emailPlaceholders.shared.companyEmail.title');
  name: string = '{{companyEmail}}';

  constructor() {}

  async parse(data: PlaceholderData): Promise<(a: string) => string> {
    const companyId = data.companyId;
    const companyData = await SQLManager.knex
      .select(['email'])
      .from('company')
      .where('id', companyId)
      .limit(1);

    if (companyData.length <= 0) {
      return (a) => a;
    }
    return (str) => str.split(this.name).join(companyData[0].email);
  }
}

export class DivisionNamePlaceholder implements Placeholder {
  title: string = __('emailPlaceholders.shared.divisionName.title');
  name: string = '{{divitionName}}';

  constructor() {}

  async parse(data: PlaceholderData): Promise<(a: string) => string> {
    const divId = data.divId;
    const divData = await SQLManager.knex
      .select(['name'])
      .from('division')
      .where('id', divId)
      .limit(1);

    if (divData.length <= 0) {
      return (a) => a;
    }
    return (str) => str.split(this.name).join(divData[0].name);
  }
}

export class DivisionTagPlaceholder implements Placeholder {
  title: string = __('emailPlaceholders.shared.divisionTag.title');
  name: string = '{{divisionTag}}';

  constructor() {}

  async parse(data: PlaceholderData): Promise<(a: string) => string> {
    const divId = data.divId;
    const divData = await SQLManager.knex
      .select(['tag'])
      .from('division')
      .where('id', divId)
      .limit(1);

    if (divData.length <= 0) {
      return (a) => a;
    }
    return (str) => str.split(this.name).join(divData[0].tag);
  }
}

export class InterviewNamePlaceholder implements Placeholder {
  title: string = __('emailPlaceholders.shared.interviewName.title');
  name: string = '{{interviewName}}';

  constructor() {}

  async parse(data: PlaceholderData): Promise<(a: string) => string> {
    const intData = await SQLManager.knex
      .select(['name'])
      .from('job_interviews')
      .where('id', data.intId)
      .limit(1);

    if (intData.length <= 0) {
      return (a) => a;
    }
    return (str) => str.split(this.name).join(intData[0].name);
  }
}

export class InterviewTagPlaceholder implements Placeholder {
  title: string = __('emailPlaceholders.shared.interviewTag.title');
  name: string = '{{interviewTag}}';

  constructor() {}

  async parse(data: PlaceholderData): Promise<(a: string) => string> {
    const intData = await SQLManager.knex
      .select(['tag'])
      .from('job_interviews')
      .where('id', data.intId)
      .limit(1);

    if (intData.length <= 0) {
      return (a) => a;
    }
    return (str) => str.split(this.name).join(intData[0].tag);
  }
}

export class PositionNamePlaceholder implements Placeholder {
  title: string = __('emailPlaceholders.shared.positionName.title');
  name: string = '{{positionName}}';

  constructor() {}

  async parse(data: PlaceholderData): Promise<(a: string) => string> {
    const intData = await SQLManager.knex
      .select(['job_position_id'])
      .from('job_interviews')
      .where('id', data.intId)
      .limit(1);

    if (intData.length <= 0) {
      return (a) => a;
    }

    const posId = intData[0].job_position_id;

    const posData = await SQLManager.knex
      .select(['name'])
      .from('job_positions')
      .where('id', posId)
      .limit(1);

    if (posData.length <= 0) {
      return (a) => a;
    }
    return (str) => str.split(this.name).join(posData[0].name);
  }
}

export class PositionFormNamePlaceholder implements Placeholder {
  title: string = __('emailPlaceholders.shared.positionFormName.title');
  name: string = '{{positionFormName}}';

  constructor() {}

  async parse(data: PlaceholderData): Promise<(a: string) => string> {
    const intData = await SQLManager.knex
      .select(['job_position_form_id'])
      .from('job_interviews')
      .where('id', data.intId)
      .limit(1);

    if (intData.length <= 0) {
      return (a) => a;
    }

    const formId = intData[0].job_position_form_id;

    const formData = await SQLManager.knex
      .select(['name'])
      .from('job_positions_forms')
      .where('id', formId)
      .limit(1);

    if (formData.length <= 0) {
      return (a) => a;
    }
    return (str) => str.split(this.name).join(formData[0].name);
  }
}

export class PositionFormQuestionsAmountPlaceholder implements Placeholder {
  title: string = __(
    'emailPlaceholders.shared.positionFormQuestionsAmount.title'
  );
  name: string = '{{positionFormQuestionsAmount}}';

  constructor() {}

  async parse(data: PlaceholderData): Promise<(a: string) => string> {
    const intData = await SQLManager.knex
      .select(['job_position_form_id'])
      .from('job_interviews')
      .where('id', data.intId)
      .limit(1);

    if (intData.length <= 0) {
      return (a) => a;
    }

    const formId = intData[0].job_position_form_id;

    const formData = await SQLManager.knex
      .select(['data'])
      .from('job_positions_forms')
      .where('id', formId)
      .limit(1);

    if (formData.length <= 0) {
      return (a) => a;
    }

    const json = JSON.parse(formData[0].data);
    return (str) => str.split(this.name).join(json.pairs.length);
  }
}

export class InterviewCandidatesAmountPlaceholder implements Placeholder {
  title: string = __(
    'emailPlaceholders.shared.interviewCandidatesAmount.title'
  );
  name: string = '{{interviewCandidatesAmount}}';

  constructor() {}

  async parse(data: PlaceholderData): Promise<(a: string) => string> {
    const intData = await SQLManager.knex
      .select(SQLManager.knex.raw('COUNT(id) AS total'))
      .from('job_interviews_candidates')
      .where('job_interview_id', data.intId)
      .limit(1);

    if (intData.length <= 0) {
      return (a) => a;
    }

    const amount = intData[0].total;
    return (str) => str.split(this.name).join(amount);
  }
}

export class UniversalMailDataPlaceholder implements Placeholder {
  title: string;
  name: string;

  constructor(private type: string, title: string) {
    this.title = title;
    this.name = '{{' + type + 'Date}}';
  }

  async parse(data: PlaceholderData): Promise<(a: string) => string> {
    const intData = await SQLManager.knex
      .select('date')
      .from('job_interviews_data')
      .where('int_id', data.intId)
      .where('type', this.type)
      .limit(1);

    if (intData.length <= 0) {
      return (a) => a;
    }

    const date = intData[0].date;
    const dateStr = date.toISOString().replace(/T/, ' ').replace(/\..+/, '');
    return (str) => str.split(this.name).join(dateStr);
  }
}
