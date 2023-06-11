import * as Knex from 'knex';

export async function seed(knex: Knex): Promise<any> {
  return knex('hr_form_templates_catalog')
    .del()
    .then(() => {
      return knex('hr_form_templates_catalog').insert([
        {
          id: 1,
          name: 'Universal Template',
          cat_id: 'formal',
          plan_id: 0,
          desc: 'This tempalte can be used within few minutes to create basic interview experiecne not focused on any specific position. We recommend using this template in order to find out candidate social skill and thinking processes.',
          likes: 1,
          downloads: 1,
        },
      ]);
    });
}
