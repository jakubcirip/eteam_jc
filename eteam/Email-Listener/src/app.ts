import * as dotenv from 'dotenv';

import { API } from './api/api';

dotenv.config();

API({
  appRoot: __dirname,
});
