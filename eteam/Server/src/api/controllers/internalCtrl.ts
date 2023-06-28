import { fromSwagger, handleRequest } from '../helpers/utils';
import { InternalService } from '../services/InternalService';

export const parseInternalEmailPlaceholders = async (...httpData) => {
  const {
    candidateId,
    companyId,
    divId,
    intId,
    mailId,
    customCanEmail,
  } = fromSwagger(httpData, 'body');

  await handleRequest(
    httpData,
    InternalService.parseInternalEmailPlaceholders,
    candidateId,
    companyId,
    divId,
    intId,
    mailId,
    customCanEmail
  );
};

export const getInternalInterviewCandidateStatistics = async (...httpData) => {
  const intId = fromSwagger(httpData, 'intId');

  await handleRequest(
    httpData,
    InternalService.getInternalInterviewCandidateStatistics,
    +intId
  );
};

export const getInternalInterviewSummary = async (...httpData) => {
  const intId = fromSwagger(httpData, 'intId');

  await handleRequest(
    httpData,
    InternalService.getInternalInterviewSummary,
    +intId
  );
};
