import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('job_positions_forms', (table) => {
    table.increments();

    table
      .integer('job_position_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('job_positions');

    table
      .integer('division_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('division');

    table.string('name').notNullable();

    table.string('lang_code').notNullable();

    table.text('data', 'longtext').notNullable();

    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<any> {
  knex.schema.dropTable('job_positions_forms');
}
