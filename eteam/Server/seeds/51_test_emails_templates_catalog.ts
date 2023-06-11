import * as Knex from 'knex';

export async function seed(knex: Knex): Promise<any> {
  return knex('hr_email_templates_catalog')
    .del()
    .then(() => {
      return knex('hr_email_templates_catalog').insert([
        {
          id: 1,
          name: 'Basic Emails',
          cat_id: 'formal',
          plan_id: 0,
          desc: 'This is package that contains basic simple emails. You should use these for testing purposes only but feel free to use them in real case scenario for less important job positions. For important job posittions, we recommed you to pick different template or create your own.',
          likes: 1,
          downloads: 1,
        },
      ]);
    });
}
