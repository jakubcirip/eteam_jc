import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('medals', (table) => {
    table.increments();
    table.string('tag', 512).notNullable();
    table.string('type', 512).notNullable();
    table.integer('plan_id').notNullable();
    table.boolean('is_global').notNullable();
    table.integer('default_weight').notNullable();
    table.boolean('is_countable').notNullable();
  });
}

export async function down(knex: Knex): Promise<any> {
  knex.schema.dropTable('medals');
}
