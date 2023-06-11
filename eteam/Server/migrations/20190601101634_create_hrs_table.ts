import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('hrs', (table) => {
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

    table.integer('time_tracker').notNullable().defaultTo(0);

    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('pass').nullable().defaultTo(null);

    table.string('activation_code').nullable();

    table.string('auth_key').nullable().defaultTo(null);

    table.string('reset_pass_at');
    table.string('reset_pass_key');

    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<any> {
  knex.schema.dropTable('hrs');
}
