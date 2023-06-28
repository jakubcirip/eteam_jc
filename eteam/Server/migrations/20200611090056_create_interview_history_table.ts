import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('division_intwerview_history', (table) => {
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

    table
      .integer('hr_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('hrs');

    table
      .integer('int_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('job_interviews');

    table.float('tokens_spent').notNullable();

    table.integer('plan_used').notNullable();
    table.integer('candidates_amount').notNullable();

    table.timestamp('started_at').notNullable();
    table.timestamp('ended_at').nullable();

    table.string('status', 32).notNullable();

    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<any> {
  knex.schema.dropTable('division_intwerview_history');
}
