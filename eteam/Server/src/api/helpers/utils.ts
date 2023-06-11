import { Error500 } from './errors';

export const handleRequest = async (httpData, func, ...data) => {
  const [req, res, next] = httpData;

  try {
    let resData;
    if (data && data.length > 0) {
      resData = await func(req, ...data);
    } else {
      resData = await func(req);
    }
    res.json(resData);
  } catch (exp) {
    if (exp.isHandled === true) {
      return next(exp);
    }

    return next(Error500(req, exp));
  }
};

export const handleCustomRequest = async (httpData, func, ...data) => {
  const [req, res, next] = httpData;

  try {
    let resData;
    if (data && data.length > 0) {
      resData = await func(req, ...data);
    } else {
      resData = await func(req);
    }

    return resData;
  } catch (exp) {
    if (exp.isHandled === true) {
      return next(exp);
    }

    return next(Error500(req, exp));
  }
};

export const fromSwagger = (httpData, key) => {
  const [req, _res, next] = httpData;
  try {
    return req.swagger.params[key].value;
  } catch (exp) {
    return next(
      Error500(req, __('Utils.fromSwagger.cantGetKeyFromSwagger', { key, exp }))
    );
  }
};
