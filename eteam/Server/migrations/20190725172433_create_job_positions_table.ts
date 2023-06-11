import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('job_positions', table => {
    table.increments();

    table
      .integer('company_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('company');

    table
      .integer('division_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('division');

    table.string('name').notNullable();

    table
      .timestamp('created_at')
      .notNullable()
      .defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<any> {
  knex.schema.dropTable('job_positions');
}
