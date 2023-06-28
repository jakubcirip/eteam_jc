import { ExportHrInterviewPdfParamIntId } from '../models/swaggerTypes';
import { UpdateInterviewNotesParamCanId } from '../models/swaggerTypes';
import { UpdateInterviewNotesParamIntId } from '../models/swaggerTypes';
import { SetHrInterviewImageParamBody } from '../models/swaggerTypes';
import { SetHrInterviewImageParamIntId } from '../models/swaggerTypes';
import { SetHrInterviewColorParamBody } from '../models/swaggerTypes';
import { SetHrInterviewColorParamIntId } from '../models/swaggerTypes';
import { UpdateInterviewMedalsParamIntId } from '../models/swaggerTypes';
import {
  handleRequest,
  fromSwagger,
  handleCustomRequest,
} from '../helpers/utils';
import { InterviewService } from '../services/InterviewService';
import { Utils } from '../../Utils';
import { HrService } from '../services/HrService';

export const getEmojis = async (...httpData) => {
  await handleRequest(httpData, InterviewService.getEmojis);
};

export const getInterviewForm = async (...httpData) => {
  const intTag = fromSwagger(httpData, 'intTag');
  const userTag = fromSwagger(httpData, 'userTag');
  await handleRequest(
    httpData,
    InterviewService.getInterviewForm,
    intTag,
    userTag,
    httpData
  );
};

export const validateInterviewUser = async (...httpData) => {
  const intTag = fromSwagger(httpData, 'intTag');
  const userTag = fromSwagger(httpData, 'userTag');
  await handleRequest(
    httpData,
    InterviewService.validateInterviewUser,
    intTag,
    userTag,
    httpData
  );
};

export const submitInterviewResponse = async (...httpData) => {
  const intTag = fromSwagger(httpData, 'intTag');
  const userTag = fromSwagger(httpData, 'userTag');
  const body = fromSwagger(httpData, 'body');
  await handleRequest(
    httpData,
    InterviewService.submitInterviewResponse,
    intTag,
    userTag,
    httpData,
    body
  );
};
export const updateInterviewMedals = async (...httpData) => {
  const formId: UpdateInterviewMedalsParamIntId = fromSwagger(
    httpData,
    'formId'
  );
  await handleRequest(httpData, InterviewService.updateInterviewMedals, formId);
};
export const setHrInterviewColor = async (...httpData) => {
  const intId: SetHrInterviewColorParamIntId = fromSwagger(httpData, 'intId');
  const body: SetHrInterviewColorParamBody = fromSwagger(httpData, 'body');
  await handleRequest(
    httpData,
    InterviewService.setHrInterviewColor,
    intId,
    body
  );
};
export const setHrInterviewImage = async (...httpData) => {
  const intId: SetHrInterviewImageParamIntId = fromSwagger(httpData, 'intId');
  const body: SetHrInterviewImageParamBody = fromSwagger(httpData, 'body');
  await handleRequest(
    httpData,
    InterviewService.setHrInterviewImage,
    intId,
    body
  );
};

export const getHrInterviewImages = async (...httpData) => {
  await handleRequest(httpData, InterviewService.getHrInterviewImages);
};
export const updateInterviewNotes = async (...httpData) => {
  const intId: UpdateInterviewNotesParamIntId = fromSwagger(httpData, 'intId');
  const canId: UpdateInterviewNotesParamCanId = fromSwagger(httpData, 'canId');
  const { note } = fromSwagger(httpData, 'body');
  await handleRequest(
    httpData,
    InterviewService.updateInterviewNotes,
    intId,
    canId,
    note
  );
};
export const exportHrInterviewPdf = async (...httpData) => {
  const intId: ExportHrInterviewPdfParamIntId = fromSwagger(httpData, 'intId');
  const { fileUrl } = await handleCustomRequest(
    httpData,
    InterviewService.exportHrInterviewPdf,
    intId
  );

  const res = httpData[1];
  res.sendFile(fileUrl);
};
