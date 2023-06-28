import { Mp3Array, BasicResponse, Mp4Array } from '../models/swaggerTypes';
import * as ffmpeg from 'ffmpeg';

import * as mp3 from 'mp3-duration';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as config from 'config';
import { Utils } from '../../Utils';
import { Error500, Error400 } from '../helpers/errors';
import { HrService } from './HrService';
import { PricingManager } from '../managers/PricingManager';

export class FmService {
  static async didCandidateAlreadySubmit(
    intTag: string,
    userTag: string
  ): Promise<boolean> {
    const intDir = path.join(
      process.env.dirname,
      '../private/fm/int/' + intTag
    );

    const dataDir = path.join(intDir, userTag + '.json');
    return fs.existsSync(dataDir);
  }

  static async saveInterviewResults(
    intTag: string,
    userTag: string,
    data: any,
    isSource?: boolean
  ) {
    const intDir = path.join(
      process.env.dirname,
      '../private/fm/int/' + intTag
    );
    await fs.ensureDir(intDir);
    const dataDir = isSource
      ? path.join(intDir, userTag + '_source.json')
      : path.join(intDir, userTag + '.json');

    const doesExist = await fs.pathExists(dataDir);
    if (doesExist) {
      await fs.remove(dataDir);
    }

    await Promise.all([fs.writeFile(dataDir, JSON.stringify(data))]);
  }

  static async deleteMp4(req: any, mp4Id: string): Promise<BasicResponse> {
    const hrId = req.session.hrId;
    const divId = await Utils.hrToDivId(req, hrId);

    if (!(await HrService.hrCanEditMp4(req, mp4Id)).canEdit) {
      throw Error400(req, __('FmService.shared.fileUsedInInterview'));
    }

    const mp4Path = path.join(
      process.env.dirname,
      '../private/fm/mp4/' + divId + '/' + mp4Id + '.mp4'
    );

    const txtPath = path.join(
      process.env.dirname,
      '../private/fm/mp4/' + divId + '/' + mp4Id + '.txt'
    );

    const exists = await fs.pathExists(txtPath);

    if (!exists) {
      throw Error500(req, __('FmService.deleteMp4.fileNoLongerExists'));
    }

    await Promise.all([fs.remove(mp4Path), fs.remove(txtPath)]);

    return {
      success: true,
      message: __('FmService.deleteMp4.success'),
    };
  }

  static async updateMp4(
    req: any,
    mp4Id: string,
    mp4Data: { newName: string }
  ): Promise<BasicResponse> {
    const hrId = req.session.hrId;
    const divId = await Utils.hrToDivId(req, hrId);

    if (!(await HrService.hrCanEditMp4(req, mp4Id)).canEdit) {
      throw Error400(req, __('FmService.shared.fileUsedInInterview'));
    }

    const txtPath = path.join(
      process.env.dirname,
      '../private/fm/mp4/' + divId + '/' + mp4Id + '.txt'
    );

    const exists = await fs.pathExists(txtPath);

    if (!exists) {
      throw Error500(req, __('FmService.updateMp4.fileNoLongerExists'));
    }

    await fs.remove(txtPath);
    await fs.writeFile(txtPath, mp4Data.newName);

    return {
      success: true,
      message: __('FmService.updateMp4.success'),
    };
  }

  static async deleteMp3(req: any, mp3Id: string): Promise<BasicResponse> {
    const hrId = req.session.hrId;
    const divId = await Utils.hrToDivId(req, hrId);

    if (!(await HrService.hrCanEditMp4(req, mp3Id)).canEdit) {
      throw Error400(req, __('FmService.shared.fileUsedInInterview'));
    }

    const mp3Path = path.join(
      process.env.dirname,
      '../private/fm/mp3/' + divId + '/' + mp3Id + '.mp3'
    );

    const txtPath = path.join(
      process.env.dirname,
      '../private/fm/mp3/' + divId + '/' + mp3Id + '.txt'
    );

    const exists = await fs.pathExists(txtPath);

    if (!exists) {
      throw Error500(req, __('FmService.deleteMp3.fileNoLongerExists'));
    }

    await Promise.all([fs.remove(mp3Path), fs.remove(txtPath)]);

    return {
      success: true,
      message: __('FmService.deleteMp3.success'),
    };
  }

  static async deleteImg(req: any, imgId: string): Promise<BasicResponse> {
    const hrId = req.session.hrId;
    const divId = await Utils.hrToDivId(req, hrId);

    if (!(await HrService.hrCanEditImg(req, imgId)).canEdit) {
      throw Error400(req, __('FmService.shared.fileUsedInInterview'));
    }

    const mp3Path = path.join(
      process.env.dirname,
      '../private/fm/png/' + divId + '/' + imgId + '.png'
    );

    const txtPath = path.join(
      process.env.dirname,
      '../private/fm/png/' + divId + '/' + imgId + '.txt'
    );

    const exists = await fs.pathExists(txtPath);

    if (!exists) {
      throw Error500(req, __('FmService.deleteImg.fileNoLongerExists'));
    }

    await Promise.all([fs.remove(mp3Path), fs.remove(txtPath)]);

    return {
      success: true,
      message: __('FmService.deleteImg.success'),
    };
  }

  static async updateMp3(
    req: any,
    mp3Id: string,
    mp3Data: { newName: string }
  ): Promise<BasicResponse> {
    const hrId = req.session.hrId;
    const divId = await Utils.hrToDivId(req, hrId);

    if (!(await HrService.hrCanEditMp4(req, mp3Id)).canEdit) {
      throw Error400(req, __('FmService.shared.fileUsedInInterview'));
    }

    const txtPath = path.join(
      process.env.dirname,
      '../private/fm/mp3/' + divId + '/' + mp3Id + '.txt'
    );

    const exists = await fs.pathExists(txtPath);

    if (!exists) {
      throw Error500(req, __('FmService.updateMp3.fileNoLongerExists'));
    }

    await fs.remove(txtPath);
    await fs.writeFile(txtPath, mp3Data.newName);

    return {
      success: true,
      message: __('FmService.updateMp3.success'),
    };
  }

  static async updateImg(
    req: any,
    imgId: string,
    imgData: { newName: string }
  ): Promise<BasicResponse> {
    const hrId = req.session.hrId;
    const divId = await Utils.hrToDivId(req, hrId);

    if (!(await HrService.hrCanEditImg(req, imgId)).canEdit) {
      throw Error400(req, __('FmService.shared.fileUsedInInterview'));
    }

    const txtPath = path.join(
      process.env.dirname,
      '../private/fm/png/' + divId + '/' + imgId + '.txt'
    );

    const exists = await fs.pathExists(txtPath);

    if (!exists) {
      throw Error500(req, __('FmService.updateImg.fileNoLongerExists'));
    }

    await fs.remove(txtPath);
    await fs.writeFile(txtPath, imgData.newName);

    return {
      success: true,
      message: __('FmService.updateImg.success'),
    };
  }

  static async uploadMp3(
    req: any,
    data: {
      name: string;
      source: string;
    }
  ): Promise<BasicResponse> {
    const hrId = req.session.hrId;
    const divId = await Utils.hrToDivId(req, hrId);

    const mp3Dir = path.join(process.env.dirname, '../private/fm/mp3/' + divId);
    await fs.ensureDir(mp3Dir);

    const getId = async (tryNum): Promise<string> => {
      if (tryNum >= 5) {
        return null;
      }

      const genId = Utils.generateFileId();
      const exists = await fs.pathExists(path.join(mp3Dir, genId + '.txt'));

      if (exists === false) {
        return genId;
      } else {
        return getId(tryNum + 1);
      }
    };

    const id = await getId(0);

    if (id === null) {
      throw Error500(req, __('FmService.uploadMp3.cantGenerateId'));
    }

    const txtFilePath = path.join(mp3Dir, id + '.txt');
    const mp3FilePath = path.join(mp3Dir, id + '.mp3');

    const beforeProcessFilePath = path.join(mp3Dir, 'tmp_' + id + '.mp3');

    const mp3Data = data.source.split(';base64,')[1];

    const b = Buffer.from(mp3Data, 'base64');

    const canUpload = await PricingManager.canUploadFile(
      req,
      hrId,
      Buffer.byteLength(b),
      'mp3Size'
    );

    if (!canUpload) {
      throw Error400(req, __('FmService.uploadMp3.mp3SizeLimitReached'));
    }

    const totalMp3s = (await fs.readdir(mp3Dir)).filter((f) =>
      f.endsWith('.mp3')
    ).length;
    const canAdd = await PricingManager.canIncrementAmount(
      req,
      hrId,
      totalMp3s,
      'mp3Total'
    );
    if (!canAdd) {
      throw Error400(req, __('FmService.uploadMp3.mp3AmountLimitReached'));
    }

    await Promise.all([
      fs.writeFile(txtFilePath, data.name),
      fs.writeFile(beforeProcessFilePath, b),
    ]);

    const audioFile = await new ffmpeg(beforeProcessFilePath);

    await new Promise((res, rej) => {
      audioFile.fnExtractSoundToMP3(mp3FilePath, (err, f) => {
        if (err) {
          rej(err);
          return;
        }

        res(true);
      });
    });

    await fs.remove(beforeProcessFilePath);

    return {
      success: true,
      message: __('FmService.uploadMp3.success'),
    };
  }

  static async uploadImg(
    req: any,
    data: {
      name: string;
      source: string;
    }
  ): Promise<BasicResponse> {
    const hrId = req.session.hrId;
    const divId = await Utils.hrToDivId(req, hrId);

    const imgDir = path.join(process.env.dirname, '../private/fm/png/' + divId);
    await fs.ensureDir(imgDir);

    const getId = async (tryNum): Promise<string> => {
      if (tryNum >= 5) {
        return null;
      }

      const genId = Utils.generateFileId();
      const exists = await fs.pathExists(path.join(imgDir, genId + '.txt'));

      if (exists === false) {
        return genId;
      } else {
        return getId(tryNum + 1);
      }
    };

    const id = await getId(0);

    if (id === null) {
      throw Error500(req, __('FmService.uploadImg.cantGenerateId'));
    }

    const txtFilePath = path.join(imgDir, id + '.txt');
    const pngFilePath = path.join(imgDir, id + '.png');

    const imgData = data.source.split(';base64,')[1];

    const b = Buffer.from(imgData, 'base64');

    const canUpload = await PricingManager.canUploadFile(
      req,
      hrId,
      Buffer.byteLength(b),
      'imgSize'
    );

    if (!canUpload) {
      throw Error400(req, __('FmService.uploadImg.imgSizeLimitReached'));
    }

    const totalMp3s = (await fs.readdir(imgDir)).filter((f) =>
      f.endsWith('.png')
    ).length;
    const canAdd = await PricingManager.canIncrementAmount(
      req,
      hrId,
      totalMp3s,
      'imgTotal'
    );
    if (!canAdd) {
      throw Error400(req, __('FmService.uploadImg.imgAmountLimitReached'));
    }

    await Promise.all([
      fs.writeFile(txtFilePath, data.name),
      fs.writeFile(pngFilePath, b),
    ]);

    return {
      success: true,
      message: __('FmService.uploadImg.success'),
    };
  }

  static async uploadMp4(
    req: any,
    data: {
      name: string;
      source: string;
    }
  ): Promise<BasicResponse> {
    const start = Date.now();
    console.log('Upload start', Date.now() - start);
    const hrId = req.session.hrId;
    const divId = await Utils.hrToDivId(req, hrId);
    console.log('Upload start 2', Date.now() - start);

    const mp4Dir = path.join(process.env.dirname, '../private/fm/mp4/' + divId);
    await fs.ensureDir(mp4Dir);

    const getId = async (tryNum): Promise<string> => {
      if (tryNum >= 5) {
        return null;
      }

      const genId = Utils.generateFileId();
      const exists = await fs.pathExists(path.join(mp4Dir, genId + '.txt'));

      if (exists === false) {
        return genId;
      } else {
        return getId(tryNum + 1);
      }
    };

    const id = await getId(0);

    console.log('Upload start 3', Date.now() - start);

    if (id === null) {
      throw Error500(req, __('FmService.uploadMp4.cantGenerateId'));
    }

    const txtFilePath = path.join(mp4Dir, id + '.txt');
    const mp4FilePath = path.join(mp4Dir, id + '.mp4');
    const beforeProcessFilePath = path.join(mp4Dir, 'tmp_' + id + '.mp4');

    const mp4Data = data.source.split(';base64,')[1];

    const b = Buffer.from(mp4Data, 'base64');

    console.log('Upload start 3', Date.now() - start);

    const canUpload = await PricingManager.canUploadFile(
      req,
      hrId,
      Buffer.byteLength(b),
      'mp4Size'
    );

    if (!canUpload) {
      throw Error400(req, __('FmService.uploadMp4.mp4SizeLimitReached'));
    }

    const totalMp4s = (await fs.readdir(mp4Dir)).filter((f) =>
      f.endsWith('.mp4')
    ).length;
    const canAdd = await PricingManager.canIncrementAmount(
      req,
      hrId,
      totalMp4s,
      'mp4Total'
    );
    if (!canAdd) {
      throw Error400(req, __('FmService.uploadMp4.mp4AmountLimitReached'));
    }

    console.log('Upload start 4', Date.now() - start);

    await Promise.all([
      fs.writeFile(txtFilePath, data.name),
      fs.writeFile(beforeProcessFilePath, b),
    ]);

    console.log('Upload start 5', Date.now() - start);

    const audioFile = await new ffmpeg(beforeProcessFilePath);
    await new Promise((res, rej) => {
      audioFile.save(mp4FilePath, (err, f) => {
        if (err) {
          rej(err);
          return;
        }

        res(true);
      });
    });

    console.log('Upload start 6', Date.now() - start);

    // await fs.remove(beforeProcessFilePath);

    console.log('Upload start 7', Date.now() - start);

    return {
      success: true,
      message: __('FmService.uploadMp4.success'),
    };
  }

  static async getMp3(req: any): Promise<Mp3Array> {
    const hrId = req.session.hrId;
    const divId = await Utils.hrToDivId(req, hrId);

    const mp3Dir = path.join(process.env.dirname, '../private/fm/mp3/' + divId);

    const output: Mp3Array = [];

    await fs.ensureDir(mp3Dir);
    const files = await fs.readdir(mp3Dir);

    const promises = files.map(async (file) => {
      if (file.endsWith('.txt')) {
        const fileName = path.join(mp3Dir, file);
        // const mp3FileName = path.join(mp3Dir, file.split('.txt').join('.mp3'));

        const [buffer] = await Promise.all([fs.readFile(fileName)]);

        const title = buffer.toString();

        const mp3Id = file.split('.txt').join('');

        const envKey = process.env.NODEMAIL_PRODUCTION;
        const envData: any = config.get(envKey);

        output.push({
          id: mp3Id,
          name: title,
          src: envData.apiUrl + '/hr/fm/mp3/' + mp3Id,
        });

        return true;
      }

      return false;
    });

    await Promise.all(promises);

    return output;
  }

  static async getImg(req: any): Promise<Mp3Array> {
    const hrId = req.session.hrId;
    const divId = await Utils.hrToDivId(req, hrId);

    const imgDir = path.join(process.env.dirname, '../private/fm/png/' + divId);

    const output: Mp3Array = [];

    await fs.ensureDir(imgDir);
    const files = await fs.readdir(imgDir);

    const promises = files.map(async (file) => {
      if (file.endsWith('.txt')) {
        const fileName = path.join(imgDir, file);
        // const mp3FileName = path.join(imgDir, file.split('.txt').join('.png'));

        const [buffer] = await Promise.all([fs.readFile(fileName)]);

        const title = buffer.toString();

        const imgId = file.split('.txt').join('');

        const envKey = process.env.NODEMAIL_PRODUCTION;
        const envData: any = config.get(envKey);

        output.push({
          id: imgId,
          name: title,
          src: envData.apiUrl + '/hr/fm/png/' + imgId,
        });

        return true;
      }

      return false;
    });

    await Promise.all(promises);

    return output;
  }

  static async getMp4(req: any): Promise<Mp4Array> {
    const hrId = req.session.hrId;
    const divId = await Utils.hrToDivId(req, hrId);

    const mp3Dir = path.join(process.env.dirname, '../private/fm/mp4/' + divId);

    const output: Mp4Array = [];

    await fs.ensureDir(mp3Dir);
    const files = await fs.readdir(mp3Dir);

    const promises = files.map(async (file) => {
      if (file.endsWith('.txt')) {
        const fileName = path.join(mp3Dir, file);
        const mp3FileName = path.join(mp3Dir, file.split('.txt').join('.mp4'));

        const [buffer] = await Promise.all([fs.readFile(fileName)]);

        const title = buffer.toString();

        const envKey = process.env.NODEMAIL_PRODUCTION;
        const envData: any = config.get(envKey);

        const mp3Id = file.split('.txt').join('');
        output.push({
          id: mp3Id,
          name: title,
          src: envData.apiUrl + '/hr/fm/mp4/' + mp3Id,
        });

        return true;
      }

      return false;
    });

    await Promise.all(promises);

    return output;
  }
}
