import * as Knex from 'knex';

export async function seed(knex: Knex): Promise<any> {
  return knex('division_intwerview_history')
    .del()
    .then(() => {
      return knex('division_intwerview_history').insert([
        {
          hr_id: 1,
          division_id: 1,
          tokens_spent: 52.55,
          plan_used: 1,
          candidates_amount: 55,
          started_at: new Date(),
          ended_at: new Date(),
          status: 'pending',
          int_id: 1,
          company_id: 1,
        },

        {
          hr_id: 2,
          division_id: 1,
          tokens_spent: 20.22,
          plan_used: 0,
          candidates_amount: 12,
          started_at: new Date(),
          ended_at: new Date(),
          status: 'ended',
          int_id: 1,
          company_id: 1,
        },
      ]);
    });
}
