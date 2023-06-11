import * as Knex from 'knex';

export async function seed(knex: Knex): Promise<any> {
  return knex('job_positions_forms_templates')
    .del()
    .then(() => {
      return knex('job_positions_forms_templates').insert([
        {
          id: 1,
          name: 'Q1 + Q2 Template',
          data:
            '{"pairs":[{"name":"Q1 AUDIO","q":{"type":"Audio Question","data":[{"isTemplate":true,"type":1,"value":"a8Np4ZCF","displayValue":"audio1 (a8Np4ZCF)","required":true,"title":"Question MP3 Source"},{"isTemplate":true,"type":0,"value":"Audio Pred?","displayValue":"Audio Pred?","required":true,"title":"Text Before Question"},{"isTemplate":true,"type":0,"value":"Audio Po?","displayValue":"Audio Po?","required":true,"title":"Text After Question"}]},"a":{"type":"Text Answer","data":[{"isTemplate":true,"type":3,"value":"5","displayValue":"5 seconds","required":true,"title":"Preparation Time"}]},"answerTime":10},{"name":"Q2 VIDEO","q":{"type":"Video Question","data":[{"isTemplate":true,"type":2,"value":"jzJwP7zS","displayValue":"vid1 (jzJwP7zS)","required":true,"title":"Question MP4 Source"},{"isTemplate":true,"type":0,"value":"Video Pred?","displayValue":"Video Pred?","required":true,"title":"Text Before Question"},{"isTemplate":true,"type":0,"value":"Video Po?","displayValue":"Video Po?","required":true,"title":"Text After Question"}]},"a":{"type":"Text Answer","data":[{"isTemplate":true,"type":3,"value":"5","displayValue":"5 seconds","required":true,"title":"Preparation Time"}]},"answerTime":10}]}',
        },
      ]);
    });
}
