import * as fs from 'fs-extra';
import * as path from 'path';

const swaggerPath = path.join(__dirname, '../temp/swagger');

const processFile = async (file) => {
  const data = await fs.readFile(file);
  const str = data.toString();

  if (!str.includes('~')) {
    return;
  }

  const fileFolder = path.dirname(file);
  let relativePath = path.relative(fileFolder, swaggerPath);

  if (fileFolder === swaggerPath) {
    relativePath = '.';
  }

  const newStr = str.split('~').join(relativePath);
  await fs.writeFile(file, newStr);
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
      walk(file);
      next();
    } else {
      await processFile(file);
      next();
    }
  };

  await next();
};

walk(swaggerPath);
