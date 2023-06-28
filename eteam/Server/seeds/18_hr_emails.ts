import * as Knex from 'knex';

export async function seed(knex: Knex): Promise<any> {
  return knex('hr_emails')
    .del()
    .then(() => {
      return knex('hr_emails').insert([
        {
          id: 1,
          division_id: 1,
          name: 'End E-Mail',
          type: 'end',
          subject: 'End Email - Admin Company',
          content: '<p>Custom End</p>',
          attachments: JSON.stringify([
            'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
            'http://www.africau.edu/images/default/sample.pdf',
          ]),
        },
        {
          id: 2,
          division_id: 1,
          name: 'Start E-Mail',
          type: 'start',
          subject: 'Start Email - Admin Company',
          content: '<p>Custom Start {{candidateInterviewUrl}}</p>',
          attachments: '[]',
        },
        {
          id: 3,
          division_id: 1,
          name: 'Remind E-Mail',
          type: 'remind',
          subject: 'Remind Email - Admin Company',
          content: '<p>Custom Remind</p>',
          attachments: '[]',
        },
        {
          id: 4,
          division_id: 1,
          name: 'Register Failed E-Mail',
          type: 'registration_fail',
          subject: 'Reg Failed Email - Admin Company',
          content: '<p>Custom Reg Failed</p>',
          attachments: '[]',
        },
        {
          id: 7,
          division_id: 1,
          name: 'Nonstop accept',
          type: 'nonstopinterview_accept',
          subject: 'Nonstop accept',
          content: '<p>CCustom nonstop accept</p>',
          attachments: '[]',
        },
        {
          id: 8,
          division_id: 1,
          name: 'nonstop reject',
          type: 'nonstopinterview_reject',
          subject: 'Nonstop reject',
          content: '<p>Custom nonstop reject</p>',
          attachments: '[]',
        },
        {
          id: 5,
          division_id: 1,
          name: 'Register E-Mail',
          type: 'registration',
          subject: 'Registration Email - Admin Company',
          content: '<p>Custom Registration</p>',
          attachments: '[]',
        },
        {
          id: 6,
          division_id: 1,
          name: 'Submit E-Mail',
          type: 'submit',
          subject: 'Submit Email - Admin Company',
          content: '<p>Custom Submit</p>',
          attachments: '[]',
        },
      ]);
    });
}
