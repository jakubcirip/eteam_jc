import * as Knex from 'knex';

export async function seed(knex: Knex): Promise<any> {
  return knex('division')
    .del()
    .then(() => {
      return knex('division').insert([
        {
          id: 1,
          company_id: 1,
          name: 'Admin - Kosice',
          created_at: new Date(),
          tag: 'ke',
          mail_pass: 'U2FsdGVkX18OAMsNArLkiptwDQ3k9wIDwNCPekNqOUc=', // 3.jqy.6-8HWC
        },
      ]);
    });
}
