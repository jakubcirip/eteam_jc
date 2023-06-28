import * as knexConfig from '../../../knexfile.js';
import * as Knex from 'knex';
import { __ } from 'i18n';

export class SQLManager {
  static knex: Knex;
  static mailKnex: Knex;

  private static i: SQLManager;

  static getInstance(): SQLManager {
    if (!SQLManager.i) {
      SQLManager.i = new SQLManager();
    }

    return SQLManager.i;
  }

  constructor() {
    SQLManager.knex = Knex(knexConfig.development);
    SQLManager.mailKnex = Knex(knexConfig.development.mail);
    this.setup();
  }

  async setup() {
    await SQLManager.knex.raw('SET NAMES utf8mb4');
    await SQLManager.mailKnex.raw('SET NAMES utf8mb4');
  }
}
