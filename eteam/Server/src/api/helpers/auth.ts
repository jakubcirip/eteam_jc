import { Error401 } from './errors';

export const CompanyAuthGuard = async (req, def, scopes, callback) => {
  if (!req.session.companyId) {
    callback(Error401(req));
    return;
  }

  return callback();
};

export const HrAuthGuard = async (req, def, scopes, callback) => {
  if (!req.session.hrId) {
    callback(Error401(req));
    return;
  }

  return callback();
};

export const InternalAuth = async (req, def, scopes, callback) => {
  if (
    !req.headers['x-api-key'] ||
    req.headers['x-api-key'] !== process.env.API_KEY
  ) {
    callback(Error401(req));
    return;
  }

  return callback();
};
