import { SetHrInterviewBackgroundColorParamBody } from '../models/swaggerTypes';
import { SetHrInterviewBackgroundColorParamIntId } from '../models/swaggerTypes';
import { TestHrInterviewParamIntId } from '../models/swaggerTypes';
import { UpdateHrJobPositiomFormMedalsParamBody } from '../models/swaggerTypes';
import { UpdateHrJobPositiomFormMedalsParamFormId } from '../models/swaggerTypes';
import { UpdateHrJobPositiomFormMedalsParamPositionId } from '../models/swaggerTypes';
import { EditHrInterviewPrelogParamBody } from '../models/swaggerTypes';
import { EditHrInterviewPrelogParamIntId } from '../models/swaggerTypes';
import { HrCanEditMp4ParamMp4Id } from '../models/swaggerTypes';
import { HrCanEditMp3ParamMp3Id } from '../models/swaggerTypes';
import { HrCanEditJobFormularParamFormId } from '../models/swaggerTypes';
import { HrCanEditJobFormularParamPositionId } from '../models/swaggerTypes';
import { HrCanEditJobPositionParamPositionId } from '../models/swaggerTypes';
import { HrCanEditEmailParamEmailId } from '../models/swaggerTypes';
import { HrCanEditPersonParamPersonId } from '../models/swaggerTypes';
import { handleRequest, fromSwagger } from '../helpers/utils';
import { HrService } from '../services/HrService';
import { Error401 } from '../helpers/errors';

export const getInterviewPeople = async (...httpData) => {
  const intId = fromSwagger(httpData, 'intId');
  await handleRequest(httpData, HrService.getInterviewPeople, intId);
};

export const getInterviewPeopleForAdding = async (...httpData) => {
  await handleRequest(httpData, HrService.getInterviewPeopleForAdding);
};

export const getFormTemplates = async (...httpData) => {
  const positionId = fromSwagger(httpData, 'positionId');
  await handleRequest(httpData, HrService.getFormTemplates, positionId);
};

export const addFormTemplates = async (...httpData) => {
  const positionId = fromSwagger(httpData, 'positionId');
  const body = fromSwagger(httpData, 'body');
  await handleRequest(httpData, HrService.addFormTemplates, positionId, body);
};

export const deleteInterviewPerson = async (...httpData) => {
  const personData = fromSwagger(httpData, 'personData');
  await handleRequest(httpData, HrService.deleteInterviewPerson, personData);
};

export const addInterviewPerson = async (...httpData) => {
  const personData = fromSwagger(httpData, 'personData');
  await handleRequest(httpData, HrService.addInterviewPerson, personData);
};

export const getJobPositionForms = async (...httpData) => {
  const [req] = httpData;

  const positionId = fromSwagger(httpData, 'positionId');

  await handleRequest(httpData, HrService.getJobPositionForms, positionId);
};

export const editJobPositionFormData = async (...httpData) => {
  const [req] = httpData;

  const positionId = fromSwagger(httpData, 'positionId');
  const formId = fromSwagger(httpData, 'formId');
  const formData = fromSwagger(httpData, 'formData');

  await handleRequest(
    httpData,
    HrService.editJobPositionFormData,
    positionId,
    formId,
    formData
  );
};

export const getJobPositionForm = async (...httpData) => {
  const [req] = httpData;

  const positionId = fromSwagger(httpData, 'positionId');
  const formId = fromSwagger(httpData, 'formId');

  await handleRequest(
    httpData,
    HrService.getJobPositionForm,
    positionId,
    formId
  );
};

export const loginSocketHr = async (...httpData) => {
  const logData = fromSwagger(httpData, 'loginData');
  const { socketId } = logData;

  await handleRequest(httpData, HrService.loginSocketHr, socketId);
};

export const getHrSettings = async (...httpData) => {
  await handleRequest(httpData, HrService.getHrSettings);
};

export const getHrMailPass = async (...httpData) => {
  await handleRequest(httpData, HrService.getHrMailPass);
};

export const getJobPositions = async (...httpData) => {
  await handleRequest(httpData, HrService.getJobPositions);
};

export const getFaqHr = async (...httpData) => {
  await handleRequest(httpData, HrService.getFaqHr);
};

export const editJobPosition = async (...httpData) => {
  const [req] = httpData;

  const positionData = fromSwagger(httpData, 'positionData');
  await handleRequest(httpData, HrService.editJobPosition, positionData);
};

export const updateHrPassword = async (...httpData) => {
  const [req] = httpData;

  const passData = fromSwagger(httpData, 'passData');
  await handleRequest(httpData, HrService.updateHrPassword, passData);
};

export const deleteJobPositionForm = async (...httpData) => {
  const [req] = httpData;

  const formData = fromSwagger(httpData, 'formData');
  const jobPositionId = fromSwagger(httpData, 'positionId');
  await handleRequest(httpData, HrService.deleteJobPositionForm, {
    ...formData,
    jobPositionId,
  });
};

export const addJobPositionForm = async (...httpData) => {
  const [req] = httpData;

  const formData = fromSwagger(httpData, 'formData');
  const jobPositionId = fromSwagger(httpData, 'positionId');
  await handleRequest(httpData, HrService.addJobPositionForm, {
    ...formData,
    jobPositionId,
  });
};

export const editJobPositionForm = async (...httpData) => {
  const [req] = httpData;

  const formData = fromSwagger(httpData, 'formData');
  const jobPositionId = fromSwagger(httpData, 'positionId');
  await handleRequest(httpData, HrService.editJobPositionForm, {
    ...formData,
    jobPositionId,
  });
};

export const addJobPosition = async (...httpData) => {
  const [req] = httpData;

  const positionData = fromSwagger(httpData, 'positionData');
  await handleRequest(httpData, HrService.addJobPosition, positionData);
};

export const deleteJobPosition = async (...httpData) => {
  const [req] = httpData;

  const positionData = fromSwagger(httpData, 'positionData');
  await handleRequest(httpData, HrService.deleteJobPosition, positionData);
};

export const sendHrSupportEmail = async (...httpData) => {
  const [req] = httpData;

  const emailData = fromSwagger(httpData, 'emailData');
  await handleRequest(httpData, HrService.sendHrSupportEmail, emailData);
};

export const getMeInfoHr = async (...httpData) => {
  await handleRequest(httpData, HrService.getMeInfoHr);
};

export const loginHr = async (...httpData) => {
  const [req] = httpData;

  const logData = fromSwagger(httpData, 'loginData');
  await handleRequest(httpData, HrService.loginHr, logData);
};

export const getPreconfirmPerson = async (...httpData) => {
  const confirmationCode = fromSwagger(httpData, 'confirmationCode');

  await handleRequest(
    httpData,
    HrService.getPreconfirmPerson,
    confirmationCode
  );
};

export const confirmPerson = async (...httpData) => {
  const personData = fromSwagger(httpData, 'personData');

  await handleRequest(httpData, HrService.confirmPerson, personData);
};

export const authCheckHr = async (...httpData) => {
  const [req] = httpData;

  const authData = fromSwagger(httpData, 'authData');
  await handleRequest(httpData, HrService.authCheckHr, authData);
};

export const requestResetHrPassword = async (...httpData) => {
  const resetData = fromSwagger(httpData, 'resetData');
  await handleRequest(httpData, HrService.requestResetHrPassword, resetData);
};

export const resetHrPassword = async (...httpData) => {
  const resetData = fromSwagger(httpData, 'resetData');
  await handleRequest(httpData, HrService.resetHrPassword, resetData);
};

export const resetHrPasswordValidate = async (...httpData) => {
  const resetData = fromSwagger(httpData, 'resetData');
  await handleRequest(httpData, HrService.resetHrPasswordValidate, resetData);
};

export const editInterviewPerson = async (...httpData) => {
  const personId = fromSwagger(httpData, 'personId');
  const personData = fromSwagger(httpData, 'personData');

  const { name, email } = personData;

  await handleRequest(
    httpData,
    HrService.editInterviewPerson,
    personId,
    name,
    email
  );
};

export const getHrEmails = async (...httpData) => {
  await handleRequest(httpData, HrService.getHrEmails);
};

export const getHrEmail = async (...httpData) => {
  const emailId = fromSwagger(httpData, 'emailId');

  await handleRequest(httpData, HrService.getHrEmail, emailId);
};

export const sendHrEmailPreview = async (...httpData) => {
  const emailId = fromSwagger(httpData, 'emailId');
  const intId = fromSwagger(httpData, 'intId');
  const { reciever } = fromSwagger(httpData, 'body');

  await handleRequest(
    httpData,
    HrService.sendHrEmailPreview,
    emailId,
    reciever,
    intId
  );
};

export const getHrEmailPreview = async (...httpData) => {
  const emailId = fromSwagger(httpData, 'emailId');
  const intId = fromSwagger(httpData, 'intId');

  await handleRequest(httpData, HrService.getHrEmailPreview, emailId, intId);
};

export const addHrEmail = async (...httpData) => {
  const { name, type } = fromSwagger(httpData, 'emailData');
  await handleRequest(httpData, HrService.addHrEmail, name, type);
};

export const deleteHrEmail = async (...httpData) => {
  const emailId = fromSwagger(httpData, 'emailId');
  await handleRequest(httpData, HrService.deleteHrEmail, emailId);
};

export const editHrEmail = async (...httpData) => {
  const emailId = fromSwagger(httpData, 'emailId');
  const { name, type } = fromSwagger(httpData, 'emailData');
  await handleRequest(httpData, HrService.editHrEmail, emailId, name, type);
};

export const editHrEmailContent = async (...httpData) => {
  const emailId = fromSwagger(httpData, 'emailId');
  const { content, subject, attachments } = fromSwagger(httpData, 'emailData');
  await handleRequest(
    httpData,
    HrService.editHrEmailContent,
    emailId,
    content,
    subject,
    attachments
  );
};

export const editHrInterview = async (...httpData) => {
  const { id, name } = fromSwagger(httpData, 'interviewData');
  await handleRequest(httpData, HrService.editHrInterview, id, name);
};

export const deleteHrInterview = async (...httpData) => {
  const { id } = fromSwagger(httpData, 'interviewData');
  await handleRequest(httpData, HrService.deleteHrInterview, id);
};

export const addHrInterview = async (...httpData) => {
  const { name, isNonstop } = fromSwagger(httpData, 'interviewData');
  await handleRequest(httpData, HrService.addHrInterview, name, isNonstop);
};

export const getHrInterviews = async (...httpData) => {
  await handleRequest(httpData, HrService.getHrInterviews);
};

export const getHrInterview = async (...httpData) => {
  const intId = fromSwagger(httpData, 'intId');
  await handleRequest(httpData, HrService.getHrInterview, intId);
};

export const getHrInterviewCandidates = async (...httpData) => {
  const intId = fromSwagger(httpData, 'intId');
  await handleRequest(httpData, HrService.getHrInterviewCandidates, intId);
};

export const getHrEmailTypes = async (...httpData) => {
  await handleRequest(httpData, HrService.getHrEmailTypes);
};

export const editHrInterviewEmail = async (...httpData) => {
  const { emailId, type } = fromSwagger(httpData, 'emailData');
  const intId = fromSwagger(httpData, 'intId');

  await handleRequest(
    httpData,
    HrService.editHrInterviewEmail,
    intId,
    emailId,
    type
  );
};

export const editHrInterviewDate = async (...httpData) => {
  const { date, type } = fromSwagger(httpData, 'dateData');
  const intId = fromSwagger(httpData, 'intId');

  await handleRequest(
    httpData,
    HrService.editHrInterviewDate,
    intId,
    date,
    type
  );
};

export const editHrInterviewPosition = async (...httpData) => {
  const intId = fromSwagger(httpData, 'intId');
  const { posId, formId } = fromSwagger(httpData, 'posData');
  await handleRequest(
    httpData,
    HrService.editHrInterviewPosition,
    intId,
    posId === -1 ? null : posId,
    formId === -1 ? null : formId
  );
};

export const removeHrInterviewCandidate = async (...httpData) => {
  const intId = fromSwagger(httpData, 'intId');
  const canId = fromSwagger(httpData, 'canId');
  await handleRequest(
    httpData,
    HrService.removeHrInterviewCandidate,
    +intId,
    +canId
  );
};

export const createHrInterviewCandidate = async (...httpData) => {
  const intId = fromSwagger(httpData, 'intId');
  const { personId } = fromSwagger(httpData, 'body');
  await handleRequest(
    httpData,
    HrService.createHrInterviewCandidate,
    +intId,
    +personId
  );
};

export const getHrEmailPlaceholders = async (...httpData) => {
  const emailType = fromSwagger(httpData, 'emailType');
  await handleRequest(httpData, HrService.getHrEmailPlaceholders, emailType);
};

export const getHrInterviewSummary = async (...httpData) => {
  const intId = fromSwagger(httpData, 'intId');
  await handleRequest(httpData, HrService.getHrInterviewSummary, +intId);
};

export const startHrInterview = async (...httpData) => {
  const intId = fromSwagger(httpData, 'intId');
  await handleRequest(httpData, HrService.startHrInterview, +intId);
};

export const hrGetCalendar = async (...httpData) => {
  await handleRequest(httpData, HrService.hrGetCalendar);
};
export const hrCanEditPerson = async (...httpData) => {
  const personId: HrCanEditPersonParamPersonId = fromSwagger(
    httpData,
    'personId'
  );
  await handleRequest(httpData, HrService.hrCanEditPerson, personId);
};
export const hrCanEditEmail = async (...httpData) => {
  const emailId: HrCanEditEmailParamEmailId = fromSwagger(httpData, 'emailId');
  await handleRequest(httpData, HrService.hrCanEditEmail, emailId);
};
export const hrCanEditJobPosition = async (...httpData) => {
  const positionId: HrCanEditJobPositionParamPositionId = fromSwagger(
    httpData,
    'positionId'
  );
  await handleRequest(httpData, HrService.hrCanEditJobPosition, positionId);
};
export const hrCanEditJobFormular = async (...httpData) => {
  const positionId: HrCanEditJobFormularParamPositionId = fromSwagger(
    httpData,
    'positionId'
  );
  const formId: HrCanEditJobFormularParamFormId = fromSwagger(
    httpData,
    'formId'
  );
  await handleRequest(
    httpData,
    HrService.hrCanEditJobFormular,
    positionId,
    formId
  );
};
export const hrCanEditMp3 = async (...httpData) => {
  const mp3Id: HrCanEditMp3ParamMp3Id = fromSwagger(httpData, 'mp3Id');
  await handleRequest(httpData, HrService.hrCanEditMp3, mp3Id);
};

export const hrCanEditImg = async (...httpData) => {
  const imgId: HrCanEditMp3ParamMp3Id = fromSwagger(httpData, 'imgId');
  await handleRequest(httpData, HrService.hrCanEditImg, imgId);
};

export const hrCanEditMp4 = async (...httpData) => {
  const mp4Id: HrCanEditMp4ParamMp4Id = fromSwagger(httpData, 'mp4Id');
  await handleRequest(httpData, HrService.hrCanEditMp4, mp4Id);
};
export const editHrInterviewPrelog = async (...httpData) => {
  const intId: EditHrInterviewPrelogParamIntId = fromSwagger(httpData, 'intId');
  const body: EditHrInterviewPrelogParamBody = fromSwagger(httpData, 'body');
  await handleRequest(httpData, HrService.editHrInterviewPrelog, intId, body);
};
export const updateHrJobPositiomFormMedals = async (...httpData) => {
  const positionId: UpdateHrJobPositiomFormMedalsParamPositionId = fromSwagger(
    httpData,
    'positionId'
  );
  const formId: UpdateHrJobPositiomFormMedalsParamFormId = fromSwagger(
    httpData,
    'formId'
  );
  const body: UpdateHrJobPositiomFormMedalsParamBody = fromSwagger(
    httpData,
    'body'
  );
  await handleRequest(
    httpData,
    HrService.updateHrJobPositiomFormMedals,
    positionId,
    formId,
    body
  );
};
export const testHrInterview = async (...httpData) => {
  const intId: TestHrInterviewParamIntId = fromSwagger(httpData, 'intId');
  await handleRequest(httpData, HrService.testHrInterview, intId);
};
export const setHrInterviewBackgroundColor = async (...httpData) => {
  const intId: SetHrInterviewBackgroundColorParamIntId = fromSwagger(
    httpData,
    'intId'
  );
  const body: SetHrInterviewBackgroundColorParamBody = fromSwagger(
    httpData,
    'body'
  );
  await handleRequest(
    httpData,
    HrService.setHrInterviewBackgroundColor,
    intId,
    body
  );
};

export const getSharedVideoTutorials = async (...httpData) => {
  const req = httpData[0];

  if (!req.session.companyId && !req.session.hrId) {
    throw Error401(req);
  }

  await handleRequest(httpData, HrService.getSharedVideoTutorials);
};
