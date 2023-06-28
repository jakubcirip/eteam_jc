import * as fs from "fs";
import * as path from "path";
import * as fsExtra from "fs-extra";

const imagemin = require("imagemin");
const imageminPngquant = require("imagemin-pngquant");

const processFile = (folder, file) => {
  return new Promise(async p => {
    const f = path.join(__dirname, "../small", folder);
    const imgPath = path.join(f, file);

    const files = await imagemin([imgPath], {
      plugins: [
        imageminPngquant({
          quality: [0.5, 0.6]
        })
      ]
    });

    await fsExtra.ensureDir(path.join("small-compressed", folder));

    fs.writeFileSync(
      path.join("small-compressed", folder, file),
      files[0].data
    );

    p();
  });
};

const processFolder = async source => {
  const folders = fs
    .readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory());

  for (const dirent of folders) {
    console.log("Processing folder " + dirent.name);
    const folder = path.join(__dirname, "../small", dirent.name);
    const files = fs.readdirSync(folder).filter(f => f.endsWith(".png"));
    console.log("Processing " + files.length + " files");

    for (const file of files) {
      console.log("Processing file " + file);
      await processFile(dirent.name, file);
    }
  }
};

processFolder(path.join(__dirname, "../small"));
