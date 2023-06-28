import { SQLManager } from '../src/api/managers/SQLManager';
import { LogManager } from '../src/api/managers/LogManager';

import * as dotenv from 'dotenv';

dotenv.config();

const run = async () => {
  LogManager.log('Connecting to DB ..');
  SQLManager.getInstance();
  LogManager.log('Droping DB ..');
  await SQLManager.knex.raw('DROP DATABASE ' + process.env.MYSQL_DATABASE);
  LogManager.log('Creating DB ..');
  await SQLManager.knex.raw('CREATE DATABASE ' + process.env.MYSQL_DATABASE);
  LogManager.success('Done');
  process.exit(0);
};

run();
