import * as Knex from 'knex';

export async function seed(knex: Knex): Promise<any> {
  return knex('job_interviews')
    .del()
    .then(() => {
      return knex('job_interviews').insert([
        {
          id: 1,
          name: 'September Java Interview',
          division_id: 1,
          job_position_id: 1,
          job_position_form_id: 1,
          tag: 'rdtspss1',
          test_user_tag: 'rdtspss2',
          prelog: 'Test prelog',
          image: 'apiurl:bulksplash-e_ambursley-Q_DK3kxXhbo.jpg',
          color: 'blue',
        },
      ]);
    });
}
