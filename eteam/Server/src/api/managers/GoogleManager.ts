import * as fs from 'fs-extra';
import * as fsn from 'fs';
import * as path from 'path';
import * as util from 'util';
const system = require('system-commands');
import * as uuidv4 from 'uuid/v4';

import * as ffmpeg from 'ffmpeg';
import { TextToSpeechClient } from '@google-cloud/text-to-speech';
import { TranslationServiceClient } from '@google-cloud/translate';
import { ImageAnnotatorClient } from '@google-cloud/vision';
import { SpeechClient } from '@google-cloud/speech';
import { LogManager } from './LogManager';
import { SQLManager } from './SQLManager';
import { TableJobPositionsForms, TableJobInterviews } from '../models/dbTypes';
import { Error500 } from '../helpers/errors';

const ttsClient = new TextToSpeechClient();
const sttClient = new SpeechClient();
const translateClient = new TranslationServiceClient();
const faceReconClient = new ImageAnnotatorClient();

export class GoogleManager {
  static async prepareFormTTS(req: any, intId: number, formId: number) {
    const formData = await SQLManager.typedKnex
      .query(TableJobPositionsForms)
      .select((s) => [s.data])
      .where((s) => s.id, formId)
      .getSingleOrNull();

    if (!formData) {
      throw Error500(req, __('GoogleManager.prepareFormTTS.cantGetFormData'));
    }

    const intData = await SQLManager.typedKnex
      .query(TableJobInterviews)
      .select((s) => [s.tag])
      .where((s) => s.id, intId)
      .getSingleOrNull();

    if (!intData) {
      throw Error500(req, __('GoogleManager.prepareFormTTS.cantGetIntData'));
    }

    const ttsFolder = path.join(process.env.dirname, '../private/fm/tts/');

    await fs.ensureDir(ttsFolder);

    const formJson = JSON.parse(formData.data);

    await Promise.all(
      formJson.pairs.map(async (pair) => {
        const qType = pair.q.type.id;

        if (qType === 'text_question') {
          const qLang = pair.q.data.find(
            (d) => d.data.type === 'question_text_language'
          ).value;
          const qText = pair.q.data.find(
            (d) => d.data.type === 'question_text_message'
          ).value;

          const fileName = `${pair.uuid}_q.mp3`;
          const cacheFileName = `${pair.uuid}_data.json`;
          await GoogleManager.saveTTSFile(
            ttsFolder,
            fileName,
            qText,
            qLang,
            cacheFileName
          );
        } else if (
          qType === 'mp3_question' ||
          qType === 'mp4_question' ||
          qType === 'image_question'
        ) {
          const type =
            qType === 'mp3_question'
              ? 'mp3'
              : qType === 'mp4_question'
              ? 'mp4'
              : 'image';

          const qLangBefore = pair.q.data.find(
            (d) => d.data.type === 'question_' + type + '_beforetextlang'
          ).value;
          const qTextBefore = pair.q.data.find(
            (d) => d.data.type === 'question_' + type + '_beforetext'
          ).value;

          const qLangAfter = pair.q.data.find(
            (d) => d.data.type === 'question_' + type + '_aftertextlang'
          ).value;
          const qTextAfter = pair.q.data.find(
            (d) => d.data.type === 'question_' + type + '_aftertext'
          ).value;

          const fileNameBefore = `${pair.uuid}_q_before.mp3`;
          const fileNameAfter = `${pair.uuid}_q_after.mp3`;

          const cacheFileNameBefore = `${pair.uuid}_before_data.json`;
          const cacheFileNameAfter = `${pair.uuid}_after_data.json`;

          await Promise.all([
            GoogleManager.saveTTSFile(
              ttsFolder,
              fileNameBefore,
              qTextBefore,
              qLangBefore,
              cacheFileNameBefore
            ),

            GoogleManager.saveTTSFile(
              ttsFolder,
              fileNameAfter,
              qTextAfter,
              qLangAfter,
              cacheFileNameAfter
            ),
          ]);
        }
      })
    );
  }

  private static async languageDetection(text: string) {
    const location = 'global';
    const request = {
      parent: `projects/${sttClient.getProjectId()}/locations/${location}`,
      content: text,
    };

    LogManager.log('API LanguageDetection');
    const [response] = await translateClient.detectLanguage(request);
    LogManager.log('API LanguageDetection 2');
    response.languages.sort((a, b) => (a.confidence >= b.confidence ? -1 : 1));
    const finalLang = response.languages[0];
    return finalLang.languageCode;
  }

  private static async textToSpeech(text: string, langCode: string) {
    LogManager.log('API TextToSpeech ' + langCode + text);
    const [responseG] = await ttsClient.synthesizeSpeech({
      input: { text },
      // voice: { languageCode: await GoogleManager.languageDetection(text) },
      voice: { languageCode: langCode },
      audioConfig: { audioEncoding: 'MP3' },
    });
    LogManager.log('API TextToSpeech 2');
    const audioRes = responseG.audioContent;

    return audioRes;
  }

  private static async speechToText(audioBytes: string, langCode: string) {
    const [response] = await sttClient.recognize({
      audio: {
        content: audioBytes,
      },
      config: {
        // @ts-ignore
        encoding: 'MP3',
        sampleRateHertz: 32000,
        languageCode: langCode,
        enableWordTimeOffsets: true,
        enableAutomaticPunctuation: true,
      },
    });
    return response;
  }

  private static async faceRecodnition(fileName: string) {
    const [result] = await faceReconClient.faceDetection(fileName);
    return result;
  }

  public static async readSTTFile(path: string, langCode: string) {
    const file = await fs.readFile(path);
    const audioBytes = file.toString('base64');
    const sttRes = await GoogleManager.speechToText(audioBytes, langCode);
    return sttRes;
  }

  public static async readFaceEmotions(pathStr: string) {
    const uuid = uuidv4();

    const tempFolder = path.join(
      process.env.dirname,
      '../temp/emotionRecon/' + uuid
    );
    await fs.ensureDir(tempFolder);

    const video = await new ffmpeg(pathStr);
    const images: string[] = await new Promise((res, rej) => {
      video.fnExtractFrameToJPG(
        tempFolder,
        {
          every_n_seconds: 1,
        },
        (err, f: any) => {
          if (err) {
            rej(err);
            return;
          } else {
            res(f);
          }
        }
      );
    });

    const allEmotions = [];

    await Promise.all(
      images.map(async (image) => {
        const emoRes = await GoogleManager.faceRecodnition(image);
        allEmotions.push(emoRes);
      })
    );

    await fs.remove(tempFolder);

    const parseEmotion = (emotion: any): number => {
      if (
        emotion === 0 ||
        emotion === 1 ||
        emotion === 2 ||
        emotion === 3 ||
        emotion === 4 ||
        emotion === 5
      ) {
        return emotion;
      }

      if (emotion === 'UNKNOWN') {
        return 0;
      }

      if (emotion === 'VERY_UNLIKELY') {
        return 1;
      }

      if (emotion === 'UNLIKELY') {
        return 2;
      }

      if (emotion === 'POSSIBLE') {
        return 3;
      }

      if (emotion === 'LIKELY') {
        return 4;
      }

      if (emotion === 'VERY_LIKELY') {
        return 5;
      }

      return 0;
    };

    const dataObj = {
      joy: 0,
      sorrow: 0,
      anger: 0,
      surprise: 0,
      underExposed: 0,
      blurred: 0,
      headwear: 0,
    };

    allEmotions.map((emo) => {
      if (!emo || !emo.faceAnnotations || !emo.faceAnnotations[0]) {
        return;
      }

      dataObj.joy += parseEmotion(emo.faceAnnotations[0].joyLikelihood);
      dataObj.sorrow += parseEmotion(emo.faceAnnotations[0].sorrowLikelihood);
      dataObj.anger += parseEmotion(emo.faceAnnotations[0].angerLikelihood);
      dataObj.surprise += parseEmotion(
        emo.faceAnnotations[0].surpriseLikelihood
      );
      dataObj.underExposed += parseEmotion(
        emo.faceAnnotations[0].underExposedLikelihood
      );
      dataObj.blurred += parseEmotion(emo.faceAnnotations[0].blurredLikelihood);
      dataObj.headwear += parseEmotion(
        emo.faceAnnotations[0].headwearLikelihood
      );
    });

    return dataObj;
  }

  private static async saveTTSFile(
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
      LogManager.info('Already has cached version of ' + fileName);
      return;
    } else {
      LogManager.info('Not cached, using Google API ' + fileName);
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
    await system(`ffmpeg -i ${tmpFileName} ${finalName}`);

    await fs.remove(tmpFileName);

    await fs.writeJson(cachePath, {
      text,
      langCode,
    });
  }

  public static getLangCodes(): { code: string; name: string }[] {
    const languages = [
      { code: 'af-ZA', name: 'Afrikaans' },
      { code: 'sq', name: 'Albanian' },
      { code: 'ar-AE', name: 'Arabic' },
      { code: 'hy', name: 'Armenian' },
      { code: 'bn-BD', name: 'Bengali (Bangladesh)' },
      { code: 'bn-IN', name: 'Bengali (India)' },
      { code: 'bs', name: 'Bosnian' },
      { code: 'my', name: 'Burmese (Myanmar)' },
      { code: 'ca-ES', name: 'Catalan' },
      { code: 'cmn-Hant-TW', name: 'Chinese' },
      { code: 'hr-HR', name: 'Croatian' },
      { code: 'cs-CZ', name: 'Czech' },
      { code: 'da-DK', name: 'Danish' },
      { code: 'nl-NL', name: 'Dutch' },
      { code: 'en-AU', name: 'English (Australia)' },
      { code: 'en-GB', name: 'English (United Kingdom)' },
      { code: 'en-US', name: 'English (United States)' },
      { code: 'eo', name: 'Esperanto' },
      { code: 'fil-PH', name: 'Filipino' },
      { code: 'fi-FI', name: 'Finnish' },
      { code: 'fr-FR', name: 'French' },
      { code: 'fr-CA', name: 'French (Canada)' },
      { code: 'de-DE', name: 'German' },
      { code: 'el-GR', name: 'Greek' },
      { code: 'hi-IN', name: 'Hindi' },
      { code: 'hu-HU', name: 'Hungarian' },
      { code: 'is-IS', name: 'Icelandic' },
      { code: 'id-ID', name: 'Indonesian' },
      { code: 'it-IT', name: 'Italian' },
      { code: 'ja-JP', name: 'Japanese (Japan)' },
      { code: 'km', name: 'Khmer' },
      { code: 'ko-KR', name: 'Korean' },
      { code: 'la', name: 'Latin' },
      { code: 'lv', name: 'Latvian' },
      { code: 'mk', name: 'Macedonian' },
      { code: 'ne', name: 'Nepali' },
      { code: 'nb-NO', name: 'Norwegian' },
      { code: 'pl-PL', name: 'Polish' },
      { code: 'pt-BR', name: 'Portuguese' },
      { code: 'ro-RO', name: 'Romanian' },
      { code: 'ru-RU', name: 'Russian' },
      { code: 'sr-RS', name: 'Serbian' },
      { code: 'si', name: 'Sinhala' },
      { code: 'sk-SK', name: 'Slovak' },
      { code: 'es-MX', name: 'Spanish (Mexico)' },
      { code: 'es-ES', name: 'Spanish (Spain)' },
      { code: 'sw', name: 'Swahili' },
      { code: 'sv-SE', name: 'Swedish' },
      { code: 'ta', name: 'Tamil' },
      { code: 'te', name: 'Telugu' },
      { code: 'th-TH', name: 'Thai' },
      { code: 'tr-TR', name: 'Turkish' },
      { code: 'uk-UA', name: 'Ukrainian' },
      { code: 'vi-VN', name: 'Vietnamese' },
      { code: 'cy', name: 'Welsh' },
    ];

    return languages;
  }
}
