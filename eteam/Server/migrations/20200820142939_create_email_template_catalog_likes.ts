import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('hr_form_templates_catalog_likes', (table) => {
    table.increments();

    table
      .integer('catalog_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('hr_form_templates_catalog');

    table
      .integer('hr_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('hrs');

    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<any> {
  knex.schema.dropTable('hr_form_templates_catalog_likes');
}
