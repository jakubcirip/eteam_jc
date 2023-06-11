var Jimp = require("jimp");

// Create "in", "out" folders
// Put export form after effects into "in" folder
// Run script
// In out you should have gifs

import * as fs from "fs";
import * as path from "path";

const processFile = (folder, file) => {
  return new Promise(p => {
    const f = path.join(__dirname, "../in", folder);
    Jimp.read(path.join(f, file), (err, img) => {
      if (err) throw err;
      img.resize(80, 80).write(path.join("small", folder, file));

      p();
    });
  });
};

const processFolder = async source => {
  const folders = fs
    .readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory());

  for (const dirent of folders) {
    console.log("Processing folder " + dirent.name);
    const folder = path.join(__dirname, "../in", dirent.name);
    const files = fs.readdirSync(folder).filter(f => f.endsWith(".png"));
    console.log("Processing " + files.length + " files");

    for (const file of files) {
      console.log("Processing file " + file);
      await processFile(dirent.name, file);
    }
  }
};

processFolder(path.join(__dirname, "../in"));
