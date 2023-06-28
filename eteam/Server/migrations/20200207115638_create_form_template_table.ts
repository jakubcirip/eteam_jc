import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('job_positions_forms_templates', table => {
    table.increments();

    table.string('name').notNullable();

    table.text('data', 'longtext').notNullable();

    table
      .timestamp('created_at')
      .notNullable()
      .defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<any> {
  knex.schema.dropTable('job_positions_forms_templates');
}
