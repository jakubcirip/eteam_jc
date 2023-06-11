import * as Knex from 'knex';

export async function seed(knex: Knex): Promise<any> {
  return knex('hr_email_templates_catalog_data')
    .del()
    .then(() => {
      return knex('hr_email_templates_catalog_data').insert([
        {
          catalog_id: 1,
          type: 'submit',
          subject: 'Submit Subject',
          email: `
Dear candidate,
We have recieved your submition of the interview, thanks!
For now, you can chill and wait till the end of the intertiew, that is {{endDate}}.
On {{endDate}}, our HR specialists will go over all submisions and pick their "heroes". 
HR specialist will contact you using email you provided at the beggining of the interview to get in touch with you.

Hope to see you again soon.

Sincerely,
{{companyName}}.
          `,
          attachments: '[]',
        },
        {
          catalog_id: 1,
          type: 'registration',
          subject: 'You are in! Great job!',
          email: `
Dear candidate,
We have recieved your request to join the interview and we are happy to tell you that you have been successfully registered.
Right now you do not need to do anytthing, just wait until {{startDate}}. At this day you will recieve new email that will contain link to the interview.

Hope to see you again soon.

Sincerely,
{{companyName}}.
          `,
          attachments: '[]',
        },
        {
          catalog_id: 1,
          type: 'end',
          subject: 'Interview is over.',
          email: `
Dear candidate,
The interview you have participated in has just finished. HR specialist will go through all responses and will get in touch with you if they like you.

Hope to see you again soon.

Sincerely,
{{companyName}}.
          `,
          attachments: '[]',
        },
        {
          catalog_id: 1,
          type: 'remind',
          subject: 'Your interview is waiting ...',
          email: `
Dear candidate,
Since you have registered to our interview, we would love you to join an online interview.
To access the interview, open this link in your browser and go over the interview: <a href="{{candidateInterviewUrl}}">{{candidateInterviewUrl}}</a>

We did not recieved your results yet so we would like to remind you in case you forgot, which we are sure you didnt.

You can send the interview result from now until {{endDate}}.
On {{endDate}}, the interview will be stopped and you will no longer be able to submit results.

Hope to see you soon.

Sincerely,
{{companyName}}.`,
          attachments: '[]',
        },
        {
          catalog_id: 1,
          type: 'registration_fail',
          subject: 'Whoops, something went wrong.',
          email: `
Dear candidate,
We are really sorry but there was some problem registering you as an candidate. You might sent email in wrong format, HR specialist might already end an interview or there might be not enough space for you to join.
Anyway, pelase get in touch with us to resolve this problem.

Sincerely,
{{companyName}}.
          `,
          attachments: '[]',
        },
        {
          catalog_id: 1,
          type: 'start',
          subject: 'Interview just started, please join!',
          email: `
Dear candidate,
Since you have registered to our interview, we would love you to join an online interview.
To access the interview, open this link in your browser and go over the interview: <a href="{{candidateInterviewUrl}}">{{candidateInterviewUrl}}</a>

You can send the interview result from now until {{endDate}}.
On {{endDate}}, the interview will be stopped and you will no longer be able to submit results.

Hope to see you soon.

Sincerely,
{{companyName}}.
          `,
          attachments: '[]'
        },
      ]);
    });
}
