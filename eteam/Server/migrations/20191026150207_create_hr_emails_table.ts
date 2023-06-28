import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('hr_emails', (table) => {
    table.increments();

    table
      .integer('division_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('division');
    table.string('name').notNullable();
    table.string('type');
    table.string('subject');
    table.text('content', 'longtext');
    table.text('attachments', 'longtext').notNullable().defaultTo('[]');
  });
}

export async function down(knex: Knex): Promise<any> {
  knex.schema.dropTable('hr_emails');
}
