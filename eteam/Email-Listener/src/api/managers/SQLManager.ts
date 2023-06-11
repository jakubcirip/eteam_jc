import * as knexConfig from '../../../knexfile.js';
import * as Knex from 'knex';

export class SQLManager {
  static knex: Knex;

  private static i: SQLManager;

  static getInstance(): SQLManager {
    if (!SQLManager.i) {
      SQLManager.i = new SQLManager();
    }

    return SQLManager.i;
  }

  constructor() {
    SQLManager.knex = Knex(knexConfig.development);
  }
}
