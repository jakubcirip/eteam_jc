import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('hr_email_templates_catalog', (table) => {
    table.increments();

    table.string('name', 512).notNullable();

    table.string('cat_id', 128).notNullable();

    table.integer('plan_id').notNullable();

    table.integer('likes').notNullable();
    table.integer('downloads').notNullable();

    table.text('desc', 'longtext').notNullable();
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<any> {
  knex.schema.dropTable('hr_email_templates_catalog');
}
