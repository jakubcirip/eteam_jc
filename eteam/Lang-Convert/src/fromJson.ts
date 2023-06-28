import * as fs from 'fs-extra';
import * as debug from 'debug';
import * as path from 'path';

const parseStr = (str: string): string => {
  str = str.split(`"`).join(`\\"`);
  return `"${str}"`;
};

const getByKey = (obj: any, key: string): string => {
  if (key.includes('.')) {
    const keyArr = key.split('.');
    const firstKey = keyArr[0];
    keyArr.shift();

    return getByKey(obj[firstKey], keyArr.join('.'));
  } else {
    return obj[key];
  }
};

const getAllKeys = (obj: any, keys = [], finalKey = ''): string[] => {
  Object.keys(obj).forEach(k => {
    if (typeof obj[k] === 'object') {
      let newFinalKey = finalKey;
      if (!newFinalKey) {
        newFinalKey = k + '.';
      } else {
        newFinalKey = newFinalKey + k + '.';
      }

      keys.push(...getAllKeys(obj[k], [], newFinalKey));
    } else {
      keys.push(finalKey + k);
    }
  });

  return keys;
};

const run = async () => {
  debug('log')('Reading files..');

  const folderPath = path.join(__dirname, '../temp/fromJson/i18n');

  const files = await fs.readdir(folderPath);

  const promises = files.map(async f => {
    const filePath = path.join(folderPath, f);
    const fileContent = (await fs.readFile(filePath)).toString();

    return {
      name: f.split('.json')[0],
      content: JSON.parse(fileContent),
    };
  });

  const langs: any[] = await Promise.all(promises);

  debug('log')('Found ' + langs.length + 'languages');

  const csvArr = [];

  let firstLine = '"",';

  langs.forEach(l => {
    firstLine += parseStr(l.name) + ',';
  });

  firstLine = firstLine.slice(0, -1);
  csvArr.push(firstLine);

  const content = langs[0].content;
  const allKeys = getAllKeys(content);

  debug('log')('Found ' + allKeys.length + 'keys');

  allKeys.forEach(k => {
    let line = '';
    line += parseStr(k) + ',';

    langs.forEach(l => {
      line += parseStr(getByKey(l.content, k)) + ',';
    });

    line = line.slice(0, -1);
    csvArr.push(line);
  });

  const csv = csvArr.join('\n');

  await fs.writeFile(path.join(__dirname, '../temp/fromJson/export.csv'), csv);

  debug('success')('CSV Saved');
};

run();
