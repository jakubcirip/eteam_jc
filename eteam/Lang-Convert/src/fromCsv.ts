import * as fs from 'fs-extra';
import * as debug from 'debug';
import * as path from 'path';
import * as csvtojson from 'csvtojson';

const setValue = (obj: any, k: string, v: string) => {
  if (k.includes('.')) {
    const kArr = k.split('.');
    const firstK = kArr[0];
    kArr.shift();

    if (!obj[firstK]) {
      obj[firstK] = {};
    }

    setValue(obj[firstK], kArr.join('.'), v);
  } else {
    obj[k] = v;
  }

  return obj;
};

const run = async () => {
  debug('log')('Reading file..');

  const filePath = path.join(__dirname, '../temp/fromCsv/data.csv');

  const jsonArray = await csvtojson().fromFile(filePath);

  const langs = Object.keys(jsonArray[0]);
  langs.shift();

  debug('log')('Found ' + langs.length + ' languages');

  const langsObj = langs.map(l => {
    let obj = {};

    jsonArray.forEach(i => {
      const k = i.field1;
      const v = i[l];

      obj = setValue(obj, k, v);
    });

    return {
      lang: l,
      val: JSON.stringify(obj),
    };
  });

  const writePromises = langsObj.map(async data => {
    const jsonFolderPath = path.join(__dirname, '../temp/fromCsv/i18n');

    await fs.ensureDir(jsonFolderPath);

    const jsonFilePath = path.join(jsonFolderPath, data.lang + '.json');

    await fs.writeFile(jsonFilePath, data.val);
  });

  await Promise.all(writePromises);

  debug('success')('i18 Created');
};

run();
