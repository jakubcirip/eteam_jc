import * as fs from 'fs-extra';
import * as path from 'path';

const action = process.env.GENLANG_ACTION;

const langs = ['en', 'sk', 'cs'];

let langGenCode = `
import * as i18n from 'i18n';
import * as path from 'path';

declare const __: any;

i18n.configure({
    locales: ${JSON.stringify(langs)},
    directory: path.join(__dirname, '../', 'i18n'),
    defaultLocale: 'en',
    updateFiles: true,
    syncFiles: true,
    autoReload: false,
    objectNotation: true,
    register: global,
});


`;

const srcPath = path.join(__dirname, '../src');

const keysArr = [];

const processFile = async (file) => {
  const data = await fs.readFile(file);

  let str = data.toString();

  if (!str.includes('__')) {
    return;
  }

  str = data
    .toString()
    .split('\r')
    .join('')
    .split('\n')
    .join('')
    .split(' ')
    .join('');

  const re = /__\(['|"]([a-zA-Z0-9\-\.\_]+)['|"]/g;
  let m;
  const s = str;

  // if (
  //   file ===
  //   '/Users/meldiron/Documents/GitHub/fullstack-boilerplate/Server/src/api/services/DivisionService.ts'
  // ) {
  //   console.log(s);
  //   process.exit();
  // }

  let i = 0;

  while ((m = re.exec(s)) !== null) {
    keysArr.push({
      key: m[1],
      obj: m[2],
      file,
    });
  }
  return;
};

const walk = async (dir) => {
  const list = await fs.readdir(dir);
  let i = 0;

  const next = async () => {
    let file = list[i];
    i++;

    if (!file) {
      return;
    }

    file = dir + '/' + file;

    const stat = await fs.stat(file);

    if (stat && stat.isDirectory()) {
      await walk(file);
      await next();
    } else {
      await processFile(file);
      await next();
    }
  };

  await next();
};

walk(srcPath).then(async () => {
  const usedKeys = [];
  const keysWithParams = [];

  keysArr.forEach((k) => {
    if (usedKeys.includes(k.key)) {
      return;
    }

    usedKeys.push(k.key);
    langGenCode += `__('${k.key}');\n`;

    if (k.obj) {
      keysWithParams.push(k);
    }
  });

  if (action === 'code') {
    console.log(langGenCode);
    process.exit();
  } else if (action === 'parameters') {
    if (keysWithParams.length > 0) {
      const parsedObj = keysWithParams.map((par) => {
        const paramsFinalArr = [];

        const parMsg = par.obj.substr(1);

        let newPar = '';

        for (const p of parMsg) {
          newPar += p;

          if (p === '}') {
            break;
          }
        }

        newPar = newPar.substr(1);
        newPar = newPar.slice(0, -1);

        if (newPar.includes(',')) {
          const parArr = newPar.split(',').filter((i) => {
            if (i) {
              return true;
            }

            return false;
          });

          parArr.forEach((i) => {
            if (i.includes(':')) {
              paramsFinalArr.push(i.split(':')[0]);
            } else {
              paramsFinalArr.push(i);
            }
          });
        }

        return {
          key: par.key,
          params: paramsFinalArr.length === 0 ? null : paramsFinalArr,
        };
      });

      for (const lang of langs) {
        const fileName = path.join(__dirname, '../i18n/' + lang + '.json');
        const fileContent = await fs.readJSON(fileName);

        const newFileContent = { ...fileContent };
        let didEdit = false;

        for (const param of parsedObj) {
          let val = { ...fileContent };

          if (param.key.includes('.')) {
            const keyArr = param.key.split('.');

            for (const keyChunk of keyArr) {
              val = val[keyChunk];
            }
          } else {
            val = val[param.key];
          }

          const oldVal = val;

          if (oldVal === param.key) {
            didEdit = true;

            if (param.key.includes('.')) {
              let obj = newFileContent;
              const keyArr = param.key.split('.');

              let lastKey;

              for (let i = 0; i < keyArr.length; i++) {
                if (i + 1 === keyArr.length) {
                  lastKey = keyArr[i];
                } else {
                  obj = obj[keyArr[i]];
                }
              }

              obj[lastKey] = generateNewValue(param.key, param.params);
            } else {
              newFileContent[param.key] = generateNewValue(
                param.key,
                param.params
              );
            }
          }
        }

        if (didEdit) {
          await fs.writeFile(fileName, JSON.stringify(newFileContent, null, 2));
        }
      }
    }
  }
});

const generateNewValue = (key: string, vals: string[]) => {
  vals = vals.map((v) => {
    return `{${v}}`;
  });
  return `${key} [${vals.join(', ')}]`;
};
