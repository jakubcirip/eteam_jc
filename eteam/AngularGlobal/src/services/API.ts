type QueryParameters = {
  [key: string]:
    | string
    | number
    | string[]
    | number[]
    | boolean
    | boolean[]
    | undefined;
};

export type GetHrEmailCatalogResponse = {
  catalogs: Array<{
    id: number;

    name: string;

    catId: string;

    planId: string;

    likes: number;

    downloads: number;

    createdAt: string;

    desc: string;

    groups: Array<{
      id: string;

      title: string;

      html: string;

      subject: string;

      attachments: Array<string>;
    }>;
  }>;
};
export type ImportHrEmailCatalogParamBody = {
  catalogId: number;
};
export type LikeHrEmailCatalogParamEmailId = number;
export type GetHrFormCatalogResponse = {
  catalogs: Array<{
    id: number;

    name: string;

    catId: string;

    planId: string;

    likes: number;

    downloads: number;

    createdAt: string;

    desc: string;

    groups: Array<{
      lang_code: string;

      name: string;

      pairs: Array<{}>;
    }>;
  }>;
};
export type ImportHrFormCatalogParamBody = {
  catalogId: number;
};
export type LikeHrFormCatalogParamEmailId = number;
export type CreateFastInterviewParamBody = {
  emailId: number;

  formId: number;

  imageType: string;

  imageData: string;

  name: string;

  color: string;

  isDark: boolean;

  prelog: string;

  startDate: string;

  endDate: string;

  remindDate: string;
};
export type CompanySettings = {
  name: string;

  email: string;

  plan: string;

  tokens: number;

  domain: string;
};
export type CompanyIndexData = {
  tokens: number;

  plan: {
    id: number;

    name: string;

    color: string;

    colorHex: string;
  };

  divs: number;

  hrs: number;

  inactiveHrs: number;
};
export type MeInfoCompany = {
  name: string;
};
export type TokensInfoCompany = {
  amount: number;
};
export type GetCompanyTokensStatsResponse = {
  stats: Array<{
    text: string;

    amount: number;

    isRed: boolean;
  }>;
};
export type GetCompanyInterviewHistoryResponse = {
  ints: Array<{
    id: number;

    divName: string;

    hrName: string;

    status: string;
  }>;
};
export type GetCompanyInterviewHistoryDetailParamHistoryIntId = number;
export type GetCompanyInterviewHistoryDetailResponse = {
  id: number;

  divName: string;

  divId: number;

  hrName: string;

  hrId: number;

  status: string;

  createdAt: string;

  endedAt: string;

  startedAt: string;

  candidatesAmount: number;

  planUsed: string;

  tokensSpent: number;
};
export type DivisionList = Array<{
  name: string;

  id: number;

  hrs: number;

  mail: string;
}>;
export type Division = {
  name: string;

  id: number;

  hrs: number;

  mail: string;
};
export type HRPerson = {
  id: number;

  name: string;

  email: string;

  isRegistered: boolean;
};
export type DivisionDetail = {
  name: string;

  id: number;

  hrs: Array<{
    id: number;

    name: string;

    email: string;

    isRegistered: boolean;
  }>;
};
export type Mp3Array = Array<{
  id: string;

  name: string;

  src: string;
}>;
export type Mp4Array = Array<{
  id: string;

  name: string;

  src: string;
}>;
export type FormTemplatesObject = {
  templates: Array<{
    id: number;

    name: string;
  }>;
};
export type FormTemplate = {
  id: number;

  name: string;
};
export type MailPlaceholderRes = {
  placeholders: Array<{
    name: string;

    title: string;
  }>;
};
export type MailPlaceholder = {
  name: string;

  title: string;
};
export type MailTypes = {
  types: Array<{
    usages: Array<string>;

    staticDate: boolean;

    name: string;

    title: string;
  }>;
};
export type MailTypeArray = Array<{
  usages: Array<string>;

  staticDate: boolean;

  name: string;

  title: string;
}>;
export type MailType = {
  usages: Array<string>;

  staticDate: boolean;

  name: string;

  title: string;
};
export type MailsResponse = {
  mails: Array<{
    id: number;

    name: string;

    type: string;

    content: string;

    subject: string;

    attachments: Array<string>;
  }>;
};
export type MailArray = Array<{
  id: number;

  name: string;

  type: string;

  content: string;

  subject: string;

  attachments: Array<string>;
}>;
export type Mail = {
  id: number;

  name: string;

  type: string;

  content: string;

  subject: string;

  attachments: Array<string>;
};
export type MailPreview = {
  content: string;

  subject: string;
};
export type InterviewResultsData = {
  people: Array<{}>;
};
export type InterviewSummary = {
  prelog: string;

  warnings: Array<{
    type: string;

    text: string;
  }>;

  emails: Array<{
    id: number;

    type: string;

    date: string;
  }>;

  testUserTag: string;

  interviewTag: string;

  formularName: string;

  interviewName: string;

  totalQuestions: number;

  totalCandidates: number;

  pricePerSecond: number;

  interviewSeconds: number;

  totalPrice: number;
};
export type InterviewSummaryWarning = {
  type: string;

  text: string;
};
export type InterviewSummaryEmail = {
  id: number;

  type: string;

  date: string;
};
export type InterviewCandidatesData = {
  candidates: Array<{
    email_uid?: number;

    id: number;

    tag: string;

    name: string;

    email: string;

    type: string;
  }>;

  interviewName: string;
};
export type InterviewCandidate = {
  email_uid?: number;

  id: number;

  tag: string;

  name: string;

  email: string;

  type: string;
};
export type InterviewData = {
  basicData: {
    dark: boolean;

    name: string;

    prelog: string;

    tag: string;

    state: string;

    posId: number;

    formId: number;

    image: string;

    color: string;
  };

  advancedData: Array<{
    type: string;

    date: string;

    mailId: number;
  }>;

  settings: {
    jobs: {
      positions: Array<{
        id: number;

        name: string;

        forms: Array<{
          id: number;

          name: string;
        }>;
      }>;
    };

    emails: Array<{
      type: string;

      values: Array<{
        id: number;

        name: string;
      }>;
    }>;
  };

  types: Array<{
    name: string;

    title: string;

    staticDate: boolean;

    usages: Array<string>;
  }>;
};
export type InterviewAdvancedData = {
  type: string;

  date: string;

  mailId: number;
};
export type InterviewBasicData = {
  dark: boolean;

  name: string;

  prelog: string;

  tag: string;

  state: string;

  posId: number;

  formId: number;

  image: string;

  color: string;
};
export type InterviewSettings = {
  jobs: {
    positions: Array<{
      id: number;

      name: string;

      forms: Array<{
        id: number;

        name: string;
      }>;
    }>;
  };

  emails: Array<{
    type: string;

    values: Array<{
      id: number;

      name: string;
    }>;
  }>;
};
export type InterviewSettingsEmail = {
  type: string;

  values: Array<{
    id: number;

    name: string;
  }>;
};
export type InterviewSettingsEmailValue = {
  id: number;

  name: string;
};
export type InterviewSettingsPosition = {
  id: number;

  name: string;

  forms: Array<{
    id: number;

    name: string;
  }>;
};
export type InterviewSettingsForms = {
  id: number;

  name: string;
};
export type InterviewArray = {
  interviews: Array<{
    id: number;

    name: string;

    tag: string;

    state: string;

    startAt: string;

    finishAt: string;
  }>;
};
export type Interview = {
  id: number;

  name: string;

  tag: string;

  state: string;

  startAt: string;

  finishAt: string;
};
export type InterviewPeople = {
  questions: Array<{}>;

  failedCandidates: Array<{}>;

  candidates: Array<{}>;

  medals: Array<{}>;

  intName: string;
};
export type ParseEmailPlaceholderResponse = {
  candidateEmail: string;

  subject: string;

  text: string;
};
export type InternalInterviewCandidateStatistics = {
  submited: Array<{
    personId: number;

    canId: number;

    tag: string;
  }>;

  notSubmited: Array<{
    personId: number;

    canId: number;

    tag: string;
  }>;
};
export type InternalInterviewCandidate = {
  personId: number;

  canId: number;

  tag: string;
};
export type InterviewEmojiObject = {
  emojis: Array<{
    name: string;

    images: Array<string>;
  }>;
};
export type InterviewEmoji = {
  name: string;

  images: Array<string>;
};
export type UpdateInterviewMedalsParamIntId = number;
export type SetHrInterviewColorParamIntId = number;
export type SetHrInterviewColorParamBody = {
  color: string;
};
export type SetHrInterviewImageParamIntId = number;
export type SetHrInterviewImageParamBody = {
  data: string;

  type: string;
};
export type GetHrInterviewImagesResponse = {
  images: Array<{
    url: string;

    urlSmall: string;

    type: string;

    name: string;
  }>;
};
export type UpdateInterviewNotesParamIntId = number;
export type UpdateInterviewNotesParamCanId = number;
export type UpdateInterviewNotesResponse = {
  note: string;
};
export type ExportHrInterviewPdfParamIntId = number;
export type IndexResponse = {
  success: boolean;
};
export type GetSupportedLanguagesResponse = {
  languages: Array<{
    code: string;

    name: string;
  }>;
};
export type GenerateInterviewZipParamBody = {
  data: string;
};
export type BasicResponse = {
  success: boolean;

  message: string;

  data?: {
    intId?: number;

    formId?: number;

    posId?: number;

    idsArr?: Array<{
      id: number;

      type: string;
    }>;
  };
};
export type LoginGlobalResponse = {
  domain: string;

  success: boolean;

  message: string;

  key: string;
};
export type PlansData = {
  isCompany: boolean;

  plans: Array<{
    id: number;

    name: string;

    color: string;

    colorHex: string;

    price: string;

    points: Array<string>;

    pointsNo: Array<string>;

    pointsAnalysis: Array<string>;

    pointsAnalysisNo: Array<string>;

    pointsLimits: Array<string>;

    active: boolean;

    upgrade: boolean;

    recommended: boolean;
  }>;
};
export type FaqCompany = {
  categories: Array<{
    name: string;

    questions: Array<{
      question: string;

      answer: string;
    }>;
  }>;
};
export type PublicInterviewResponse = {
  dark: boolean;

  prelog: string;

  color: string;

  image: string;

  pairs: Array<{
    answerTime: number;

    uuid: string;

    q: {};

    a: {};

    response: {
      rating: number;

      data: {};
    };
  }>;
};
export type HrSettings = {
  name: string;

  email: string;

  company: string;

  plan: string;

  tokens: number;

  domain: string;

  divName: string;

  divMail: string;
};
export type JobPositionForms = {
  name: string;

  forms: Array<{
    defaultLanguage: string;

    id: number;

    name: string;

    questions: number;
  }>;
};
export type JobPositionForm = {
  defaultLanguage: string;

  name: string;

  data: string;

  medalCategories: Array<{
    name: string;

    medals: Array<{
      name: string;

      tag: string;

      weight: number;

      medalId: number;

      qpUuid: string;
    }>;
  }>;
};
export type JobPositions = {
  positions: Array<{
    id: number;

    name: string;

    forms: number;
  }>;
};
export type MeInfoHr = {
  name: string;
};
export type PreconfirmHr = {
  email: string;
};
export type HrGetCalendarResponse = {
  events: Array<{
    title: string;

    start: string;

    end: string;

    color: string;
  }>;
};
export type HrCanEditPersonParamPersonId = number;
export type HrCanEditPersonResponse = {
  canEdit: boolean;

  canDelete: boolean;
};
export type HrCanEditEmailParamEmailId = number;
export type HrCanEditEmailResponse = {
  canEdit: boolean;

  canDelete: boolean;
};
export type HrCanEditJobPositionParamPositionId = number;
export type HrCanEditJobPositionResponse = {
  canEdit: boolean;

  canDelete: boolean;
};
export type HrCanEditJobFormularParamPositionId = number;
export type HrCanEditJobFormularParamFormId = number;
export type HrCanEditJobFormularResponse = {
  canEdit: boolean;

  canDelete: boolean;
};
export type HrCanEditMp3ParamMp3Id = string;
export type HrCanEditMp3Response = {
  canEdit: boolean;

  canDelete: boolean;
};
export type HrCanEditMp4ParamMp4Id = string;
export type HrCanEditMp4Response = {
  canEdit: boolean;

  canDelete: boolean;
};
export type EditHrInterviewPrelogParamIntId = number;
export type EditHrInterviewPrelogParamBody = {
  prelog: string;
};
export type UpdateHrJobPositiomFormMedalsParamPositionId = number;
export type UpdateHrJobPositiomFormMedalsParamFormId = number;
export type UpdateHrJobPositiomFormMedalsParamBody = {
  medals: Array<{
    medalId: number;

    qpUuid?: string;

    weight: number;
  }>;
};
export type TestHrInterviewParamIntId = number;
export type SetHrInterviewBackgroundColorParamIntId = number;
export type SetHrInterviewBackgroundColorParamBody = {
  isDark: boolean;
};
export type GetSharedVideoTutorialsResponse = {
  paths: Array<{
    pth: string;

    video: string;

    title: string;

    text: string;
  }>;
};

class ApiError {
  public message: string;
  public details: Error;

  constructor(message: string) {
    this.message = message;
  }
}

/**
 * This is an **example** API to demonstrate features of OpenAPI specification
 * @class API
 * @param {(string)} [domainOrOptions] - The project domain.
 */
class API {
  protected baseUrl: string = 'http://localhost:3000';
  protected apiKey: string;

  serializeQueryParams(parameters: QueryParameters) {
    return Object.keys(parameters)
      .reduce((acc, p) => {
        const param = parameters[p];
        if (typeof param === 'undefined' || param === '') {
          return acc;
        }
        return [
          ...acc,
          `${encodeURIComponent(p)}=${encodeURIComponent(
            String(parameters[p]),
          )}`,
        ];
      }, [])
      .join('&');
  }

  protected transformParameter(value: any, transformOperation?: string) {
    switch (transformOperation) {
      case 'joinUsingPipes':
        return Array.isArray(value) ? value.join('|') : value;
      default:
        return value;
    }
  }

  public setBaseUrl(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public setApiKey(apiKey: string) {
    this.apiKey = apiKey;
  }

  protected appendAuthHeaders(headerParams: Headers) {
    const headers = new Headers(headerParams);
    if (this.apiKey) {
      headers.append('', this.apiKey);
    }
    return headers;
  }

  private async request(
    method: string,
    url: string,
    body: any,
    headers: Headers = new Headers(),
    queryParameters: QueryParameters = {},
  ) {
    const queryParams =
      queryParameters && Object.keys(queryParameters).length
        ? this.serializeQueryParams(queryParameters)
        : null;
    const urlWithParams = url + (queryParams ? '?' + queryParams : '');

    if (headers.get('Content-Type') === 'multipart/form-data') {
      const form = new FormData();
      for (let k in body) {
        form.append(k, body[k]);
      }
      body = form;
    } else if (
      headers.get('Content-Type') === 'application/json' &&
      body &&
      Object.keys(body).length > 0
    ) {
      body = JSON.stringify(body);
    } else {
      body = undefined;
    }

    if (headers.get('Content-Type') === 'multipart/form-data') {
      headers.delete('Content-Type');
    }

    const response = await fetch(urlWithParams, {
      method,
      headers,
      body,
      credentials: 'include',
    });

    if (response.ok) {
      return response.json();
    } else {
      const err = new ApiError(response.statusText);
      err.details = await response.json();
      throw err;
    }
  }

  /**
   * Get parsed email data
   * @method
   * @name API#parseInternalEmailPlaceholders
   */
  parseInternalEmailPlaceholders(
    parameters: {},
    body: {
      candidateId: number;

      companyId: number;

      divId: number;

      intId: number;

      mailId: number;

      customCanEmail?: string;
    },
  ): Promise<{
    candidateEmail: string;

    subject: string;

    text: string;
  }> {
    let path = '/internal/parse-email-placeholders';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.request(
      'POST',
      `${this.baseUrl}${path}`,
      body,
      headers,
      queryParameters,
    );
  }

  /**
   * Get Interview Candidates Data (did/didnt submit results)
   * @method
   * @name API#getInternalInterviewCandidateStatistics
   */
  getInternalInterviewCandidateStatistics(
    intId: number,
    parameters: {} = {},
  ): Promise<{
    submited: Array<{
      personId: number;

      canId: number;

      tag: string;
    }>;

    notSubmited: Array<{
      personId: number;

      canId: number;

      tag: string;
    }>;
  }> {
    let path = '/internal/interview-candidate-statistics/{intId}';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    path = path.replace('{intId}', intId.toString());

    return this.request(
      'GET',
      `${this.baseUrl}${path}`,
      {},
      headers,
      queryParameters,
    );
  }

  /**
   * Get Interview summary (mustly used to calculate prices)
   * @method
   * @name API#getInternalInterviewSummary
   */
  getInternalInterviewSummary(
    intId: number,
    parameters: {} = {},
  ): Promise<{
    prelog: string;

    warnings: Array<{
      type: string;

      text: string;
    }>;

    emails: Array<{
      id: number;

      type: string;

      date: string;
    }>;

    testUserTag: string;

    interviewTag: string;

    formularName: string;

    interviewName: string;

    totalQuestions: number;

    totalCandidates: number;

    pricePerSecond: number;

    interviewSeconds: number;

    totalPrice: number;
  }> {
    let path = '/internal/interview-summary/{intId}';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    path = path.replace('{intId}', intId.toString());

    return this.request(
      'GET',
      `${this.baseUrl}${path}`,
      {},
      headers,
      queryParameters,
    );
  }

  /**
   * Send mail to admin
   * @method
   * @name API#sendContactEmail
   */
  sendContactEmail(
    parameters: {},
    body: {
      name: string;

      email: string;

      subject: string;

      text: string;
    },
  ): Promise<{
    success: boolean;

    message: string;

    data?: {
      intId?: number;

      formId?: number;

      posId?: number;

      idsArr?: Array<{
        id: number;

        type: string;
      }>;
    };
  }> {
    let path = '/public/contact';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.request(
      'POST',
      `${this.baseUrl}${path}`,
      body,
      headers,
      queryParameters,
    );
  }

  /**
   * Send register mails
   * @method
   * @name API#registerInterest
   */
  registerInterest(
    parameters: {},
    body: {
      company: string;

      city: string;

      email: string;

      canContact: boolean;
    },
  ): Promise<{
    success: boolean;

    message: string;

    data?: {
      intId?: number;

      formId?: number;

      posId?: number;

      idsArr?: Array<{
        id: number;

        type: string;
      }>;
    };
  }> {
    let path = '/public/register';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.request(
      'POST',
      `${this.baseUrl}${path}`,
      body,
      headers,
      queryParameters,
    );
  }

  /**
   * Data used by Angluar Public (index page)
   * @method
   * @name API#getIndexData
   */
  getIndexData(
    parameters: {} = {},
  ): Promise<{
    success: boolean;
  }> {
    let path = '/public/indes';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.request(
      'POST',
      `${this.baseUrl}${path}`,
      {},
      headers,
      queryParameters,
    );
  }

  /**
   * Get public mp3 file
   * @method
   * @name API#getPublicMp3
   */
  getPublicMp3(
    mp3Id: string,
    intTag: string,
    parameters: {} = {},
  ): Promise<{}> {
    let path = '/public/fm/mp3/{mp3Id}/{intTag}';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers.append('Accept', 'audio/mpeg');
    headers.append('Content-Type', 'application/json');

    path = path.replace('{mp3Id}', mp3Id.toString());

    path = path.replace('{intTag}', intTag.toString());

    return this.request(
      'GET',
      `${this.baseUrl}${path}`,
      {},
      headers,
      queryParameters,
    );
  }

  /**
   * Get public mp4 file
   * @method
   * @name API#getPublicMp4
   */
  getPublicMp4(
    mp4Id: string,
    intTag: string,
    parameters: {} = {},
  ): Promise<{}> {
    let path = '/public/fm/mp4/{mp4Id}/{intTag}';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers.append('Accept', 'video/mp4');
    headers.append('Content-Type', 'application/json');

    path = path.replace('{mp4Id}', mp4Id.toString());

    path = path.replace('{intTag}', intTag.toString());

    return this.request(
      'GET',
      `${this.baseUrl}${path}`,
      {},
      headers,
      queryParameters,
    );
  }

  /**
   * Get all interview emojis
   * @method
   * @name API#getEmojis
   */
  getEmojis(
    parameters: {} = {},
  ): Promise<{
    emojis: Array<{
      name: string;

      images: Array<string>;
    }>;
  }> {
    let path = '/interview/emoji';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.request(
      'GET',
      `${this.baseUrl}${path}`,
      {},
      headers,
      queryParameters,
    );
  }

  /**
   * Validate interview and user
   * @method
   * @name API#validateInterviewUser
   */
  validateInterviewUser(
    intTag: string,
    userTag: string,
    parameters: {} = {},
  ): Promise<{
    success: boolean;

    message: string;

    data?: {
      intId?: number;

      formId?: number;

      posId?: number;

      idsArr?: Array<{
        id: number;

        type: string;
      }>;
    };
  }> {
    let path = '/interview/{intTag}/{userTag}/validate';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    path = path.replace('{intTag}', intTag.toString());

    path = path.replace('{userTag}', userTag.toString());

    return this.request(
      'GET',
      `${this.baseUrl}${path}`,
      {},
      headers,
      queryParameters,
    );
  }

  /**
   * Get interview data
   * @method
   * @name API#submitInterviewResponse
   */
  submitInterviewResponse(
    intTag: string,
    userTag: string,
    parameters: {},
    body: {},
  ): Promise<{
    success: boolean;

    message: string;

    data?: {
      intId?: number;

      formId?: number;

      posId?: number;

      idsArr?: Array<{
        id: number;

        type: string;
      }>;
    };
  }> {
    let path = '/interview/{intTag}/{userTag}/submit';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    path = path.replace('{intTag}', intTag.toString());

    path = path.replace('{userTag}', userTag.toString());

    return this.request(
      'POST',
      `${this.baseUrl}${path}`,
      body,
      headers,
      queryParameters,
    );
  }

  /**
   * Get interview data
   * @method
   * @name API#getInterviewForm
   */
  getInterviewForm(
    intTag: string,
    userTag: string,
    parameters: {} = {},
  ): Promise<{
    dark: boolean;

    prelog: string;

    color: string;

    image: string;

    pairs: Array<{
      answerTime: number;

      uuid: string;

      q: {};

      a: {};

      response: {
        rating: number;

        data: {};
      };
    }>;
  }> {
    let path = '/interview/{intTag}/{userTag}';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    path = path.replace('{intTag}', intTag.toString());

    path = path.replace('{userTag}', userTag.toString());

    return this.request(
      'GET',
      `${this.baseUrl}${path}`,
      {},
      headers,
      queryParameters,
    );
  }

  /**
   * Get list of all hr interviews
   * @method
   * @name API#getHrInterviews
   */
  getHrInterviews(
    parameters: {} = {},
  ): Promise<{
    interviews: Array<{
      id: number;

      name: string;

      tag: string;

      state: string;

      startAt: string;

      finishAt: string;
    }>;
  }> {
    let path = '/hr/interviews';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.request(
      'GET',
      `${this.baseUrl}${path}`,
      {},
      headers,
      queryParameters,
    );
  }

  /**
   * Create new interview
   * @method
   * @name API#addHrInterview
   */
  addHrInterview(
    parameters: {},
    body: {
      isNonstop: boolean;

      name: string;
    },
  ): Promise<{
    success: boolean;

    message: string;

    data?: {
      intId?: number;

      formId?: number;

      posId?: number;

      idsArr?: Array<{
        id: number;

        type: string;
      }>;
    };
  }> {
    let path = '/hr/interviews';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.request(
      'POST',
      `${this.baseUrl}${path}`,
      body,
      headers,
      queryParameters,
    );
  }

  /**
   * Remove interview from list
   * @method
   * @name API#deleteHrInterview
   */
  deleteHrInterview(
    parameters: {},
    body: {
      id: number;
    },
  ): Promise<{
    success: boolean;

    message: string;

    data?: {
      intId?: number;

      formId?: number;

      posId?: number;

      idsArr?: Array<{
        id: number;

        type: string;
      }>;
    };
  }> {
    let path = '/hr/interviews';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.request(
      'DELETE',
      `${this.baseUrl}${path}`,
      body,
      headers,
      queryParameters,
    );
  }

  /**
   * Edit interview (basic data only)
   * @method
   * @name API#editHrInterview
   */
  editHrInterview(
    parameters: {},
    body: {
      id: number;

      name: string;
    },
  ): Promise<{
    success: boolean;

    message: string;

    data?: {
      intId?: number;

      formId?: number;

      posId?: number;

      idsArr?: Array<{
        id: number;

        type: string;
      }>;
    };
  }> {
    let path = '/hr/interviews';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.request(
      'PUT',
      `${this.baseUrl}${path}`,
      body,
      headers,
      queryParameters,
    );
  }

  /**
   * Get data & options for HR Interview settings
   * @method
   * @name API#getHrInterview
   */
  getHrInterview(
    intId: string,
    parameters: {} = {},
  ): Promise<{
    basicData: {
      dark: boolean;

      name: string;

      prelog: string;

      tag: string;

      state: string;

      posId: number;

      formId: number;

      image: string;

      color: string;
    };

    advancedData: Array<{
      type: string;

      date: string;

      mailId: number;
    }>;

    settings: {
      jobs: {
        positions: Array<{
          id: number;

          name: string;

          forms: Array<{
            id: number;

            name: string;
          }>;
        }>;
      };

      emails: Array<{
        type: string;

        values: Array<{
          id: number;

          name: string;
        }>;
      }>;
    };

    types: Array<{
      name: string;

      title: string;

      staticDate: boolean;

      usages: Array<string>;
    }>;
  }> {
    let path = '/hr/interviews/{intId}';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    path = path.replace('{intId}', intId.toString());

    return this.request(
      'GET',
      `${this.baseUrl}${path}`,
      {},
      headers,
      queryParameters,
    );
  }

  /**
   * Update job position + form interview data
   * @method
   * @name API#editHrInterviewPosition
   */
  editHrInterviewPosition(
    intId: string,
    parameters: {},
    body: {
      posId?: {};

      formId?: {};
    },
  ): Promise<{
    success: boolean;

    message: string;

    data?: {
      intId?: number;

      formId?: number;

      posId?: number;

      idsArr?: Array<{
        id: number;

        type: string;
      }>;
    };
  }> {
    let path = '/hr/interviews/{intId}/position';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    path = path.replace('{intId}', intId.toString());

    return this.request(
      'PUT',
      `${this.baseUrl}${path}`,
      body,
      headers,
      queryParameters,
    );
  }

  /**
   * Update date information about interview
   * @method
   * @name API#editHrInterviewDate
   */
  editHrInterviewDate(
    intId: string,
    parameters: {},
    body: {
      date: string;

      type: string;
    },
  ): Promise<{
    success: boolean;

    message: string;

    data?: {
      intId?: number;

      formId?: number;

      posId?: number;

      idsArr?: Array<{
        id: number;

        type: string;
      }>;
    };
  }> {
    let path = '/hr/interviews/{intId}/date';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    path = path.replace('{intId}', intId.toString());

    return this.request(
      'PUT',
      `${this.baseUrl}${path}`,
      body,
      headers,
      queryParameters,
    );
  }

  /**
   * Update email information about interview
   * @method
   * @name API#editHrInterviewEmail
   */
  editHrInterviewEmail(
    intId: string,
    parameters: {},
    body: {
      emailId: number;

      type: string;
    },
  ): Promise<{
    success: boolean;

    message: string;

    data?: {
      intId?: number;

      formId?: number;

      posId?: number;

      idsArr?: Array<{
        id: number;

        type: string;
      }>;
    };
  }> {
    let path = '/hr/interviews/{intId}/email';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    path = path.replace('{intId}', intId.toString());

    return this.request(
      'PUT',
      `${this.baseUrl}${path}`,
      body,
      headers,
      queryParameters,
    );
  }

  /**
   * Get candidates in interview
   * @method
   * @name API#getHrInterviewCandidates
   */
  getHrInterviewCandidates(
    intId: string,
    parameters: {} = {},
  ): Promise<{
    candidates: Array<{
      email_uid?: number;

      id: number;

      tag: string;

      name: string;

      email: string;

      type: string;
    }>;

    interviewName: string;
  }> {
    let path = '/hr/interviews/{intId}/candidates';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    path = path.replace('{intId}', intId.toString());

    return this.request(
      'GET',
      `${this.baseUrl}${path}`,
      {},
      headers,
      queryParameters,
    );
  }

  /**
   * Add person into hr interview (assign as candidate)
   * @method
   * @name API#createHrInterviewCandidate
   */
  createHrInterviewCandidate(
    intId: string,
    parameters: {},
    body: {
      personId: number;
    },
  ): Promise<{
    success: boolean;

    message: string;

    data?: {
      intId?: number;

      formId?: number;

      posId?: number;

      idsArr?: Array<{
        id: number;

        type: string;
      }>;
    };
  }> {
    let path = '/hr/interviews/{intId}/candidates';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    path = path.replace('{intId}', intId.toString());

    return this.request(
      'POST',
      `${this.baseUrl}${path}`,
      body,
      headers,
      queryParameters,
    );
  }

  /**
   * Remove person from interview (candidate)
   * @method
   * @name API#removeHrInterviewCandidate
   */
  removeHrInterviewCandidate(
    intId: string,
    canId: string,
    parameters: {} = {},
  ): Promise<{
    success: boolean;

    message: string;

    data?: {
      intId?: number;

      formId?: number;

      posId?: number;

      idsArr?: Array<{
        id: number;

        type: string;
      }>;
    };
  }> {
    let path = '/hr/interviews/{intId}/candidates/{canId}';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    path = path.replace('{intId}', intId.toString());

    path = path.replace('{canId}', canId.toString());

    return this.request(
      'DELETE',
      `${this.baseUrl}${path}`,
      {},
      headers,
      queryParameters,
    );
  }

  /**
   * Get summary of interview
   * @method
   * @name API#getHrInterviewSummary
   */
  getHrInterviewSummary(
    intId: string,
    parameters: {} = {},
  ): Promise<{
    prelog: string;

    warnings: Array<{
      type: string;

      text: string;
    }>;

    emails: Array<{
      id: number;

      type: string;

      date: string;
    }>;

    testUserTag: string;

    interviewTag: string;

    formularName: string;

    interviewName: string;

    totalQuestions: number;

    totalCandidates: number;

    pricePerSecond: number;

    interviewSeconds: number;

    totalPrice: number;
  }> {
    let path = '/hr/interviews/{intId}/summary';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    path = path.replace('{intId}', intId.toString());

    return this.request(
      'GET',
      `${this.baseUrl}${path}`,
      {},
      headers,
      queryParameters,
    );
  }

  /**
   * Start an interview
   * @method
   * @name API#startHrInterview
   */
  startHrInterview(
    intId: string,
    parameters: {} = {},
  ): Promise<{
    success: boolean;

    message: string;

    data?: {
      intId?: number;

      formId?: number;

      posId?: number;

      idsArr?: Array<{
        id: number;

        type: string;
      }>;
    };
  }> {
    let path = '/hr/interviews/{intId}/start';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    path = path.replace('{intId}', intId.toString());

    return this.request(
      'POST',
      `${this.baseUrl}${path}`,
      {},
      headers,
      queryParameters,
    );
  }

  /**
   * Create new division
   * @method
   * @name API#createDivision
   */
  createDivision(
    parameters: {},
    body: {
      name: string;

      tag: string;
    },
  ): Promise<{
    success: boolean;

    message: string;

    data?: {
      intId?: number;

      formId?: number;

      posId?: number;

      idsArr?: Array<{
        id: number;

        type: string;
      }>;
    };
  }> {
    let path = '/divisions';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.request(
      'POST',
      `${this.baseUrl}${path}`,
      body,
      headers,
      queryParameters,
    );
  }

  /**
   * Get all divisions
   * @method
   * @name API#getDivisions
   */
  getDivisions(
    parameters: {} = {},
  ): Promise<
    Array<{
      name: string;

      id: number;

      hrs: number;

      mail: string;
    }>
  > {
    let path = '/divisions';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.request(
      'GET',
      `${this.baseUrl}${path}`,
      {},
      headers,
      queryParameters,
    );
  }

  /**
   * Delete division
   * @method
   * @name API#deleteDivision
   */
  deleteDivision(
    divisionId: string,
    parameters: {} = {},
  ): Promise<{
    success: boolean;

    message: string;

    data?: {
      intId?: number;

      formId?: number;

      posId?: number;

      idsArr?: Array<{
        id: number;

        type: string;
      }>;
    };
  }> {
    let path = '/divisions/{divisionId}';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    path = path.replace('{divisionId}', divisionId.toString());

    return this.request(
      'DELETE',
      `${this.baseUrl}${path}`,
      {},
      headers,
      queryParameters,
    );
  }

  /**
   * Update division
   * @method
   * @name API#updateDivision
   */
  updateDivision(
    divisionId: string,
    parameters: {},
    body: {
      name: string;
    },
  ): Promise<{
    success: boolean;

    message: string;

    data?: {
      intId?: number;

      formId?: number;

      posId?: number;

      idsArr?: Array<{
        id: number;

        type: string;
      }>;
    };
  }> {
    let path = '/divisions/{divisionId}';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    path = path.replace('{divisionId}', divisionId.toString());

    return this.request(
      'PUT',
      `${this.baseUrl}${path}`,
      body,
      headers,
      queryParameters,
    );
  }

  /**
   * Get specific division
   * @method
   * @name API#getDivision
   */
  getDivision(
    divisionId: string,
    parameters: {} = {},
  ): Promise<{
    name: string;

    id: number;

    hrs: Array<{
      id: number;

      name: string;

      email: string;

      isRegistered: boolean;
    }>;
  }> {
    let path = '/divisions/{divisionId}';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    path = path.replace('{divisionId}', divisionId.toString());

    return this.request(
      'GET',
      `${this.baseUrl}${path}`,
      {},
      headers,
      queryParameters,
    );
  }

  /**
   * Get division mail password
   * @method
   * @name API#getDivisionMailPassword
   */
  getDivisionMailPassword(
    divisionId: string,
    parameters: {} = {},
  ): Promise<{
    success: boolean;

    message: string;

    data?: {
      intId?: number;

      formId?: number;

      posId?: number;

      idsArr?: Array<{
        id: number;

        type: string;
      }>;
    };
  }> {
    let path = '/divisions/{divisionId}/mail-pass';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    path = path.replace('{divisionId}', divisionId.toString());

    return this.request(
      'GET',
      `${this.baseUrl}${path}`,
      {},
      headers,
      queryParameters,
    );
  }

  /**
   * Change division mail password
   * @method
   * @name API#changeDivisionMailPassword
   */
  changeDivisionMailPassword(
    divisionId: string,
    parameters: {},
    body: {
      newPass: string;

      newPassAgain: string;
    },
  ): Promise<{
    success: boolean;

    message: string;

    data?: {
      intId?: number;

      formId?: number;

      posId?: number;

      idsArr?: Array<{
        id: number;

        type: string;
      }>;
    };
  }> {
    let path = '/divisions/{divisionId}/mail-pass';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    path = path.replace('{divisionId}', divisionId.toString());

    return this.request(
      'PUT',
      `${this.baseUrl}${path}`,
      body,
      headers,
      queryParameters,
    );
  }

  /**
   * Add new person into division
   * @method
   * @name API#addPerson
   */
  addPerson(
    divisionId: string,
    parameters: {},
    body: {
      name: string;

      email: string;
    },
  ): Promise<{
    success: boolean;

    message: string;

    data?: {
      intId?: number;

      formId?: number;

      posId?: number;

      idsArr?: Array<{
        id: number;

        type: string;
      }>;
    };
  }> {
    let path = '/divisions/{divisionId}/person';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    path = path.replace('{divisionId}', divisionId.toString());

    return this.request(
      'POST',
      `${this.baseUrl}${path}`,
      body,
      headers,
      queryParameters,
    );
  }

  /**
   * Delete HR
   * @method
   * @name API#deletePerson
   */
  deletePerson(
    hrId: string,
    parameters: {} = {},
  ): Promise<{
    success: boolean;

    message: string;

    data?: {
      intId?: number;

      formId?: number;

      posId?: number;

      idsArr?: Array<{
        id: number;

        type: string;
      }>;
    };
  }> {
    let path = '/hr/{hrId}';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    path = path.replace('{hrId}', hrId.toString());

    return this.request(
      'DELETE',
      `${this.baseUrl}${path}`,
      {},
      headers,
      queryParameters,
    );
  }

  /**
   * Confirm person registration
   * @method
   * @name API#confirmPerson
   */
  confirmPerson(
    parameters: {},
    body: {
      password: string;

      passwordConfirm: string;

      actiovationCode: string;
    },
  ): Promise<{
    success: boolean;

    message: string;

    data?: {
      intId?: number;

      formId?: number;

      posId?: number;

      idsArr?: Array<{
        id: number;

        type: string;
      }>;
    };
  }> {
    let path = '/hr/confirm';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.request(
      'POST',
      `${this.baseUrl}${path}`,
      body,
      headers,
      queryParameters,
    );
  }

  /**
   * Get hr data before registration confirm
   * @method
   * @name API#getPreconfirmPerson
   */
  getPreconfirmPerson(
    confirmationCode: string,
    parameters: {} = {},
  ): Promise<{
    email: string;
  }> {
    let path = '/hr/confirm/{confirmationCode}';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    path = path.replace('{confirmationCode}', confirmationCode.toString());

    return this.request(
      'GET',
      `${this.baseUrl}${path}`,
      {},
      headers,
      queryParameters,
    );
  }

  /**
   * Login as a HR
   * @method
   * @name API#loginHr
   */
  loginHr(
    parameters: {},
    body: {
      email: string;

      password: string;

      domain: string;
    },
  ): Promise<{
    domain: string;

    success: boolean;

    message: string;

    key: string;
  }> {
    let path = '/hr/login';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.request(
      'POST',
      `${this.baseUrl}${path}`,
      body,
      headers,
      queryParameters,
    );
  }

  /**
   * Login HR into socket system
   * @method
   * @name API#loginSocketHr
   */
  loginSocketHr(
    parameters: {},
    body: {
      socketId: string;
    },
  ): Promise<{
    success: boolean;

    message: string;

    data?: {
      intId?: number;

      formId?: number;

      posId?: number;

      idsArr?: Array<{
        id: number;

        type: string;
      }>;
    };
  }> {
    let path = '/hr/login/socket';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.request(
      'POST',
      `${this.baseUrl}${path}`,
      body,
      headers,
      queryParameters,
    );
  }

  /**
   * Check if is logged as hr
   * @method
   * @name API#authCheckHr
   */
  authCheckHr(
    parameters: {},
    body: {
      authKey: string;
    },
  ): Promise<{
    success: boolean;

    message: string;

    data?: {
      intId?: number;

      formId?: number;

      posId?: number;

      idsArr?: Array<{
        id: number;

        type: string;
      }>;
    };
  }> {
    let path = '/hr/auth';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.request(
      'POST',
      `${this.baseUrl}${path}`,
      body,
      headers,
      queryParameters,
    );
  }

  /**
   * Get info about currently logged in hr
   * @method
   * @name API#getMeInfoHr
   */
  getMeInfoHr(
    parameters: {} = {},
  ): Promise<{
    name: string;
  }> {
    let path = '/hr/me';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.request(
      'GET',
      `${this.baseUrl}${path}`,
      {},
      headers,
      queryParameters,
    );
  }

  /**
   * Request email for reseting hr password
   * @method
   * @name API#requestResetHrPassword
   */
  requestResetHrPassword(
    parameters: {},
    body: {
      email: string;
    },
  ): Promise<{
    success: boolean;

    message: string;

    data?: {
      intId?: number;

      formId?: number;

      posId?: number;

      idsArr?: Array<{
        id: number;

        type: string;
      }>;
    };
  }> {
    let path = '/hr/request-reset-password';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.request(
      'POST',
      `${this.baseUrl}${path}`,
      body,
      headers,
      queryParameters,
    );
  }

  /**
   * Reset passwords hr
   * @method
   * @name API#resetHrPassword
   */
  resetHrPassword(
    parameters: {},
    body: {
      resetPassKey: string;

      password: string;

      passwordAgain: string;
    },
  ): Promise<{
    success: boolean;

    message: string;

    data?: {
      intId?: number;

      formId?: number;

      posId?: number;

      idsArr?: Array<{
        id: number;

        type: string;
      }>;
    };
  }> {
    let path = '/hr/reset-password';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.request(
      'POST',
      `${this.baseUrl}${path}`,
      body,
      headers,
      queryParameters,
    );
  }

  /**
   * Validate hr reset password key
   * @method
   * @name API#resetHrPasswordValidate
   */
  resetHrPasswordValidate(
    parameters: {},
    body: {
      resetPassKey: string;
    },
  ): Promise<{
    success: boolean;

    message: string;

    data?: {
      intId?: number;

      formId?: number;

      posId?: number;

      idsArr?: Array<{
        id: number;

        type: string;
      }>;
    };
  }> {
    let path = '/hr/reset-password/validate';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.request(
      'POST',
      `${this.baseUrl}${path}`,
      body,
      headers,
      queryParameters,
    );
  }

  /**
   * Send email to support
   * @method
   * @name API#sendHrSupportEmail
   */
  sendHrSupportEmail(
    parameters: {},
    body: {
      name: string;

      email: string;

      subject: string;

      description: string;
    },
  ): Promise<{
    success: boolean;

    message: string;

    data?: {
      intId?: number;

      formId?: number;

      posId?: number;

      idsArr?: Array<{
        id: number;

        type: string;
      }>;
    };
  }> {
    let path = '/hr/support-email';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.request(
      'POST',
      `${this.baseUrl}${path}`,
      body,
      headers,
      queryParameters,
    );
  }

  /**
   * Get faq for HR
   * @method
   * @name API#getFaqHr
   */
  getFaqHr(
    parameters: {} = {},
  ): Promise<{
    categories: Array<{
      name: string;

      questions: Array<{
        question: string;

        answer: string;
      }>;
    }>;
  }> {
    let path = '/hr/faq';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.request(
      'GET',
      `${this.baseUrl}${path}`,
      {},
      headers,
      queryParameters,
    );
  }

  /**
   * Get list of all job positions
   * @method
   * @name API#getJobPositions
   */
  getJobPositions(
    parameters: {} = {},
  ): Promise<{
    positions: Array<{
      id: number;

      name: string;

      forms: number;
    }>;
  }> {
    let path = '/hr/job-positions';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.request(
      'GET',
      `${this.baseUrl}${path}`,
      {},
      headers,
      queryParameters,
    );
  }

  /**
   * Add new job position
   * @method
   * @name API#addJobPosition
   */
  addJobPosition(
    parameters: {},
    body: {
      name: string;
    },
  ): Promise<{
    success: boolean;

    message: string;

    data?: {
      intId?: number;

      formId?: number;

      posId?: number;

      idsArr?: Array<{
        id: number;

        type: string;
      }>;
    };
  }> {
    let path = '/hr/job-positions';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.request(
      'POST',
      `${this.baseUrl}${path}`,
      body,
      headers,
      queryParameters,
    );
  }

  /**
   * Delete job position
   * @method
   * @name API#deleteJobPosition
   */
  deleteJobPosition(
    parameters: {},
    body: {
      id: number;
    },
  ): Promise<{
    success: boolean;

    message: string;

    data?: {
      intId?: number;

      formId?: number;

      posId?: number;

      idsArr?: Array<{
        id: number;

        type: string;
      }>;
    };
  }> {
    let path = '/hr/job-positions';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.request(
      'DELETE',
      `${this.baseUrl}${path}`,
      body,
      headers,
      queryParameters,
    );
  }

  /**
   * Edit job position
   * @method
   * @name API#editJobPosition
   */
  editJobPosition(
    parameters: {},
    body: {
      id: number;

      newName: string;
    },
  ): Promise<{
    success: boolean;

    message: string;

    data?: {
      intId?: number;

      formId?: number;

      posId?: number;

      idsArr?: Array<{
        id: number;

        type: string;
      }>;
    };
  }> {
    let path = '/hr/job-positions';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.request(
      'PUT',
      `${this.baseUrl}${path}`,
      body,
      headers,
      queryParameters,
    );
  }

  /**
   * Get form templates
   * @method
   * @name API#getFormTemplates
   */
  getFormTemplates(
    positionId: number,
    parameters: {} = {},
  ): Promise<{
    templates: Array<{
      id: number;

      name: string;
    }>;
  }> {
    let path = '/hr/job-positions/{positionId}/forms/templates';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    path = path.replace('{positionId}', positionId.toString());

    return this.request(
      'GET',
      `${this.baseUrl}${path}`,
      {},
      headers,
      queryParameters,
    );
  }

  /**
   * Create form from template
   * @method
   * @name API#addFormTemplates
   */
  addFormTemplates(
    positionId: number,
    parameters: {},
    body: {
      name: string;

      templateId: number;
    },
  ): Promise<{
    success: boolean;

    message: string;

    data?: {
      intId?: number;

      formId?: number;

      posId?: number;

      idsArr?: Array<{
        id: number;

        type: string;
      }>;
    };
  }> {
    let path = '/hr/job-positions/{positionId}/forms/templates';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    path = path.replace('{positionId}', positionId.toString());

    return this.request(
      'POST',
      `${this.baseUrl}${path}`,
      body,
      headers,
      queryParameters,
    );
  }

  /**
   * Get list of all job position forms for specific job position
   * @method
   * @name API#getJobPositionForms
   */
  getJobPositionForms(
    positionId: number,
    parameters: {} = {},
  ): Promise<{
    name: string;

    forms: Array<{
      defaultLanguage: string;

      id: number;

      name: string;

      questions: number;
    }>;
  }> {
    let path = '/hr/job-positions/{positionId}/forms';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    path = path.replace('{positionId}', positionId.toString());

    return this.request(
      'GET',
      `${this.baseUrl}${path}`,
      {},
      headers,
      queryParameters,
    );
  }

  /**
   * Add new job position form
   * @method
   * @name API#addJobPositionForm
   */
  addJobPositionForm(
    positionId: number,
    parameters: {},
    body: {
      name: string;

      langCode: string;
    },
  ): Promise<{
    success: boolean;

    message: string;

    data?: {
      intId?: number;

      formId?: number;

      posId?: number;

      idsArr?: Array<{
        id: number;

        type: string;
      }>;
    };
  }> {
    let path = '/hr/job-positions/{positionId}/forms';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    path = path.replace('{positionId}', positionId.toString());

    return this.request(
      'POST',
      `${this.baseUrl}${path}`,
      body,
      headers,
      queryParameters,
    );
  }

  /**
   * Delete job position form
   * @method
   * @name API#deleteJobPositionForm
   */
  deleteJobPositionForm(
    positionId: number,
    parameters: {},
    body: {
      id: number;
    },
  ): Promise<{
    success: boolean;

    message: string;

    data?: {
      intId?: number;

      formId?: number;

      posId?: number;

      idsArr?: Array<{
        id: number;

        type: string;
      }>;
    };
  }> {
    let path = '/hr/job-positions/{positionId}/forms';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    path = path.replace('{positionId}', positionId.toString());

    return this.request(
      'DELETE',
      `${this.baseUrl}${path}`,
      body,
      headers,
      queryParameters,
    );
  }

  /**
   * Edit job position form
   * @method
   * @name API#editJobPositionForm
   */
  editJobPositionForm(
    positionId: number,
    parameters: {},
    body: {
      id: number;

      newName: string;

      newLangCode: string;
    },
  ): Promise<{
    success: boolean;

    message: string;

    data?: {
      intId?: number;

      formId?: number;

      posId?: number;

      idsArr?: Array<{
        id: number;

        type: string;
      }>;
    };
  }> {
    let path = '/hr/job-positions/{positionId}/forms';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    path = path.replace('{positionId}', positionId.toString());

    return this.request(
      'PUT',
      `${this.baseUrl}${path}`,
      body,
      headers,
      queryParameters,
    );
  }

  /**
   * Get job position form data
   * @method
   * @name API#getJobPositionForm
   */
  getJobPositionForm(
    positionId: number,
    formId: number,
    parameters: {} = {},
  ): Promise<{
    defaultLanguage: string;

    name: string;

    data: string;

    medalCategories: Array<{
      name: string;

      medals: Array<{
        name: string;

        tag: string;

        weight: number;

        medalId: number;

        qpUuid: string;
      }>;
    }>;
  }> {
    let path = '/hr/job-positions/{positionId}/forms/{formId}';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    path = path.replace('{positionId}', positionId.toString());

    path = path.replace('{formId}', formId.toString());

    return this.request(
      'GET',
      `${this.baseUrl}${path}`,
      {},
      headers,
      queryParameters,
    );
  }

  /**
   * Edit job position data
   * @method
   * @name API#editJobPositionFormData
   */
  editJobPositionFormData(
    positionId: number,
    formId: number,
    parameters: {},
    body: {
      data: string;
    },
  ): Promise<{
    success: boolean;

    message: string;

    data?: {
      intId?: number;

      formId?: number;

      posId?: number;

      idsArr?: Array<{
        id: number;

        type: string;
      }>;
    };
  }> {
    let path = '/hr/job-positions/{positionId}/forms/{formId}';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    path = path.replace('{positionId}', positionId.toString());

    path = path.replace('{formId}', formId.toString());

    return this.request(
      'PUT',
      `${this.baseUrl}${path}`,
      body,
      headers,
      queryParameters,
    );
  }

  /**
   * Get settings of HR
   * @method
   * @name API#getHrSettings
   */
  getHrSettings(
    parameters: {} = {},
  ): Promise<{
    name: string;

    email: string;

    company: string;

    plan: string;

    tokens: number;

    domain: string;

    divName: string;

    divMail: string;
  }> {
    let path = '/hr/settings';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.request(
      'GET',
      `${this.baseUrl}${path}`,
      {},
      headers,
      queryParameters,
    );
  }

  /**
   * Get password of the mail account HR is in
   * @method
   * @name API#getHrMailPass
   */
  getHrMailPass(
    parameters: {} = {},
  ): Promise<{
    success: boolean;

    message: string;

    data?: {
      intId?: number;

      formId?: number;

      posId?: number;

      idsArr?: Array<{
        id: number;

        type: string;
      }>;
    };
  }> {
    let path = '/hr/settings/mail-pass';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.request(
      'GET',
      `${this.baseUrl}${path}`,
      {},
      headers,
      queryParameters,
    );
  }

  /**
   * Change HR password
   * @method
   * @name API#updateHrPassword
   */
  updateHrPassword(
    parameters: {},
    body: {
      oldPass: string;

      newPass: string;

      newPassAgain: string;
    },
  ): Promise<{
    success: boolean;

    message: string;

    data?: {
      intId?: number;

      formId?: number;

      posId?: number;

      idsArr?: Array<{
        id: number;

        type: string;
      }>;
    };
  }> {
    let path = '/hr/settings/password';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.request(
      'PUT',
      `${this.baseUrl}${path}`,
      body,
      headers,
      queryParameters,
    );
  }

  /**
   * Get HR mp3 files
   * @method
   * @name API#getMp3
   */
  getMp3(
    parameters: {} = {},
  ): Promise<
    Array<{
      id: string;

      name: string;

      src: string;
    }>
  > {
    let path = '/hr/fm/mp3';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.request(
      'GET',
      `${this.baseUrl}${path}`,
      {},
      headers,
      queryParameters,
    );
  }

  /**
   * Upload MP3 File
   * @method
   * @name API#uploadMp3
   */
  uploadMp3(
    parameters: {},
    body: {
      name: string;

      source: string;
    },
  ): Promise<{
    success: boolean;

    message: string;

    data?: {
      intId?: number;

      formId?: number;

      posId?: number;

      idsArr?: Array<{
        id: number;

        type: string;
      }>;
    };
  }> {
    let path = '/hr/fm/mp3';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.request(
      'POST',
      `${this.baseUrl}${path}`,
      body,
      headers,
      queryParameters,
    );
  }

  /**
   * Get HR mp4 files
   * @method
   * @name API#getMp4
   */
  getMp4(
    parameters: {} = {},
  ): Promise<
    Array<{
      id: string;

      name: string;

      src: string;
    }>
  > {
    let path = '/hr/fm/mp4';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.request(
      'GET',
      `${this.baseUrl}${path}`,
      {},
      headers,
      queryParameters,
    );
  }

  /**
   * Upload MP4 File
   * @method
   * @name API#uploadMp4
   */
  uploadMp4(
    parameters: {},
    body: {
      name: string;

      source: string;
    },
  ): Promise<{
    success: boolean;

    message: string;

    data?: {
      intId?: number;

      formId?: number;

      posId?: number;

      idsArr?: Array<{
        id: number;

        type: string;
      }>;
    };
  }> {
    let path = '/hr/fm/mp4';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.request(
      'POST',
      `${this.baseUrl}${path}`,
      body,
      headers,
      queryParameters,
    );
  }

  /**
   * Get mp3 file
   * @method
   * @name API#getMp3Src
   */
  getMp3Src(mp3Id: string, parameters: {} = {}): Promise<{}> {
    let path = '/hr/fm/mp3/{mp3Id}';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers.append('Accept', 'audio/mpeg');
    headers.append('Content-Type', 'application/json');

    path = path.replace('{mp3Id}', mp3Id.toString());

    return this.request(
      'GET',
      `${this.baseUrl}${path}`,
      {},
      headers,
      queryParameters,
    );
  }

  /**
   * Delete MP3 File
   * @method
   * @name API#deleteMp3
   */
  deleteMp3(
    mp3Id: string,
    parameters: {} = {},
  ): Promise<{
    success: boolean;

    message: string;

    data?: {
      intId?: number;

      formId?: number;

      posId?: number;

      idsArr?: Array<{
        id: number;

        type: string;
      }>;
    };
  }> {
    let path = '/hr/fm/mp3/{mp3Id}';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    path = path.replace('{mp3Id}', mp3Id.toString());

    return this.request(
      'DELETE',
      `${this.baseUrl}${path}`,
      {},
      headers,
      queryParameters,
    );
  }

  /**
   * Edit MP3 (info)
   * @method
   * @name API#updateMp3
   */
  updateMp3(
    mp3Id: string,
    parameters: {},
    body: {
      newName: string;
    },
  ): Promise<{
    success: boolean;

    message: string;

    data?: {
      intId?: number;

      formId?: number;

      posId?: number;

      idsArr?: Array<{
        id: number;

        type: string;
      }>;
    };
  }> {
    let path = '/hr/fm/mp3/{mp3Id}';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    path = path.replace('{mp3Id}', mp3Id.toString());

    return this.request(
      'PUT',
      `${this.baseUrl}${path}`,
      body,
      headers,
      queryParameters,
    );
  }

  /**
   * Get mp4 file
   * @method
   * @name API#getMp4Src
   */
  getMp4Src(mp4Id: string, parameters: {} = {}): Promise<{}> {
    let path = '/hr/fm/mp4/{mp4Id}';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers.append('Accept', 'video/mp4');
    headers.append('Content-Type', 'application/json');

    path = path.replace('{mp4Id}', mp4Id.toString());

    return this.request(
      'GET',
      `${this.baseUrl}${path}`,
      {},
      headers,
      queryParameters,
    );
  }

  /**
   * Delete MP4 File
   * @method
   * @name API#deleteMp4
   */
  deleteMp4(
    mp4Id: string,
    parameters: {} = {},
  ): Promise<{
    success: boolean;

    message: string;

    data?: {
      intId?: number;

      formId?: number;

      posId?: number;

      idsArr?: Array<{
        id: number;

        type: string;
      }>;
    };
  }> {
    let path = '/hr/fm/mp4/{mp4Id}';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    path = path.replace('{mp4Id}', mp4Id.toString());

    return this.request(
      'DELETE',
      `${this.baseUrl}${path}`,
      {},
      headers,
      queryParameters,
    );
  }

  /**
   * Edit MP4 (info)
   * @method
   * @name API#updateMp4
   */
  updateMp4(
    mp4Id: string,
    parameters: {},
    body: {
      newName: string;
    },
  ): Promise<{
    success: boolean;

    message: string;

    data?: {
      intId?: number;

      formId?: number;

      posId?: number;

      idsArr?: Array<{
        id: number;

        type: string;
      }>;
    };
  }> {
    let path = '/hr/fm/mp4/{mp4Id}';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    path = path.replace('{mp4Id}', mp4Id.toString());

    return this.request(
      'PUT',
      `${this.baseUrl}${path}`,
      body,
      headers,
      queryParameters,
    );
  }

  /**
   * Get list of all people registered by HR
   * @method
   * @name API#getInterviewPeople
   */
  getInterviewPeople(
    intId: string,
    parameters: {} = {},
  ): Promise<{
    questions: Array<{}>;

    failedCandidates: Array<{}>;

    candidates: Array<{}>;

    medals: Array<{}>;

    intName: string;
  }> {
    let path = '/hr/interview/{intId}/people';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    path = path.replace('{intId}', intId.toString());

    return this.request(
      'GET',
      `${this.baseUrl}${path}`,
      {},
      headers,
      queryParameters,
    );
  }

  /**
   * Get list of all people registered by HR
   * @method
   * @name API#getInterviewPeopleForAdding
   */
  getInterviewPeopleForAdding(
    parameters: {} = {},
  ): Promise<{
    people: Array<{}>;
  }> {
    let path = '/hr/interview/peopleToAdd';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.request(
      'GET',
      `${this.baseUrl}${path}`,
      {},
      headers,
      queryParameters,
    );
  }

  /**
   * Add new person into a list
   * @method
   * @name API#addInterviewPerson
   */
  addInterviewPerson(
    parameters: {},
    body: {
      name: string;

      email: string;
    },
  ): Promise<{
    success: boolean;

    message: string;

    data?: {
      intId?: number;

      formId?: number;

      posId?: number;

      idsArr?: Array<{
        id: number;

        type: string;
      }>;
    };
  }> {
    let path = '/hr/people';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.request(
      'POST',
      `${this.baseUrl}${path}`,
      body,
      headers,
      queryParameters,
    );
  }

  /**
   * Remove person from list
   * @method
   * @name API#deleteInterviewPerson
   */
  deleteInterviewPerson(
    parameters: {},
    body: {
      id: number;
    },
  ): Promise<{
    success: boolean;

    message: string;

    data?: {
      intId?: number;

      formId?: number;

      posId?: number;

      idsArr?: Array<{
        id: number;

        type: string;
      }>;
    };
  }> {
    let path = '/hr/people';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.request(
      'DELETE',
      `${this.baseUrl}${path}`,
      body,
      headers,
      queryParameters,
    );
  }

  /**
   * Edit interview person information
   * @method
   * @name API#editInterviewPerson
   */
  editInterviewPerson(
    personId: string,
    parameters: {},
    body: {
      name: string;

      email: string;
    },
  ): Promise<{
    success: boolean;

    message: string;

    data?: {
      intId?: number;

      formId?: number;

      posId?: number;

      idsArr?: Array<{
        id: number;

        type: string;
      }>;
    };
  }> {
    let path = '/hr/people/{personId}';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    path = path.replace('{personId}', personId.toString());

    return this.request(
      'PUT',
      `${this.baseUrl}${path}`,
      body,
      headers,
      queryParameters,
    );
  }

  /**
   * Get all emails
   * @method
   * @name API#getHrEmails
   */
  getHrEmails(
    parameters: {} = {},
  ): Promise<{
    mails: Array<{
      id: number;

      name: string;

      type: string;

      content: string;

      subject: string;

      attachments: Array<string>;
    }>;
  }> {
    let path = '/hr/emails';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.request(
      'GET',
      `${this.baseUrl}${path}`,
      {},
      headers,
      queryParameters,
    );
  }

  /**
   * Add a new email
   * @method
   * @name API#addHrEmail
   */
  addHrEmail(
    parameters: {},
    body: {
      name: string;

      type?: string;
    },
  ): Promise<{
    mails: Array<{
      id: number;

      name: string;

      type: string;

      content: string;

      subject: string;

      attachments: Array<string>;
    }>;
  }> {
    let path = '/hr/emails';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.request(
      'POST',
      `${this.baseUrl}${path}`,
      body,
      headers,
      queryParameters,
    );
  }

  /**
   * Get email types
   * @method
   * @name API#getHrEmailTypes
   */
  getHrEmailTypes(
    parameters: {} = {},
  ): Promise<{
    types: Array<{
      usages: Array<string>;

      staticDate: boolean;

      name: string;

      title: string;
    }>;
  }> {
    let path = '/hr/emails/types';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.request(
      'GET',
      `${this.baseUrl}${path}`,
      {},
      headers,
      queryParameters,
    );
  }

  /**
   * Get placeholders for specific type of email
   * @method
   * @name API#getHrEmailPlaceholders
   */
  getHrEmailPlaceholders(
    emailType: string,
    parameters: {} = {},
  ): Promise<{
    placeholders: Array<{
      name: string;

      title: string;
    }>;
  }> {
    let path = '/hr/emails/placeholders/{emailType}';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    path = path.replace('{emailType}', emailType.toString());

    return this.request(
      'GET',
      `${this.baseUrl}${path}`,
      {},
      headers,
      queryParameters,
    );
  }

  /**
   * Get email preview (placeholders parsed)
   * @method
   * @name API#getHrEmailPreview
   */
  getHrEmailPreview(
    emailId: number,
    intId: number,
    parameters: {} = {},
  ): Promise<{
    content: string;

    subject: string;
  }> {
    let path = '/hr/emails/{emailId}/preview/{intId}';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    path = path.replace('{emailId}', emailId.toString());

    path = path.replace('{intId}', intId.toString());

    return this.request(
      'GET',
      `${this.baseUrl}${path}`,
      {},
      headers,
      queryParameters,
    );
  }

  /**
   * Send parsed mail to specific email
   * @method
   * @name API#sendHrEmailPreview
   */
  sendHrEmailPreview(
    emailId: number,
    intId: number,
    parameters: {},
    body: {
      reciever: string;
    },
  ): Promise<{
    success: boolean;

    message: string;

    data?: {
      intId?: number;

      formId?: number;

      posId?: number;

      idsArr?: Array<{
        id: number;

        type: string;
      }>;
    };
  }> {
    let path = '/hr/emails/{emailId}/preview/{intId}';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    path = path.replace('{emailId}', emailId.toString());

    path = path.replace('{intId}', intId.toString());

    return this.request(
      'POST',
      `${this.baseUrl}${path}`,
      body,
      headers,
      queryParameters,
    );
  }

  /**
   * Get email by id
   * @method
   * @name API#getHrEmail
   */
  getHrEmail(
    emailId: number,
    parameters: {} = {},
  ): Promise<{
    id: number;

    name: string;

    type: string;

    content: string;

    subject: string;

    attachments: Array<string>;
  }> {
    let path = '/hr/emails/{emailId}';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    path = path.replace('{emailId}', emailId.toString());

    return this.request(
      'GET',
      `${this.baseUrl}${path}`,
      {},
      headers,
      queryParameters,
    );
  }

  /**
   * Delete email by id
   * @method
   * @name API#deleteHrEmail
   */
  deleteHrEmail(
    emailId: number,
    parameters: {} = {},
  ): Promise<{
    success: boolean;

    message: string;

    data?: {
      intId?: number;

      formId?: number;

      posId?: number;

      idsArr?: Array<{
        id: number;

        type: string;
      }>;
    };
  }> {
    let path = '/hr/emails/{emailId}';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    path = path.replace('{emailId}', emailId.toString());

    return this.request(
      'DELETE',
      `${this.baseUrl}${path}`,
      {},
      headers,
      queryParameters,
    );
  }

  /**
   * Edit email by id
   * @method
   * @name API#editHrEmail
   */
  editHrEmail(
    emailId: number,
    parameters: {},
    body: {
      name: string;

      type?: string;
    },
  ): Promise<{
    success: boolean;

    message: string;

    data?: {
      intId?: number;

      formId?: number;

      posId?: number;

      idsArr?: Array<{
        id: number;

        type: string;
      }>;
    };
  }> {
    let path = '/hr/emails/{emailId}';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    path = path.replace('{emailId}', emailId.toString());

    return this.request(
      'PUT',
      `${this.baseUrl}${path}`,
      body,
      headers,
      queryParameters,
    );
  }

  /**
   * Edit email content by id
   * @method
   * @name API#editHrEmailContent
   */
  editHrEmailContent(
    emailId: number,
    parameters: {},
    body: {
      content: string;

      subject?: string;

      attachments: Array<string>;
    },
  ): Promise<{
    success: boolean;

    message: string;

    data?: {
      intId?: number;

      formId?: number;

      posId?: number;

      idsArr?: Array<{
        id: number;

        type: string;
      }>;
    };
  }> {
    let path = '/hr/emails/{emailId}/content';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    path = path.replace('{emailId}', emailId.toString());

    return this.request(
      'PUT',
      `${this.baseUrl}${path}`,
      body,
      headers,
      queryParameters,
    );
  }

  /**
   * Check if is logged as company
   * @method
   * @name API#authCheckCompany
   */
  authCheckCompany(
    parameters: {},
    body: {
      authKey: string;
    },
  ): Promise<{
    success: boolean;

    message: string;

    data?: {
      intId?: number;

      formId?: number;

      posId?: number;

      idsArr?: Array<{
        id: number;

        type: string;
      }>;
    };
  }> {
    let path = '/company/auth';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.request(
      'POST',
      `${this.baseUrl}${path}`,
      body,
      headers,
      queryParameters,
    );
  }

  /**
   * Register new company
   * @method
   * @name API#registerCompany
   */
  registerCompany(
    parameters: {},
    body: {
      name: string;

      domain: string;

      email: string;

      password: string;

      passwordConfirm: string;

      subModel: number;
    },
  ): Promise<{
    success: boolean;

    message: string;

    data?: {
      intId?: number;

      formId?: number;

      posId?: number;

      idsArr?: Array<{
        id: number;

        type: string;
      }>;
    };
  }> {
    let path = '/company/register';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.request(
      'POST',
      `${this.baseUrl}${path}`,
      body,
      headers,
      queryParameters,
    );
  }

  /**
   * Login as a company
   * @method
   * @name API#loginCompany
   */
  loginCompany(
    parameters: {},
    body: {
      email: string;

      password: string;

      domain: string;
    },
  ): Promise<{
    domain: string;

    success: boolean;

    message: string;

    key: string;
  }> {
    let path = '/company/login';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.request(
      'POST',
      `${this.baseUrl}${path}`,
      body,
      headers,
      queryParameters,
    );
  }

  /**
   * Activate company account
   * @method
   * @name API#activateCompany
   */
  activateCompany(
    code: string,
    parameters: {} = {},
  ): Promise<{
    success: boolean;

    message: string;

    data?: {
      intId?: number;

      formId?: number;

      posId?: number;

      idsArr?: Array<{
        id: number;

        type: string;
      }>;
    };
  }> {
    let path = '/company/activate/{code}';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    path = path.replace('{code}', code.toString());

    return this.request(
      'GET',
      `${this.baseUrl}${path}`,
      {},
      headers,
      queryParameters,
    );
  }

  /**
   * Request email for reseting company password
   * @method
   * @name API#requestResetCompanyPassword
   */
  requestResetCompanyPassword(
    parameters: {},
    body: {
      email: string;
    },
  ): Promise<{
    success: boolean;

    message: string;

    data?: {
      intId?: number;

      formId?: number;

      posId?: number;

      idsArr?: Array<{
        id: number;

        type: string;
      }>;
    };
  }> {
    let path = '/company/request-reset-password';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.request(
      'POST',
      `${this.baseUrl}${path}`,
      body,
      headers,
      queryParameters,
    );
  }

  /**
   * Reset passwords company
   * @method
   * @name API#resetCompanyPassword
   */
  resetCompanyPassword(
    parameters: {},
    body: {
      resetPassKey: string;

      password: string;

      passwordAgain: string;
    },
  ): Promise<{
    success: boolean;

    message: string;

    data?: {
      intId?: number;

      formId?: number;

      posId?: number;

      idsArr?: Array<{
        id: number;

        type: string;
      }>;
    };
  }> {
    let path = '/company/reset-password';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.request(
      'POST',
      `${this.baseUrl}${path}`,
      body,
      headers,
      queryParameters,
    );
  }

  /**
   * Validate company reset password key
   * @method
   * @name API#resetCompanyPasswordValidate
   */
  resetCompanyPasswordValidate(
    parameters: {},
    body: {
      resetPassKey: string;
    },
  ): Promise<{
    success: boolean;

    message: string;

    data?: {
      intId?: number;

      formId?: number;

      posId?: number;

      idsArr?: Array<{
        id: number;

        type: string;
      }>;
    };
  }> {
    let path = '/company/reset-password/validate';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.request(
      'POST',
      `${this.baseUrl}${path}`,
      body,
      headers,
      queryParameters,
    );
  }

  /**
   * Get info about currently logged in company
   * @method
   * @name API#getMeInfoCompany
   */
  getMeInfoCompany(
    parameters: {} = {},
  ): Promise<{
    name: string;
  }> {
    let path = '/company/me';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.request(
      'GET',
      `${this.baseUrl}${path}`,
      {},
      headers,
      queryParameters,
    );
  }

  /**
   * Send email to support
   * @method
   * @name API#sendCompanySupportEmail
   */
  sendCompanySupportEmail(
    parameters: {},
    body: {
      name: string;

      email: string;

      subject: string;

      description: string;
    },
  ): Promise<{
    success: boolean;

    message: string;

    data?: {
      intId?: number;

      formId?: number;

      posId?: number;

      idsArr?: Array<{
        id: number;

        type: string;
      }>;
    };
  }> {
    let path = '/company/support-email';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.request(
      'POST',
      `${this.baseUrl}${path}`,
      body,
      headers,
      queryParameters,
    );
  }

  /**
   * Get faq for company
   * @method
   * @name API#getFaqCompany
   */
  getFaqCompany(
    parameters: {} = {},
  ): Promise<{
    categories: Array<{
      name: string;

      questions: Array<{
        question: string;

        answer: string;
      }>;
    }>;
  }> {
    let path = '/company/faq';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.request(
      'GET',
      `${this.baseUrl}${path}`,
      {},
      headers,
      queryParameters,
    );
  }

  /**
   * Get all information about tokens for company
   * @method
   * @name API#getTokensInfoCompany
   */
  getTokensInfoCompany(
    parameters: {} = {},
  ): Promise<{
    amount: number;
  }> {
    let path = '/company/tokens';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.request(
      'GET',
      `${this.baseUrl}${path}`,
      {},
      headers,
      queryParameters,
    );
  }

  /**
   * Purchase tokens (company)
   * @method
   * @name API#purchaseTokens
   */
  purchaseTokens(
    parameters: {},
    body: {
      packageId: string;
    },
  ): Promise<{
    success: boolean;

    message: string;

    data?: {
      intId?: number;

      formId?: number;

      posId?: number;

      idsArr?: Array<{
        id: number;

        type: string;
      }>;
    };
  }> {
    let path = '/company/tokens/purchase';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.request(
      'POST',
      `${this.baseUrl}${path}`,
      body,
      headers,
      queryParameters,
    );
  }

  /**
   * Activate specific plan
   * @method
   * @name API#activatePlan
   */
  activatePlan(
    parameters: {},
    body: {
      planId: number;
    },
  ): Promise<{
    success: boolean;

    message: string;

    data?: {
      intId?: number;

      formId?: number;

      posId?: number;

      idsArr?: Array<{
        id: number;

        type: string;
      }>;
    };
  }> {
    let path = '/company/plan';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.request(
      'POST',
      `${this.baseUrl}${path}`,
      body,
      headers,
      queryParameters,
    );
  }

  /**
   * Get all info for company required on index page
   * @method
   * @name API#getCompanyIndexData
   */
  getCompanyIndexData(
    parameters: {} = {},
  ): Promise<{
    tokens: number;

    plan: {
      id: number;

      name: string;

      color: string;

      colorHex: string;
    };

    divs: number;

    hrs: number;

    inactiveHrs: number;
  }> {
    let path = '/company/index';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.request(
      'GET',
      `${this.baseUrl}${path}`,
      {},
      headers,
      queryParameters,
    );
  }

  /**
   * Get settings of Company
   * @method
   * @name API#getCompanySettings
   */
  getCompanySettings(
    parameters: {} = {},
  ): Promise<{
    name: string;

    email: string;

    plan: string;

    tokens: number;

    domain: string;
  }> {
    let path = '/company/settings';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.request(
      'GET',
      `${this.baseUrl}${path}`,
      {},
      headers,
      queryParameters,
    );
  }

  /**
   * Change Company password
   * @method
   * @name API#updateCompanyPassword
   */
  updateCompanyPassword(
    parameters: {},
    body: {
      oldPass: string;

      newPass: string;

      newPassAgain: string;
    },
  ): Promise<{
    success: boolean;

    message: string;

    data?: {
      intId?: number;

      formId?: number;

      posId?: number;

      idsArr?: Array<{
        id: number;

        type: string;
      }>;
    };
  }> {
    let path = '/company/settings/password';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.request(
      'PUT',
      `${this.baseUrl}${path}`,
      body,
      headers,
      queryParameters,
    );
  }

  /**
   * Get data about available plans
   * @method
   * @name API#getPlansData
   */
  getPlansData(
    parameters: {} = {},
  ): Promise<{
    isCompany: boolean;

    plans: Array<{
      id: number;

      name: string;

      color: string;

      colorHex: string;

      price: string;

      points: Array<string>;

      pointsNo: Array<string>;

      pointsAnalysis: Array<string>;

      pointsAnalysisNo: Array<string>;

      pointsLimits: Array<string>;

      active: boolean;

      upgrade: boolean;

      recommended: boolean;
    }>;
  }> {
    let path = '/shared/plan';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.request(
      'GET',
      `${this.baseUrl}${path}`,
      {},
      headers,
      queryParameters,
    );
  }

  /**
   * Get events in hrs calendar
   * @method
   * @name API#hrGetCalendar
   */
  hrGetCalendar(
    parameters: {} = {},
  ): Promise<{
    events: Array<{
      title: string;

      start: string;

      end: string;

      color: string;
    }>;
  }> {
    let path = '/hr/calendar';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.request(
      'GET',
      `${this.baseUrl}${path}`,
      {},
      headers,
      queryParameters,
    );
  }

  /**
   * Check if HR can edit person
   * @method
   * @name API#hrCanEditPerson
   */
  hrCanEditPerson(
    personId: number,
    parameters: {} = {},
  ): Promise<{
    canEdit: boolean;

    canDelete: boolean;
  }> {
    let path = '/hr/people/{personId}/canedit';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    path = path.replace('{personId}', personId.toString());

    return this.request(
      'GET',
      `${this.baseUrl}${path}`,
      {},
      headers,
      queryParameters,
    );
  }

  /**
   * Check if HR can edit email
   * @method
   * @name API#hrCanEditEmail
   */
  hrCanEditEmail(
    emailId: number,
    parameters: {} = {},
  ): Promise<{
    canEdit: boolean;

    canDelete: boolean;
  }> {
    let path = '/hr/emails/{emailId}/canedit';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    path = path.replace('{emailId}', emailId.toString());

    return this.request(
      'GET',
      `${this.baseUrl}${path}`,
      {},
      headers,
      queryParameters,
    );
  }

  /**
   * Check if HR can edit job position
   * @method
   * @name API#hrCanEditJobPosition
   */
  hrCanEditJobPosition(
    positionId: number,
    parameters: {} = {},
  ): Promise<{
    canEdit: boolean;

    canDelete: boolean;
  }> {
    let path = '/hr/job-positions/{positionId}/canedit';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    path = path.replace('{positionId}', positionId.toString());

    return this.request(
      'GET',
      `${this.baseUrl}${path}`,
      {},
      headers,
      queryParameters,
    );
  }

  /**
   * Check if HR can edit job formular
   * @method
   * @name API#hrCanEditJobFormular
   */
  hrCanEditJobFormular(
    positionId: number,
    formId: number,
    parameters: {} = {},
  ): Promise<{
    canEdit: boolean;

    canDelete: boolean;
  }> {
    let path = '/hr/job-positions/{positionId}/forms/{formId}/canedit';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    path = path.replace('{positionId}', positionId.toString());

    path = path.replace('{formId}', formId.toString());

    return this.request(
      'GET',
      `${this.baseUrl}${path}`,
      {},
      headers,
      queryParameters,
    );
  }

  /**
   * Check if HR can edit MP3 file
   * @method
   * @name API#hrCanEditMp3
   */
  hrCanEditMp3(
    mp3Id: string,
    parameters: {} = {},
  ): Promise<{
    canEdit: boolean;

    canDelete: boolean;
  }> {
    let path = '/hr/fm/mp3/{mp3Id}/canedit';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    path = path.replace('{mp3Id}', mp3Id.toString());

    return this.request(
      'GET',
      `${this.baseUrl}${path}`,
      {},
      headers,
      queryParameters,
    );
  }

  /**
   * Check if HR can edit MP4 file
   * @method
   * @name API#hrCanEditMp4
   */
  hrCanEditMp4(
    mp4Id: string,
    parameters: {} = {},
  ): Promise<{
    canEdit: boolean;

    canDelete: boolean;
  }> {
    let path = '/hr/fm/mp4/{mp4Id}/canedit';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    path = path.replace('{mp4Id}', mp4Id.toString());

    return this.request(
      'GET',
      `${this.baseUrl}${path}`,
      {},
      headers,
      queryParameters,
    );
  }

  /**
   * Update prelog of an interview
   * @method
   * @name API#editHrInterviewPrelog
   */
  editHrInterviewPrelog(
    intId: number,
    parameters: {},
    body: {
      prelog: string;
    },
  ): Promise<{
    success: boolean;

    message: string;

    data?: {
      intId?: number;

      formId?: number;

      posId?: number;

      idsArr?: Array<{
        id: number;

        type: string;
      }>;
    };
  }> {
    let path = '/hr/interviews/{intId}/prelog';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    path = path.replace('{intId}', intId.toString());

    return this.request(
      'POST',
      `${this.baseUrl}${path}`,
      body,
      headers,
      queryParameters,
    );
  }

  /**
   * Get Email templates
   * @method
   * @name API#getHrEmailCatalog
   */
  getHrEmailCatalog(
    parameters: {} = {},
  ): Promise<{
    catalogs: Array<{
      id: number;

      name: string;

      catId: string;

      planId: string;

      likes: number;

      downloads: number;

      createdAt: string;

      desc: string;

      groups: Array<{
        id: string;

        title: string;

        html: string;

        subject: string;

        attachments: Array<string>;
      }>;
    }>;
  }> {
    let path = '/hr/catalog/emails';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.request(
      'GET',
      `${this.baseUrl}${path}`,
      {},
      headers,
      queryParameters,
    );
  }

  /**
   * Import all Emails from template
   * @method
   * @name API#importHrEmailCatalog
   */
  importHrEmailCatalog(
    parameters: {},
    body: {
      catalogId: number;
    },
  ): Promise<{
    success: boolean;

    message: string;

    data?: {
      intId?: number;

      formId?: number;

      posId?: number;

      idsArr?: Array<{
        id: number;

        type: string;
      }>;
    };
  }> {
    let path = '/hr/catalog/emails';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.request(
      'POST',
      `${this.baseUrl}${path}`,
      body,
      headers,
      queryParameters,
    );
  }

  /**
   * Line an email template from catalog
   * @method
   * @name API#likeHrEmailCatalog
   */
  likeHrEmailCatalog(
    emailId: number,
    parameters: {} = {},
  ): Promise<{
    success: boolean;

    message: string;

    data?: {
      intId?: number;

      formId?: number;

      posId?: number;

      idsArr?: Array<{
        id: number;

        type: string;
      }>;
    };
  }> {
    let path = '/hr/catalog/emails/{emailId}/like';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    path = path.replace('{emailId}', emailId.toString());

    return this.request(
      'POST',
      `${this.baseUrl}${path}`,
      {},
      headers,
      queryParameters,
    );
  }

  /**
   * Get Form templates
   * @method
   * @name API#getHrFormCatalog
   */
  getHrFormCatalog(
    parameters: {} = {},
  ): Promise<{
    catalogs: Array<{
      id: number;

      name: string;

      catId: string;

      planId: string;

      likes: number;

      downloads: number;

      createdAt: string;

      desc: string;

      groups: Array<{
        lang_code: string;

        name: string;

        pairs: Array<{}>;
      }>;
    }>;
  }> {
    let path = '/hr/catalog/forms';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.request(
      'GET',
      `${this.baseUrl}${path}`,
      {},
      headers,
      queryParameters,
    );
  }

  /**
   * Import specific form from template
   * @method
   * @name API#importHrFormCatalog
   */
  importHrFormCatalog(
    parameters: {},
    body: {
      catalogId: number;
    },
  ): Promise<{
    success: boolean;

    message: string;

    data?: {
      intId?: number;

      formId?: number;

      posId?: number;

      idsArr?: Array<{
        id: number;

        type: string;
      }>;
    };
  }> {
    let path = '/hr/catalog/forms';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.request(
      'POST',
      `${this.baseUrl}${path}`,
      body,
      headers,
      queryParameters,
    );
  }

  /**
   * Line a form template from catalog
   * @method
   * @name API#likeHrFormCatalog
   */
  likeHrFormCatalog(
    formId: number,
    parameters: {} = {},
  ): Promise<{
    success: boolean;

    message: string;

    data?: {
      intId?: number;

      formId?: number;

      posId?: number;

      idsArr?: Array<{
        id: number;

        type: string;
      }>;
    };
  }> {
    let path = '/hr/catalog/forms/{formId}/like';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    path = path.replace('{formId}', formId.toString());

    return this.request(
      'POST',
      `${this.baseUrl}${path}`,
      {},
      headers,
      queryParameters,
    );
  }

  /**
   * Get statistics about tokens for company
   * @method
   * @name API#getCompanyTokensStats
   */
  getCompanyTokensStats(
    parameters: {} = {},
  ): Promise<{
    stats: Array<{
      text: string;

      amount: number;

      isRed: boolean;
    }>;
  }> {
    let path = '/company/tokens/stats';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.request(
      'GET',
      `${this.baseUrl}${path}`,
      {},
      headers,
      queryParameters,
    );
  }

  /**
   * Get list of all past interviews
   * @method
   * @name API#getCompanyInterviewHistory
   */
  getCompanyInterviewHistory(
    parameters: {} = {},
  ): Promise<{
    ints: Array<{
      id: number;

      divName: string;

      hrName: string;

      status: string;
    }>;
  }> {
    let path = '/company/interview-history';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.request(
      'GET',
      `${this.baseUrl}${path}`,
      {},
      headers,
      queryParameters,
    );
  }

  /**
   * Get detail info about one interview from history
   * @method
   * @name API#getCompanyInterviewHistoryDetail
   */
  getCompanyInterviewHistoryDetail(
    historyIntId: number,
    parameters: {} = {},
  ): Promise<{
    id: number;

    divName: string;

    divId: number;

    hrName: string;

    hrId: number;

    status: string;

    createdAt: string;

    endedAt: string;

    startedAt: string;

    candidatesAmount: number;

    planUsed: string;

    tokensSpent: number;
  }> {
    let path = '/company/interview-history/{historyIntId}';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    path = path.replace('{historyIntId}', historyIntId.toString());

    return this.request(
      'GET',
      `${this.baseUrl}${path}`,
      {},
      headers,
      queryParameters,
    );
  }

  /**
   * Update medals configuration related to interview
   * @method
   * @name API#updateInterviewMedals
   */
  updateInterviewMedals(
    formId: number,
    parameters: {} = {},
  ): Promise<{
    success: boolean;

    message: string;

    data?: {
      intId?: number;

      formId?: number;

      posId?: number;

      idsArr?: Array<{
        id: number;

        type: string;
      }>;
    };
  }> {
    let path = '/interview/update-medals/{formId}';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    path = path.replace('{formId}', formId.toString());

    return this.request(
      'POST',
      `${this.baseUrl}${path}`,
      {},
      headers,
      queryParameters,
    );
  }

  /**
   * Update template medals.
   * @method
   * @name API#updateHrJobPositiomFormMedals
   */
  updateHrJobPositiomFormMedals(
    positionId: number,
    formId: number,
    parameters: {},
    body: {
      medals: Array<{
        medalId: number;

        qpUuid?: string;

        weight: number;
      }>;
    },
  ): Promise<{
    success: boolean;

    message: string;

    data?: {
      intId?: number;

      formId?: number;

      posId?: number;

      idsArr?: Array<{
        id: number;

        type: string;
      }>;
    };
  }> {
    let path = '/hr/job-positions/{positionId}/forms/{formId}/medals';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    path = path.replace('{positionId}', positionId.toString());

    path = path.replace('{formId}', formId.toString());

    return this.request(
      'POST',
      `${this.baseUrl}${path}`,
      body,
      headers,
      queryParameters,
    );
  }

  /**
   * Prepare HR Interview test (AI)
   * @method
   * @name API#testHrInterview
   */
  testHrInterview(
    intId: number,
    parameters: {} = {},
  ): Promise<{
    success: boolean;

    message: string;

    data?: {
      intId?: number;

      formId?: number;

      posId?: number;

      idsArr?: Array<{
        id: number;

        type: string;
      }>;
    };
  }> {
    let path = '/hr/interviews/{intId}/test-interview';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    path = path.replace('{intId}', intId.toString());

    return this.request(
      'POST',
      `${this.baseUrl}${path}`,
      {},
      headers,
      queryParameters,
    );
  }

  /**
   * Get list of all languages to use for Google Cloud
   * @method
   * @name API#getSupportedLanguages
   */
  getSupportedLanguages(
    parameters: {} = {},
  ): Promise<{
    languages: Array<{
      code: string;

      name: string;
    }>;
  }> {
    let path = '/public/languages';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.request(
      'GET',
      `${this.baseUrl}${path}`,
      {},
      headers,
      queryParameters,
    );
  }

  /**
   * Set color of an interview.
   * @method
   * @name API#setHrInterviewColor
   */
  setHrInterviewColor(
    intId: number,
    parameters: {},
    body: {
      color: string;
    },
  ): Promise<{
    success: boolean;

    message: string;

    data?: {
      intId?: number;

      formId?: number;

      posId?: number;

      idsArr?: Array<{
        id: number;

        type: string;
      }>;
    };
  }> {
    let path = '/hr/interviews/{intId}/color';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    path = path.replace('{intId}', intId.toString());

    return this.request(
      'POST',
      `${this.baseUrl}${path}`,
      body,
      headers,
      queryParameters,
    );
  }

  /**
   * Set image of an interview.
   * @method
   * @name API#setHrInterviewImage
   */
  setHrInterviewImage(
    intId: number,
    parameters: {},
    body: {
      data: string;

      type: string;
    },
  ): Promise<{
    success: boolean;

    message: string;

    data?: {
      intId?: number;

      formId?: number;

      posId?: number;

      idsArr?: Array<{
        id: number;

        type: string;
      }>;
    };
  }> {
    let path = '/hr/interviews/{intId}/image';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    path = path.replace('{intId}', intId.toString());

    return this.request(
      'POST',
      `${this.baseUrl}${path}`,
      body,
      headers,
      queryParameters,
    );
  }

  /**
   * Get list of all default images
   * @method
   * @name API#getHrInterviewImages
   */
  getHrInterviewImages(
    parameters: {} = {},
  ): Promise<{
    images: Array<{
      url: string;

      urlSmall: string;

      type: string;

      name: string;
    }>;
  }> {
    let path = '/hr/interviews/images';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.request(
      'GET',
      `${this.baseUrl}${path}`,
      {},
      headers,
      queryParameters,
    );
  }

  /**
   * Change background color (light, dark)
   * @method
   * @name API#setHrInterviewBackgroundColor
   */
  setHrInterviewBackgroundColor(
    intId: number,
    parameters: {},
    body: {
      isDark: boolean;
    },
  ): Promise<{
    success: boolean;

    message: string;

    data?: {
      intId?: number;

      formId?: number;

      posId?: number;

      idsArr?: Array<{
        id: number;

        type: string;
      }>;
    };
  }> {
    let path = '/hr/interviews/{intId}/bgcolor';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    path = path.replace('{intId}', intId.toString());

    return this.request(
      'POST',
      `${this.baseUrl}${path}`,
      body,
      headers,
      queryParameters,
    );
  }

  /**
   * Generate ZIP file which will be locked using password. Will contain response from interview
   * @method
   * @name API#generateInterviewZip
   */
  generateInterviewZip(
    parameters: {},
    body: {
      data: string;
    },
  ): Promise<{
    success: boolean;

    message: string;

    data?: {
      intId?: number;

      formId?: number;

      posId?: number;

      idsArr?: Array<{
        id: number;

        type: string;
      }>;
    };
  }> {
    let path = '/public/generate-interview-zip';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.request(
      'POST',
      `${this.baseUrl}${path}`,
      body,
      headers,
      queryParameters,
    );
  }

  /**
   * Create fast interview (import mail, import form, configure interview)
   * @method
   * @name API#createFastInterview
   */
  createFastInterview(
    parameters: {},
    body: {
      emailId: number;

      formId: number;

      imageType: string;

      imageData: string;

      name: string;

      color: string;

      isDark: boolean;

      prelog: string;

      startDate: string;

      endDate: string;

      remindDate: string;
    },
  ): Promise<{
    success: boolean;

    message: string;

    data?: {
      intId?: number;

      formId?: number;

      posId?: number;

      idsArr?: Array<{
        id: number;

        type: string;
      }>;
    };
  }> {
    let path = '/hr/fast-interview';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.request(
      'POST',
      `${this.baseUrl}${path}`,
      body,
      headers,
      queryParameters,
    );
  }

  /**
   * Get list of all video tutorials for HR panel
   * @method
   * @name API#getSharedVideoTutorials
   */
  getSharedVideoTutorials(
    parameters: {} = {},
  ): Promise<{
    paths: Array<{
      pth: string;

      video: string;

      title: string;

      text: string;
    }>;
  }> {
    let path = '/shared/video-tutorials';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.request(
      'GET',
      `${this.baseUrl}${path}`,
      {},
      headers,
      queryParameters,
    );
  }

  /**
   * Update nodes to specific candiate
   * @method
   * @name API#updateInterviewNotes
   */
  updateInterviewNotes(
    intId: number,
    canId: number,
    parameters: {},
    body: {
      note: string;
    },
  ): Promise<{
    success: boolean;

    message: string;

    data?: {
      intId?: number;

      formId?: number;

      posId?: number;

      idsArr?: Array<{
        id: number;

        type: string;
      }>;
    };
  }> {
    let path = '/hr/interview/{intId}/{canId}';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    path = path.replace('{intId}', intId.toString());

    path = path.replace('{canId}', canId.toString());

    return this.request(
      'POST',
      `${this.baseUrl}${path}`,
      body,
      headers,
      queryParameters,
    );
  }

  /**
   * Export ZIP file that contains all candidate results
   * @method
   * @name API#exportHrInterviewPdf
   */
  exportHrInterviewPdf(intId: number, parameters: {} = {}): Promise<{}> {
    let path = '/hr/interviews/{intId}/export-pdf';
    let headers: Headers = new Headers();
    let queryParameters: QueryParameters = {};

    headers = this.appendAuthHeaders(headers);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    path = path.replace('{intId}', intId.toString());

    return this.request(
      'GET',
      `${this.baseUrl}${path}`,
      {},
      headers,
      queryParameters,
    );
  }
}

export default new API();

