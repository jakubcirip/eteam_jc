import * as Knex from 'knex';

export async function seed(knex: Knex): Promise<any> {
  return knex('hrs')
    .del()
    .then(() => {
      return knex('hrs').insert([
        {
          id: 1,
          company_id: 1,
          division_id: 1,
          name: 'Matej Baco Prvy',
          email: 'matejbacocom@gmail.com',
          pass: 'U2FsdGVkX18SEBl8DpkKxkA1tf6uVvuA3/uPG5BKhfs=', // kacalova
          auth_key: null,
          activation_code: null,
          reset_pass_at: null,
          reset_pass_key: null,
          created_at: new Date(),
        },
        {
          id: 2,
          company_id: 1,
          division_id: 1,
          name: 'Matej Baco Druhy',
          email: 'bacomatej@gmail.com',
          pass: 'U2FsdGVkX18SEBl8DpkKxkA1tf6uVvuA3/uPG5BKhfs=', // kacalova
          auth_key: null,
          activation_code: null,
          reset_pass_at: null,
          reset_pass_key: null,
          created_at: new Date(),
        },
      ]);
    });
}
