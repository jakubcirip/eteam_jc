import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('job_interviews_people', (table) => {
    table.increments();

    table
      .integer('division_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('division');

    table.string('name', 128).notNullable();
    table.string('tag', 128).notNullable();
    table.string('email', 128).notNullable();

    table.string('type', 32).notNullable();

    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<any> {
  knex.schema.dropTable('job_interviews_people');
}
