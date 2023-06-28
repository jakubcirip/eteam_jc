import * as fs from 'fs-extra';
import * as path from 'path';
import { LogManager } from '../src/api/managers/LogManager';

(async () => {
  LogManager.info('Generating env file ...');

  const envFolder = path.join(__dirname, '../');

  const data = await fs.readFile(path.join(envFolder, '.env'));
  const str = data.toString();

  const lines = str.split('\n');

  const newLines = lines.map((l) => {
    if (!l.includes('=')) {
      return l;
    }

    const lArr = l.split('=');
    return lArr[0] + '=SET_ME';
  });

  const newStr = newLines.join('\n');

  await fs.writeFile(path.join(envFolder, '.env.example'), newStr);

  LogManager.success('Env file generated');
})();
