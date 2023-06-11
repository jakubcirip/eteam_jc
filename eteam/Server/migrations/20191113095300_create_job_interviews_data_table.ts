import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('job_interviews_data', table => {
    table.increments();

    table
      .integer('int_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('job_interviews');

    table.string('type').notNullable();

    table
      .timestamp('date')
      .nullable()
      .defaultTo(null);

    table
      .integer('mail_id')
      .unsigned()
      .nullable()
      .references('id')
      .inTable('hr_emails');

    table
      .timestamp('created_at')
      .notNullable()
      .defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<any> {
  knex.schema.dropTable('job_interviews_data');
}
