import * as Knex from 'knex';

export async function seed(knex: Knex): Promise<any> {
  return knex('company')
    .del()
    .then(() => {
      return knex('company').insert([
        {
          id: 1,
          name: 'Admin',
          email: 'admin@admin.sk',
          pass: 'U2FsdGVkX1+Sd7+mW53QaFKiPxWPiVnFj9XOq7EyU5U=', // admin
          sub_model: 0,
          auth_key: null,
          activation_code: null,
          reset_pass_at: null,
          reset_pass_key: null,
          created_at: new Date(),
          domain: 'admin',
        },
      ]);
    });
}
