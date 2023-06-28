import * as dotenv from 'dotenv';
import * as i18n from 'i18n';
import * as path from 'path';

import { API } from './api/api';

dotenv.config();

process.env.dirname = __dirname;

i18n.configure({
  locales: ['en'],
  directory: path.join(__dirname, '../locales'),
  defaultLocale: 'en',
});

API({
  appRoot: __dirname,
});
