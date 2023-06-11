import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('job_interviews_candidates', (table) => {
    table.increments();

    table
      .integer('division_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('division');

    table
      .integer('job_interview_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('job_interviews');

    table
      .integer('job_interview_person_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('job_interviews_people');

    table.string('type', 32).notNullable();
    table.string('email_uid', 128).nullable();

    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<any> {
  knex.schema.dropTable('job_interviews_candidates');
}
