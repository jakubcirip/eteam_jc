import * as Knex from 'knex';

export async function seed(knex: Knex): Promise<any> {
  return knex('job_positions')
    .del()
    .then(() => {
      return knex('job_positions').insert([
        {
          id: 1,
          company_id: 1,
          division_id: 1,
          name: 'Default Folder',
          created_at: new Date(),
        },
      ]);
    });
}
