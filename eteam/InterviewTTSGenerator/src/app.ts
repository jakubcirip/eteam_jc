import * as dotenv from 'dotenv';
dotenv.config();

import * as path from 'path';
import * as fs from 'fs-extra';
import { promisify } from 'util';
import { LogManager } from './LogManager';
import { GoogleManager } from './GoogleManager';

const readDirAsync: (path: string) => Promise<string[]> = promisify(fs.readdir);

const langCode = 'en-GB';

const emojiPhraseKeys = [
  'emojiIntroduction.title',
  'prelog.title',
  'formular.title',
  'hardware.title',
  'hardwareTest.title',
  'introSummary.title',
  'interviewIntro.title',
  'interview.questions.text',
  'interview.answers.type',
  'interview.selfreview.text',
  'interview.selfreview.after',
  'interview.questions.mp3.text',
  'interview.questions.mp3.textRepeat',
  'interview.questions.mp4.text',
  'interview.questions.mp4.textRepeat',
  'interview.answers.selectMany',
  'interview.answers.selectOne',
  'interview.answers.prepareTime',
  'interview.answers.speak',
  'interviewIntro.lastQuestion',
  'interviewIntro.finish',
  'interviewIntro.finishPreview',
  'interview.questions.img.text'
];

const langFolderPath = path.join(
  __dirname,
  '../../AngularInterviewRefactor/src/assets/i18n/'
);

const outputFolderPath = path.join(
  __dirname,
  '../../AngularInterviewRefactor/src/assets/tts/'
);

(async () => {
  const files = await readDirAsync(langFolderPath);
  const langFiles = files.filter((f) => f.endsWith('.json'));

  LogManager.log('Found ' + langFiles.length + ' language/s');

  for (const langFileName of langFiles) {
    LogManager.log('Loading ' + langFileName);

    const langName = langFileName.split('.json')[0];
    const langFileJson = JSON.parse(
      (await fs.readFile(path.join(langFolderPath, langFileName))).toString()
    );

    for (const phraseKey of emojiPhraseKeys) {
      let sentence;

      if (phraseKey.includes('.')) {
        const chunks = phraseKey.split('.');
        let containsErrors = false;
        let currentObj = langFileJson;

        for (const chunk of chunks) {
          if (!currentObj[chunk]) {
            containsErrors = true;
            break;
          }

          currentObj = currentObj[chunk];
        }

        if (!containsErrors) {
          sentence = currentObj;
        }
      } else {
        sentence = langFileJson[phraseKey];
      }

      if (!sentence) {
        LogManager.warning('Could not find: ' + phraseKey);
        continue;
      }

      LogManager.info(
        'Language Detection for ' +
          phraseKey +
          ' with ' +
          sentence.split(' ').length +
          ' word/s'
      );

      const outPath = path.join(outputFolderPath, langName);
      await fs.ensureDir(outPath);
      const outName = phraseKey.split('.').join('_');

      // const langCode = await GoogleManager.languageDetection(
      //   sentence,
      //   path.join(outPath, outName + '_cache.json')
      // );
      LogManager.info('Language: ' + langCode + ', translating ...');

      await GoogleManager.saveTTSFile(
        outPath,
        outName + '.mp3',
        sentence,
        langCode,
        outName + '_cache.json'
      );
    }
  }
})()
  .then(() => {
    LogManager.success('Finished.');
  })
  .catch((err) => {
    LogManager.log(err);
  });
