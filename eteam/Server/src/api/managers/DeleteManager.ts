import * as fs from 'fs-extra';
import * as path from 'path';

import { SQLManager } from './SQLManager';
import { TableJobPositionsForms } from '../models/dbTypes';

export class DeleteManager {
  static async deleteallInterviewResults(divId: number) {
    const intData: string[] = (
      await SQLManager.knex
        .select(['tag'])
        .from('job_interviews')
        .where('division_id', divId)
    ).map((r) => r.tag);

    const promises = intData.map(async (r) => {
      await DeleteManager.deleteInterviewResult(r);
    });

    await Promise.all(promises);
  }

  static async deleteInterviewResult(intTag: string) {
    const intDir = path.join(
      process.env.dirname,
      '../private/fm/int/' + intTag
    );
    await fs.remove(intDir);
  }

  static async deleteAllCandidates(divId: number) {
    await SQLManager.knex
      .delete()
      .from('job_interviews_candidates')
      .where('division_id', divId);
  }

  static async deleteCandidate(canId: number) {
    await SQLManager.knex
      .delete()
      .from('job_interviews_candidates')
      .where('id', canId);
  }

  static async deleteAllPeople(divId: number) {
    await SQLManager.knex
      .delete()
      .from('job_interviews_candidates')
      .where('division_id', divId);

    await SQLManager.knex
      .delete()
      .from('job_interviews_people')
      .where('division_id', divId);
  }

  static async deletePerson(personId: number, divId: number) {
    await SQLManager.knex
      .delete()
      .from('job_interviews_candidates')
      .where('division_id', divId)
      .where('job_interview_person_id', personId);

    await SQLManager.knex
      .delete()
      .from('job_interviews_people')
      .where('id', personId);
  }

  static async deleteAllInterviews(divId: number) {
    const intIds: number[] = (
      await SQLManager.knex
        .select(['id'])
        .from('job_interviews')
        .where('division_id', divId)
    ).map((r) => r.id);

    intIds.map(async (id) => {
      await DeleteManager.deleteInterview(id);
    });

    await Promise.all(intIds);
  }

  static async deleteInterview(intId: number) {
    await SQLManager.knex
      .delete()
      .from('division_intwerview_history')
      .where('int_id', intId);

    await SQLManager.knex
      .delete()
      .from('job_interviews_candidates')
      .where('job_interview_id', intId);

    await SQLManager.knex
      .delete()
      .from('job_interviews_data')
      .where('int_id', intId);
    await SQLManager.knex.delete().from('job_interviews').where('id', intId);
  }

  static async deleteAllEmails(divId: number) {
    const mailsArr = await SQLManager.knex
      .select('id')
      .from('hr_emails')
      .where('division_id', divId);

    for (const mailData of mailsArr) {
      const mailId = mailData.id;
      await this.deleteEmail(mailId);
    }
  }

  static async deleteEmail(emailId: number) {
    await SQLManager.knex.delete().from('mails').where('hr_email_id', emailId);
    await SQLManager.knex.delete().from('hr_emails').where('id', emailId);
  }

  static async deleteAllForms(divId: number) {
    const forms = await SQLManager.knex
      .select('id')
      .from('job_positions_forms')
      .where('division_id', 1);

    await Promise.all(
      forms.map(async (f) => {
        const formId = f.id;
        await DeleteManager.deleteForm(formId);
      })
    );
  }

  static async deleteForm(formId: number) {
    await SQLManager.knex
      .delete()
      .from('job_interviews_weight')
      .where('form_id', formId);

    await SQLManager.knex
      .delete()
      .from('job_positions_forms')
      .where('id', formId);
  }

  static async deleteAllPositions(divId: number) {
    await SQLManager.knex
      .delete()
      .from('job_positions')
      .where('division_id', divId);
  }

  static async deletePosition(posId: number) {
    await SQLManager.knex.delete().from('job_positions').where('id', posId);
  }

  static async deleteAllFiles(divId: number) {
    const intDir = path.join(process.env.dirname, '../private/fm/mp3/' + divId);
    await fs.remove(intDir);
    const intDir2 = path.join(
      process.env.dirname,
      '../private/fm/mp4/' + divId
    );
    await fs.remove(intDir2);
  }
}
