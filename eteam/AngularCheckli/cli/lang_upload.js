const fs = require("fs");
const path = require("path");

const obj = JSON.parse(
  fs
    .readFileSync(path.join(__dirname, "../src/locale/messages.en-SK.json"))
    .toString()
);

Object.keys(obj).forEach((k) => {
  if (!k.startsWith("@")) {
    obj[k] = obj[k].trim();
  }
});

obj["@@locale"] = "en-SK";

fs.writeFileSync(
  path.join(__dirname, "../src/locale/messages.en-SK.json"),
  JSON.stringify(obj, null, 2)
);
