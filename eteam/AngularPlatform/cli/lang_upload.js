const fs = require("fs");
const path = require("path");

const obj = JSON.parse(
  fs
    .readFileSync(path.join(__dirname, "../src/locale/messages.en-SK.json"))
    .toString()
);

Object.keys(obj).forEach(k => {
  if (!k.startsWith("@")) {
    obj[k] = obj[k].trim();

    if (k.length > 10) {
      console.log(
        "Warning: ID is probably too long (" + k + ") for: " + obj[k]
      );
    }
  }
});

obj["@@locale"] = "en-SK";

fs.writeFileSync(
  path.join(__dirname, "../src/locale/messages.en-SK.json"),
  JSON.stringify(obj, null, 2)
);
