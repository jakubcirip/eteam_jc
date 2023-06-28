import * as fs from 'fs';
import * as archiver from 'archiver';
import * as encryptable from 'archiver-zip-encryptable';
archiver.registerFormat('zip-encryptable', encryptable);

import { GenerateInterviewZipParamBody } from '../models/swaggerTypes';
import { fromSwagger, handleRequest } from '../helpers/utils';
import { PublicService } from '../services/PublicService';
import { fileIdToPath } from './fmCtrl';
import { Error500, Error404 } from '../helpers/errors';
import { SQLManager } from '../managers/SQLManager';

export const sendContactEmail = async (...httpData) => {
  const { name, email, subject, text } = fromSwagger(httpData, 'body');

  await handleRequest(
    httpData,
    PublicService.sendContactEmail,
    name,
    email,
    subject,
    text
  );
};

export const registerInterest = async (...httpData) => {
  const { company, city, email, canContact } = fromSwagger(httpData, 'body');

  await handleRequest(
    httpData,
    PublicService.sendRegisterEmail,
    company,
    city,
    email,
    canContact
  );
};
export const getIndexData = async (...httpData) => {
  await handleRequest(httpData, PublicService.getIndexData);
};

export const getPublicMp3 = async (...httpData) => {
  const [req, res, next] = httpData;

  try {
    const mp3Id = fromSwagger(httpData, 'mp3Id').split('.mp3').join('');
    const intTag = fromSwagger(httpData, 'intTag').split('.mp3').join('');

    const intData = await SQLManager.knex
      .select({
        divId: 'division_id',
      })
      .from('job_interviews')
      .where('tag', intTag)
      .limit(1);

    if (intData.length <= 0) {
      throw Error404(req, __('PubicCtrl.getPublicMp3.interviewNotFound'));
    }

    const [{ divId }] = intData;

    res.sendFile(fileIdToPath(mp3Id, 'mp3', divId));
  } catch (exp) {
    if (exp.isHandled === true) {
      return next(exp);
    }

    return next(Error500(req, exp));
  }
};

export const getPublicImg = async (...httpData) => {
  const [req, res, next] = httpData;

  try {
    const imgId = fromSwagger(httpData, 'imgId').split('.png').join('');
    const intTag = fromSwagger(httpData, 'intTag').split('.png').join('');

    const intData = await SQLManager.knex
      .select({
        divId: 'division_id',
      })
      .from('job_interviews')
      .where('tag', intTag)
      .limit(1);

    if (intData.length <= 0) {
      throw Error404(req, __('PubicCtrl.getPublicImg.interviewNotFound'));
    }

    const [{ divId }] = intData;

    res.sendFile(fileIdToPath(imgId, 'png', divId));
  } catch (exp) {
    if (exp.isHandled === true) {
      return next(exp);
    }

    return next(Error500(req, exp));
  }
};

export const getPublicMp4 = async (...httpData) => {
  const [req, res, next] = httpData;

  try {
    const mp4Id = fromSwagger(httpData, 'mp4Id').split('.mp4').join('');
    const intTag = fromSwagger(httpData, 'intTag').split('.mp4').join('');

    const intData = await SQLManager.knex
      .select({
        divId: 'division_id',
      })
      .from('job_interviews')
      .where('tag', intTag)
      .limit(1);

    if (intData.length <= 0) {
      throw Error404(req, __('PubicCtrl.getPublicMp4.interviewNotFound'));
    }

    const [{ divId }] = intData;

    res.sendFile(fileIdToPath(mp4Id, 'mp4', divId));
  } catch (exp) {
    if (exp.isHandled === true) {
      return next(exp);
    }

    return next(Error500(req, exp));
  }
};

export const getSupportedLanguages = async (...httpData) => {
  await handleRequest(httpData, PublicService.getSupportedLanguages);
};
export const generateInterviewZip = async (...httpData) => {
  console.log('[MY TEST] [1] ' + Date.now());
  const body: GenerateInterviewZipParamBody = fromSwagger(httpData, 'body');

  const [req, res, next] = httpData;

  console.log('[MY TEST] [2] ' + Date.now());
  try {
    var archive = archiver('zip-encryptable', {
      zlib: { level: 9 },
      forceLocalTime: true,
      password: process.env.ZIP_PASSWORD,
    });

    console.log('[MY TEST] [4] ' + Date.now());
    archive.pipe(res);

    archive.append(Buffer.from(body.data), { name: 'data.json' });

    console.log('[MY TEST] [5] ' + Date.now());

    archive.finalize();

    console.log('[MY TEST] [6] ' + Date.now());
  } catch (exp) {
    console.log('[MY TEST] [3] ' + Date.now());
    if (exp.isHandled === true) {
      return next(exp);
    }

    return next(Error500(req, exp));
  }
};
