const fs = require("fs");
const path = require("path");

const langFolder = path.join(__dirname, "../src/locale");

const parseFile = (path) => {
  const json = JSON.parse(fs.readFileSync(path).toString());

  if (json.locale && json.translations) {
    return;
  }

  const data = { ...json };

  const localeArr = path.split(".");
  const locale = localeArr[localeArr.length - 2];

  const newJson = {
    locale,
    translations: data,
  };

  fs.writeFileSync(path, JSON.stringify(newJson, null, 2));
};

fs.readdir(langFolder, (err, files) => {
  files.forEach((file) => {
    if (file.endsWith(".en-SK.json")) {
      return;
    }

    const filePath = path.join(__dirname, "../src/locale", file);
    parseFile(filePath);
  });
});
