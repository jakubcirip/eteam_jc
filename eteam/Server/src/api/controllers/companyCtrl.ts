import { GetCompanyInterviewHistoryDetailParamHistoryIntId } from '../models/swaggerTypes';
import { handleRequest, fromSwagger } from '../helpers/utils';
import { CompanyService } from '../services/CompanyService';

export const getCompanySettings = async (...httpData) => {
  await handleRequest(httpData, CompanyService.getCompanySettings);
};

export const updateCompanyPassword = async (...httpData) => {
  const [req] = httpData;

  const passData = fromSwagger(httpData, 'passData');
  await handleRequest(httpData, CompanyService.updateCompanyPassword, passData);
};

export const getTokensInfoCompany = async (...httpData) => {
  await handleRequest(httpData, CompanyService.getTokensInfoCompany);
};

export const getCompanyIndexData = async (...httpData) => {
  await handleRequest(httpData, CompanyService.getCompanyIndexData);
};

export const getMeInfoCompany = async (...httpData) => {
  await handleRequest(httpData, CompanyService.getMeInfoCompany);
};

export const getFaqCompany = async (...httpData) => {
  await handleRequest(httpData, CompanyService.getFaqCompany);
};

export const activatePlan = async (...httpData) => {
  const [req] = httpData;

  const emailData = fromSwagger(httpData, 'planData');
  await handleRequest(httpData, CompanyService.activatePlan, emailData);
};

export const sendCompanySupportEmail = async (...httpData) => {
  const [req] = httpData;

  const emailData = fromSwagger(httpData, 'emailData');
  await handleRequest(
    httpData,
    CompanyService.sendCompanySupportEmail,
    emailData
  );
};

export const purchaseTokens = async (...httpData) => {
  const [req] = httpData;

  const purchaseData = fromSwagger(httpData, 'purchaseData');
  await handleRequest(httpData, CompanyService.purchaseTokens, purchaseData);
};

export const authCheckCompany = async (...httpData) => {
  const [req] = httpData;

  const authData = fromSwagger(httpData, 'authData');
  await handleRequest(httpData, CompanyService.authCheckCompany, authData);
};

export const registerCompany = async (...httpData) => {
  const regData = fromSwagger(httpData, 'registerData');
  await handleRequest(httpData, CompanyService.registerCompany, regData);
};

export const loginCompany = async (...httpData) => {
  const [req] = httpData;

  const logData = fromSwagger(httpData, 'loginData');
  await handleRequest(httpData, CompanyService.loginCompany, logData);
};

export const activateCompany = async (...httpData) => {
  const activationCode = fromSwagger(httpData, 'code');
  await handleRequest(httpData, CompanyService.activateCompany, activationCode);
};

export const requestResetCompanyPassword = async (...httpData) => {
  const resetData = fromSwagger(httpData, 'resetData');
  await handleRequest(
    httpData,
    CompanyService.requestResetCompanyPassword,
    resetData
  );
};

export const resetCompanyPassword = async (...httpData) => {
  const resetData = fromSwagger(httpData, 'resetData');
  await handleRequest(httpData, CompanyService.resetCompanyPassword, resetData);
};

export const resetCompanyPasswordValidate = async (...httpData) => {
  const resetData = fromSwagger(httpData, 'resetData');
  await handleRequest(
    httpData,
    CompanyService.resetCompanyPasswordValidate,
    resetData
  );
};

export const getCompanyTokensStats = async (...httpData) => {
  await handleRequest(httpData, CompanyService.getCompanyTokensStats);
};

export const getCompanyInterviewHistory = async (...httpData) => {
  await handleRequest(httpData, CompanyService.getCompanyInterviewHistory);
};
export const getCompanyInterviewHistoryDetail = async (...httpData) => {
  const historyIntId: GetCompanyInterviewHistoryDetailParamHistoryIntId = fromSwagger(
    httpData,
    'historyIntId'
  );
  await handleRequest(
    httpData,
    CompanyService.getCompanyInterviewHistoryDetail,
    historyIntId
  );
};
