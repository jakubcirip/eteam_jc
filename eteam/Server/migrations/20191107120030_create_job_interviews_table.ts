import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('job_interviews', (table) => {
    table.increments();

    table
      .integer('division_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('division');

    table.string('name', 128).notNullable();

    table.string('tag', 128).notNullable();
    table.string('test_user_tag', 128).notNullable();

    table.text('prelog', 'longtext').nullable();

    table
      .integer('job_position_id')
      .unsigned()
      .nullable()
      .references('id')
      .inTable('job_positions');

    table
      .integer('job_position_form_id')
      .unsigned()
      .nullable()
      .references('id')
      .inTable('job_positions_forms');

    table.boolean('dark').notNullable().defaultTo(false);

    table.string('color', 128).notNullable();
    table.text('image', 'longtext').notNullable();

    table.string('state', 128).notNullable().defaultTo('created');

    table.timestamp('start_at').nullable().defaultTo(null);

    table.timestamp('finish_at').nullable().defaultTo(null);

    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<any> {
  knex.schema.dropTable('job_interviews');
}
