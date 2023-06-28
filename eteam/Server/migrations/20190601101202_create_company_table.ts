import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('company', (table) => {
    table.increments();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.float('tokens').notNullable().defaultTo(100);
    table.string('pass').notNullable();
    table.integer('sub_model').notNullable();
    table.string('domain').notNullable();
    table.string('auth_key');
    table.string('activation_code');
    table.string('reset_pass_at');
    table.string('reset_pass_key');
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<any> {
  knex.schema.dropTable('company');
}
