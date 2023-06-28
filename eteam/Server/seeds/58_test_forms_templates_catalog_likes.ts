import * as Knex from 'knex';

export async function seed(knex: Knex): Promise<any> {
  return knex('hr_form_templates_catalog_likes')
    .del()
    .then(() => {
      return knex('hr_form_templates_catalog_likes').insert([
        {
          catalog_id: 1,
          hr_id: 1,
        },
      ]);
    });
}
