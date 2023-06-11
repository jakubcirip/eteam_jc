import { handleRequest, fromSwagger } from '../helpers/utils';
import { HrService } from '../services/HrService';
import { Error401 } from '../helpers/errors';
import { SharedService } from '../services/sharedService';

export const getPlansData = async (...httpData) => {
  const req = httpData[0];

  if (!req.session.companyId && !req.session.hrId) {
    throw Error401(req);
  }

  await handleRequest(httpData, SharedService.getPlansData);
};
