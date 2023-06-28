import { CreateFastInterviewParamBody } from '../models/swaggerTypes';
import {
  LikeHrEmailCatalogParamEmailId,
  LikeHrFormCatalogParamEmailId,
  ImportHrFormCatalogParamBody,
} from '../models/swaggerTypes';
import { ImportHrEmailCatalogParamBody } from '../models/swaggerTypes';
import { handleRequest, fromSwagger } from '../helpers/utils';
import { CatalogService } from '../services/CatalogService';

export const getHrEmailCatalog = async (...httpData) => {
  await handleRequest(httpData, CatalogService.getHrEmailCatalog);
};
export const importHrEmailCatalog = async (...httpData) => {
  const body: ImportHrEmailCatalogParamBody = fromSwagger(httpData, 'body');
  await handleRequest(httpData, CatalogService.importHrEmailCatalog, body);
};
export const likeHrEmailCatalog = async (...httpData) => {
  const emailId: LikeHrEmailCatalogParamEmailId = fromSwagger(
    httpData,
    'emailId'
  );
  await handleRequest(httpData, CatalogService.likeHrEmailCatalog, emailId);
};

export const getHrFormCatalog = async (...httpData) => {
  await handleRequest(httpData, CatalogService.getHrFormCatalog);
};
export const importHrFormCatalog = async (...httpData) => {
  const body: ImportHrFormCatalogParamBody = fromSwagger(httpData, 'body');
  await handleRequest(httpData, CatalogService.importHrFormCatalog, body);
};
export const likeHrFormCatalog = async (...httpData) => {
  const formId: LikeHrFormCatalogParamEmailId = fromSwagger(httpData, 'formId');
  await handleRequest(httpData, CatalogService.likeHrFormCatalog, formId);
};
export const createFastInterview = async (...httpData) => {
  const body: CreateFastInterviewParamBody = fromSwagger(httpData, 'body');
  await handleRequest(httpData, CatalogService.createFastInterview, body);
};
