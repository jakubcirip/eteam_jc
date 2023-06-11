import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('hr_email_templates_catalog_data', (table) => {
    table.increments();

    table
      .integer('catalog_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('hr_email_templates_catalog');

    table.string('type', 128).notNullable();

    table.string('subject', 512).notNullable();

    table.text('email', 'longtext').notNullable();
    table.text('attachments', 'longtext').notNullable().defaultTo('[]');
  });
}

export async function down(knex: Knex): Promise<any> {
  knex.schema.dropTable('hr_email_templates_catalog_data');
}
