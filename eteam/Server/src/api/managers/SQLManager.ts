import * as knexConfig from '../../../knexfile.js';
import * as Knex from 'knex';

import { TypedKnex } from '@wwwouter/typed-knex';

export class SQLManager {
  static knex: Knex;
  static typedKnex: TypedKnex;

  private static i: SQLManager;

  static getInstance(): SQLManager {
    if (!SQLManager.i) {
      SQLManager.i = new SQLManager();
    }

    return SQLManager.i;
  }

  constructor() {
    SQLManager.knex = Knex(knexConfig.development);
    SQLManager.typedKnex = new TypedKnex(SQLManager.knex);
    this.setup();
  }

  async setup() {
    await SQLManager.knex.raw('SET NAMES utf8mb4');
  }
}
