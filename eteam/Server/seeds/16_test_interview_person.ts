import * as Knex from 'knex';

export async function seed(knex: Knex): Promise<any> {
  return knex('job_interviews_people')
    .del()
    .then(() => {
      return knex('job_interviews_people').insert([
        {
          name: 'Matej Baco',
          tag: '2kfo4mdu',
          email: 'matejbaco2000@gmail.com',
          type: 'manual',
          division_id: 1,
        },
        {
          name: 'Marko Buxar',
          tag: '9sovl4mf',
          email: 'dongaabe@seznam.cz',
          type: 'manual',
          division_id: 1,
        },
        {
          name: 'Sebo Ivan',
          tag: 'c3c3',
          email: 's.ivan@email.com',
          type: 'manual',
          division_id: 1,
        },
      ]);
    });
}
