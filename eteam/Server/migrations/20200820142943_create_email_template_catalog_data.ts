import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('hr_form_templates_catalog_data', (table) => {
    table.increments();

    table
      .integer('catalog_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('hr_form_templates_catalog');

    table.string('name').notNullable();
    table.string('lang_code').notNullable();
    table.text('data', 'longtext').notNullable();
  });
}

export async function down(knex: Knex): Promise<any> {
  knex.schema.dropTable('hr_form_templates_catalog_data');
}
