import * as dotenv from 'dotenv';
process.env.dirname = __dirname;
dotenv.config();

import { LangManager } from './api/managers/LangManager';
import { API } from './api/api';
import { LogManager } from './api/managers/LogManager';

(async () => {
  await LangManager.init(process.env.dirname);

  // const msg =
  //   ':app - test language@@spEBQaf:{gender, select, male{He} female{She} other{They}} read {{ amount }} {amount, plural, =1{book} other{books}}';

  // console.log(
  //   $localize(msg, 'en', {
  //     amount: 5,
  //     gender: 'male',
  //   })
  // );

  // console.log(
  //   $localize(msg, 'en', {
  //     amount: 1,
  //     gender: 'male',
  //   })
  // );

  // console.log(
  //   $localize(msg, 'en', {
  //     amount: 3,
  //     gender: 'female',
  //   })
  // );

  // console.log(
  //   $localize(msg, 'en', {
  //     amount: 8,
  //     gender: 'none',
  //   })
  // );

  API({
    appRoot: process.env.dirname,
  });
})()
  .then(() => {
    LogManager.info('Started');
  })
  .catch((err) => {
    LogManager.error('Error starting!');
    console.log(err);
  });

// GoogleManager.readSTTFile(path.join(__dirname, '../temp/en.mp3'), 'en-GB').then(
//   (data) => {
//     console.log('EN');
//     console.log(JSON.stringify(data));
//     console.log('------');
//   }
// );

// GoogleManager.readSTTFile(path.join(__dirname, '../temp/ru.mp3'), 'ru-RU').then(
//   (data) => {
//     console.log('RU');
//     console.log(JSON.stringify(data));
//     console.log('------');
//   }
// );

// GoogleManager.readSTTFile(path.join(__dirname, '../temp/fr.mp3'), 'fr-FR').then(
//   (data) => {
//     console.log('FR');
//     console.log(JSON.stringify(data));
//     console.log('------');
//   }
// );
