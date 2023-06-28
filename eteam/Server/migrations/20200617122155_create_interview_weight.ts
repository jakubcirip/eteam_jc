import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('job_interviews_weight', (table) => {
    table.increments();

    table
      .integer('form_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('job_positions_forms');

    table
      .integer('medal_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('medals');

    table.string('qp_uuid', 128).nullable();

    table.integer('weight').notNullable();
  });
}

export async function down(knex: Knex): Promise<any> {
  knex.schema.dropTable('job_interviews_weight');
}
