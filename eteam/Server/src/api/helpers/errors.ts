import { LogManager } from '../managers/LogManager';

export const Error500 = (req, exp) => {
  LogManager.error(exp);
  return {
    isHandled: true,
    status: 500,
    message: exp,
  };
};

export const Error400 = (req, msg) => {
  return {
    isHandled: true,
    status: 400,
    message: msg,
  };
};

export const Error401 = (req) => {
  return {
    isHandled: true,
    status: 401,
    message: req.$localize(
      ':errors - error 401@@so9aAKY:You must be logged in to do this.'
    ),
  };
};

export const Error404 = (req, msg) => {
  return {
    isHandled: true,
    status: 404,
    message: msg,
  };
};
