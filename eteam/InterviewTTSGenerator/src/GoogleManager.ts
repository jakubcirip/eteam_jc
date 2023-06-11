import * as fs from 'fs-extra';
import * as fsn from 'fs';
import * as path from 'path';
import * as util from 'util';
const system = require('system-commands');

import { TextToSpeechClient } from '@google-cloud/text-to-speech';
import { TranslationServiceClient } from '@google-cloud/translate';
import { SpeechClient } from '@google-cloud/speech';
import { LogManager } from './LogManager';

const ttsClient = new TextToSpeechClient();
const sttClient = new SpeechClient();
const translateClient = new TranslationServiceClient();

export class GoogleManager {
  static async languageDetection(text: string, cachePath: string) {
    let isCached = false;
    let cachedLang;

    const cacheExists = await fs.pathExists(cachePath);
    if (cacheExists) {
      const cacheJson = await fs.readJson(cachePath);
      if (cacheJson.text === text) {
        isCached = true;
        cachedLang = cacheJson.langCode;
      }
    }

    if (isCached) {
      LogManager.success('Already has cached version of language detection');
      return cachedLang;
    } else {
      LogManager.log(
        'Not cached, using Google API for language detection (' +
          text.length +
          ' letters)'
      );
    }

    const location = 'global';
    const projectId = await sttClient.getProjectId();
    const request = {
      parent: `projects/${projectId}/locations/${location}`,
      content: text,
    };

    const [response] = await translateClient.detectLanguage(request);
    response.languages.sort((a, b) => (a.confidence >= b.confidence ? -1 : 1));
    const finalLang = response.languages[0];
    return finalLang.languageCode;
  }

  private static async textToSpeech(text: string, langCode: string) {
    const [responseG] = await ttsClient.synthesizeSpeech({
      input: { text },
      // voice: { languageCode: await GoogleManager.languageDetection(text) },
      voice: { languageCode: langCode },
      audioConfig: { audioEncoding: 'MP3' },
    });
    const audioRes = responseG.audioContent;

    return audioRes;
  }

  static async saveTTSFile(
    filePath: string,
    fileName: string,
    text: string,
    langCode: string,
    cacheFileName: string
  ) {
    let isCached = false;

    const cachePath = path.join(filePath, cacheFileName);
    const cacheExists = await fs.pathExists(cachePath);
    if (cacheExists) {
      const cacheJson = await fs.readJson(cachePath);
      if (cacheJson.text === text && cacheJson.langCode === langCode) {
        isCached = true;
      }
    }

    if (isCached) {
      LogManager.success('Already has cached version of ' + fileName);
      return;
    } else {
      LogManager.log(
        'Not cached, using Google API ' +
          fileName +
          '  (' +
          text.length +
          ' letters)'
      );
    }

    const tmpFileName = path.join(
      filePath,
      fileName.split('.')[0] + '_tmp.' + fileName.split('.')[1]
    );
    const finalName = path.join(filePath, fileName);

    const audioData = await GoogleManager.textToSpeech(text, langCode);
    const writeFile = util.promisify(fsn.writeFile);
    await writeFile(tmpFileName, audioData, 'binary');

    //  -ar 16000? 32000?
    await system(`ffmpeg -y -i ${tmpFileName} ${finalName}`);

    await fs.remove(tmpFileName);

    await fs.writeJson(cachePath, {
      text,
      langCode,
    });
  }
}
