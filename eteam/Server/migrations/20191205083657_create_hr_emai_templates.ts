import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('hr_email_templates', table => {
    table.increments();

    table.string('type').notNullable();
    table.text('content', 'longtext').notNullable();
  });
}

export async function down(knex: Knex): Promise<any> {
  knex.schema.dropTable('hr_email_templates');
}
