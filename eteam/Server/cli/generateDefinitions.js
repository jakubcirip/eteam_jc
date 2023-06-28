const path = require('path');
const fs = require('fs');

const folder = path.join(__dirname, '../swagger/models');

const definitions = {};

let total = 0;
let finished = 0;

fs.readdir(folder, (err, files) => {
  if (err) {
    throw err;
  }

  files.forEach((file) => {
    if (file.endsWith('.json')) {
      total++;

      fs.readFile(path.join(folder, file), (err, buffer) => {
        if (err) {
          throw err;
        }

        const json = JSON.parse(buffer.toString());

        Object.keys(json).forEach((key) => {
          definitions[key] = {
            $ref: '~/models/' + file + '#/' + key,
          };
        });

        finished++;
        console.log(file + ' Finished [' + finished + '/' + total + ']');

        if (finished >= total) {
          console.log('All Finished, saving file');

          const defPath = path.join(
            __dirname,
            '../swagger/defaults/definitions.json'
          );
          fs.writeFile(
            defPath,
            JSON.stringify(definitions, null, 4),
            (err, data) => {
              if (err) {
                throw err;
              }

              console.log('File saved');
            }
          );
        }
      });
    }
  });
});
