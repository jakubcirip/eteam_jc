const i18n = require('i18n-extract');
var glob = require('glob');
var fs = require('fs');
var path = require('path');

glob('src/**/*.ts', {}, function (err, files) {
  if (err) {
    throw err;
  }

  const parsedKeys = [];

  for (const file of files) {
    if (file.endsWith('dbTypes.ts')) {
      continue;
    }

    const fileContent = fs.readFileSync(file).toString();

    const keys = i18n.extractFromCode(fileContent, {
      marker: '$localize',
      parser: 'typescript',
    });

    for (const key of keys) {
      const parsedKey = key.key;
      const regexMatches = /^:(.+)@@(.+):(.+)/g.exec(parsedKey);
      const comment = regexMatches[1];
      const id = regexMatches[2];
      const translation = regexMatches[3];

      const existingKey = parsedKeys.find((k) => k.id === id);

      const keyLoc = {
        ...key.loc,
        file,
      };

      if (!existingKey) {
        parsedKeys.push({
          id,
          comment,
          translation,
          locs: [keyLoc],
        });
      } else {
        existingKey.locs.push(keyLoc);
      }
    }
  }

  const localeObj = {
    '@@locale': 'en-SK',
  };

  for (const parsedKey of parsedKeys) {
    localeObj[parsedKey.id] = parsedKey.translation;
    localeObj['@' + parsedKey.id] = {
      description: parsedKey.comment,
      'x-locations': parsedKey.locs.map((l) => {
        return {
          file: l.file,
          start: {
            line: l.start.line,
            column: l.start.column,
          },
          end: {
            line: l.end.line,
            column: l.end.column,
          },
        };
      }),
    };
  }

  // localeObj
  // precitaj aktualny preklad.. zachovaj co je, vymaz co uz neni a pridaj co este neni

  const langFilePath = path.join(__dirname, '../locale/messages.en-SK.json');
  if (!fs.existsSync(langFilePath)) {
    fs.writeFileSync(langFilePath, JSON.stringify(localeObj, null, 2));
  } else {
    const currentJson = JSON.parse(fs.readFileSync(langFilePath).toString());

    Object.keys(currentJson).forEach((k) => {
      if (k.startsWith('@')) {
        return;
      }

      if (localeObj[k]) {
        localeObj[k] = currentJson[k];
      }
    });

    fs.writeFileSync(langFilePath, JSON.stringify(localeObj, null, 2));
  }
});
