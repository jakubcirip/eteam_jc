import { handleRequest, fromSwagger } from '../helpers/utils';
import { FmService } from '../services/FmService';
import { Error500 } from '../helpers/errors';

import * as path from 'path';
import { Utils } from '../../Utils';

export const deleteMp3 = async (...httpData) => {
  const mp3Id = fromSwagger(httpData, 'mp3Id');
  await handleRequest(httpData, FmService.deleteMp3, mp3Id);
};

export const deleteImg = async (...httpData) => {
  const imgId = fromSwagger(httpData, 'imgId');
  await handleRequest(httpData, FmService.deleteImg, imgId);
};

export const updateMp3 = async (...httpData) => {
  const mp3Data = fromSwagger(httpData, 'mp3Data');
  const mp3Id = fromSwagger(httpData, 'mp3Id');
  await handleRequest(httpData, FmService.updateMp3, mp3Id, mp3Data);
};

export const updateImg = async (...httpData) => {
  const imgData = fromSwagger(httpData, 'imgData');
  const imgId = fromSwagger(httpData, 'imgId');
  await handleRequest(httpData, FmService.updateImg, imgId, imgData);
};

export const deleteMp4 = async (...httpData) => {
  const mp4Id = fromSwagger(httpData, 'mp4Id');
  await handleRequest(httpData, FmService.deleteMp4, mp4Id);
};

export const updateMp4 = async (...httpData) => {
  const mp4Data = fromSwagger(httpData, 'mp4Data');
  const mp4Id = fromSwagger(httpData, 'mp4Id');
  await handleRequest(httpData, FmService.updateMp4, mp4Id, mp4Data);
};

export const getMp3 = async (...httpData) => {
  await handleRequest(httpData, FmService.getMp3);
};

export const getImg = async (...httpData) => {
  await handleRequest(httpData, FmService.getImg);
};

export const getMp4 = async (...httpData) => {
  await handleRequest(httpData, FmService.getMp4);
};

export const uploadMp3 = async (...httpData) => {
  const mp3Data = fromSwagger(httpData, 'mp3Data');
  await handleRequest(httpData, FmService.uploadMp3, mp3Data);
};

export const uploadImg = async (...httpData) => {
  const imgData = fromSwagger(httpData, 'imgData');
  await handleRequest(httpData, FmService.uploadImg, imgData);
};

export const uploadMp4 = async (...httpData) => {
  const mp4Data = fromSwagger(httpData, 'mp4Data');
  await handleRequest(httpData, FmService.uploadMp4, mp4Data);
};

export const getMp3Src = async (...httpData) => {
  const [req, res, next] = httpData;

  try {
    const mp3Id = fromSwagger(httpData, 'mp3Id').split('.mp3').join('');
    const hrId = req.session.hrId;
    const divId = await Utils.hrToDivId(req, hrId);
    res.sendFile(fileIdToPath(mp3Id, 'mp3', divId));
  } catch (exp) {
    if (exp.isHandled === true) {
      return next(exp);
    }

    return next(Error500(req, exp));
  }
};

export const getImgSrc = async (...httpData) => {
  const [req, res, next] = httpData;

  try {
    const imgId = fromSwagger(httpData, 'imgId').split('.png').join('');
    const hrId = req.session.hrId;
    const divId = await Utils.hrToDivId(req, hrId);
    res.sendFile(fileIdToPath(imgId, 'png', divId));
  } catch (exp) {
    if (exp.isHandled === true) {
      return next(exp);
    }

    return next(Error500(req, exp));
  }
};

export const getMp4Src = async (...httpData) => {
  const [req, res, next] = httpData;

  try {
    const mp4Id = fromSwagger(httpData, 'mp4Id').split('.mp3').join('');
    const hrId = req.session.hrId;
    const divId = await Utils.hrToDivId(req, hrId);
    res.sendFile(fileIdToPath(mp4Id, 'mp4', divId));
  } catch (exp) {
    if (exp.isHandled === true) {
      return next(exp);
    }

    return next(Error500(req, exp));
  }
};

export const fileIdToPath = (fId: string, folder: string, divId: number) => {
  if (fId.startsWith('T_')) {
    const fName = fId.split('T_').join('');

    return path.join(
      process.env.dirname,
      '../private/fm/' + folder + '/TEMPLATE/' + fName + '.' + folder
    );
  } else {
    return path.join(
      process.env.dirname,
      '../private/fm/' + folder + '/' + divId + '/' + fId + '.' + folder
    );
  }
};
