import * as path from 'path';
import * as glob from 'glob';
import * as fs from 'fs-extra';
import * as handlebars from 'handlebars';
import { LogManager } from './LogManager';
import { Error500 } from '../helpers/errors';

const MessageFormat = require('@messageformat/core');

declare const global: any;

const objectFlatten = function (data) {
  var result = {};
  function recurse(cur, prop) {
    if (Object(cur) !== cur) {
      result[prop] = cur;
    } else if (Array.isArray(cur)) {
      for (var i = 0, l = cur.length; i < l; i++)
        recurse(cur[i], prop + '[' + i + ']');
      if (l == 0) result[prop] = [];
    } else {
      var isEmpty = true;
      for (var p in cur) {
        isEmpty = false;
        recurse(cur[p], prop ? prop + '.' + p : p);
      }
      if (isEmpty && prop) result[prop] = {};
    }
  }
  recurse(data, '');
  return result;
};

export class LangManager {
  static async init(dirName: string): Promise<void> {
    return new Promise((res, rej) => {
      const allTranslations = {};

      const deprecatedTranslations = objectFlatten(
        JSON.parse(
          fs.readFileSync(path.join(dirName, '../i18n/en.json')).toString()
        )
      );

      glob(path.join(dirName, '../locale/**/*.json'), {}, function (
        err,
        files
      ) {
        if (err) {
          rej();
          throw err;
        }

        for (let file of files) {
          const langObj = JSON.parse(fs.readFileSync(file).toString());

          if (!allTranslations[langObj['@@locale']]) {
            const langTmp = {};

            Object.keys(langObj).forEach((k) => {
              if (k.startsWith('@')) {
                return;
              }

              langTmp[k] = langObj[k];
            });

            allTranslations[langObj['@@locale']] = langTmp;
          }
        }

        global.$localize = (
          msg: string,
          lang: string,
          obj?: { [key: string]: string }
        ) => {
          const regexMatches = /^:(.+)@@([a-zA-Z0-9]+):(.+)/g.exec(msg);

          if (!regexMatches) {
            console.log(regexMatches);
            console.log(msg);
          }

          const id = regexMatches[2];

          const langObj = allTranslations[lang ? lang : 'en-SK'];

          let resMsg;

          if (!langObj || !langObj[id]) {
            LogManager.warning('No translation for ' + id);
            resMsg = regexMatches[3];
          } else {
            resMsg = langObj[id];
          }

          const template = handlebars.compile(resMsg);
          resMsg = template(obj ? obj : {});

          const mf = new MessageFormat('en');
          const template2 = mf.compile(resMsg);
          resMsg = template2(obj ? obj : {});
          return resMsg;
        };

        global.__ = (...args) => {
          try {
            const key = args[0];
            const obj = args[1];

            const translation = deprecatedTranslations[key];
            if (obj) {
              const template = handlebars.compile(translation);
              const resMsg = template(obj ? obj : {});

              return resMsg;
            } else {
              return translation;
            }
          } catch (err) {
            LogManager.warning('Deprecated translation for ' + args[0]);
            return args.length > 0 ? args[0] : args;
          }
        };

        res();
      });
    });
  }
}
