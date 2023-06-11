import { handleRequest, fromSwagger } from '../helpers/utils';
import { DivisionService } from '../services/DivisionService';

export const getDivision = async (...httpData) => {
  const divisionId = fromSwagger(httpData, 'divisionId');

  await handleRequest(httpData, DivisionService.getDivision, divisionId);
};

export const getDivisions = async (...httpData) => {
  await handleRequest(httpData, DivisionService.getDivisions);
};

export const addPerson = async (...httpData) => {
  const divisionId = fromSwagger(httpData, 'divisionId');
  const personData = fromSwagger(httpData, 'personData');

  await handleRequest(
    httpData,
    DivisionService.addPerson,
    personData,
    divisionId
  );
};

export const createDivision = async (...httpData) => {
  const divisionData = fromSwagger(httpData, 'divisionData');
  await handleRequest(httpData, DivisionService.createDivision, divisionData);
};

export const deletePerson = async (...httpData) => {
  const hrId = fromSwagger(httpData, 'hrId');
  await handleRequest(httpData, DivisionService.deletePerson, hrId);
};

export const deleteDivision = async (...httpData) => {
  const divisionId = fromSwagger(httpData, 'divisionId');
  await handleRequest(httpData, DivisionService.deleteDivision, divisionId);
};

export const getDivisionMailPassword = async (...httpData) => {
  const divisionId = fromSwagger(httpData, 'divisionId');
  await handleRequest(
    httpData,
    DivisionService.getDivisionMailPassword,
    divisionId
  );
};

export const updateDivision = async (...httpData) => {
  const divisionId = fromSwagger(httpData, 'divisionId');
  const divisionData = fromSwagger(httpData, 'divisionData');
  await handleRequest(
    httpData,
    DivisionService.updateDivision,
    divisionData,
    divisionId
  );
};

export const changeDivisionMailPassword = async (...httpData) => {
  const divisionId = fromSwagger(httpData, 'divisionId');
  const { newPass, newPassAgain } = fromSwagger(httpData, 'passwordData');

  await handleRequest(
    httpData,
    DivisionService.changeDivisionMailPassword,
    divisionId,
    newPass,
    newPassAgain
  );
};
