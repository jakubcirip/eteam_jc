import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('division', table => {
    table.increments();
    table
      .integer('company_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('company');
    table.string('name').notNullable();
    table.string('tag').notNullable();
    table.string('mail_pass').notNullable();
    table
      .timestamp('created_at')
      .notNullable()
      .defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<any> {
  knex.schema.dropTable('division');
}
