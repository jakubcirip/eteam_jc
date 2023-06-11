import * as Knex from 'knex';

export async function seed(knex: Knex): Promise<any> {
  return knex('job_interviews_data')
    .del()
    .then(() => {
      return knex('job_interviews_data').insert([
        {
          int_id: 1,
          type: 'start',
          date: knex.raw('(NOW() + INTERVAL 10 HOUR)'),
          mail_id: 2,
        },
        {
          int_id: 1,
          type: 'end',
          date: knex.raw('(NOW() + INTERVAL 12 HOUR)'),
          mail_id: 1,
        },
        {
          int_id: 1,
          type: 'remind',
          date: knex.raw('(NOW() + INTERVAL 11 HOUR)'),
          mail_id: 3,
        },
        {
          int_id: 1,
          type: 'submit',
          date: null,
          mail_id: 6,
        },
        {
          int_id: 1,
          type: 'registration',
          date: null,
          mail_id: 5,
        },
        {
          int_id: 1,
          type: 'registration_fail',
          date: null,
          mail_id: 4,
        },
      ]);
    });
}
