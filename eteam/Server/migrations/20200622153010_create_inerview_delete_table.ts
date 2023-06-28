import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('interview_delete', (table) => {
    table.increments();
    table.timestamp('delete_at').nullable();
    table.string('folder_name').notNullable();
  });
}

export async function down(knex: Knex): Promise<any> {
  knex.schema.dropTable('interview_delete');
}
