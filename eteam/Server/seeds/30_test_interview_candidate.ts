import * as Knex from 'knex';

export async function seed(knex: Knex): Promise<any> {
  return knex('job_interviews_candidates')
    .del()
    .then(() => {
      return knex('job_interviews_candidates').insert([
        {
          job_interview_id: 1,
          job_interview_person_id: 1,
          type: 'manual',
          division_id: 1,
        },
        {
          job_interview_id: 1,
          job_interview_person_id: 2,
          type: 'manual',
          division_id: 1,
        },
      ]);
    });
}
