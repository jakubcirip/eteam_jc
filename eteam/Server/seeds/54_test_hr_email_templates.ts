import * as Knex from 'knex';

export async function seed(knex: Knex): Promise<any> {
  return knex('hr_email_templates')
    .del()
    .then(() => {
      return knex('hr_email_templates').insert([
        {
          id: 1,
          type: 'end',
          content: '<p>Init End</p>',
        },
        {
          id: 2,
          type: 'start',
          content: '<p>Init Start</p>',
        },
        {
          id: 3,
          type: 'remind',
          content: '<p>Init Remind</p>',
        },
      ]);
    });
}
