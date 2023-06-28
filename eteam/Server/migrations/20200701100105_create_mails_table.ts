import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('mails', (table) => {
    table.increments();
    table.string('email').notNullable();
    table.integer('attempt').notNullable().defaultTo(1);
    table.string('type').notNullable();
    table.text('data', 'longtext').notNullable();
    table.boolean('success').defaultTo(false);

    table
      .integer('hr_email_id')
      .unsigned()
      .nullable()
      .references('id')
      .inTable('hr_emails');

    table
      .integer('division_sender_id')
      .unsigned()
      .nullable()
      .references('id')
      .inTable('division');
  });
}

export async function down(knex: Knex): Promise<any> {
  knex.schema.dropTable('mails');
}
