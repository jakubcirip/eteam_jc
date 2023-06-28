import { SQLManager } from '../../managers/SQLManager';
import { LogManager } from '../../managers/LogManager';
import { Interview } from '../Interview';

export const EndWorker = async (
  int: Interview,
  type: string,
  mailId: number
) => {
  await SQLManager.knex
    .update({
      state: 'finished',
    })
    .table('job_interviews')
    .where('id', int.id);

  LogManager.success('Ended interview (sql query) ' + ` [${int.id}] (${type})`);

  // Give back tokens

  const canData = await int.getInterviewCandidateData();
  const notSubmitedAmount = canData.notSubmited.length;
  const intData = await int.getInterviewSummary();

  const toGiveBack =
    notSubmitedAmount * intData.interviewSeconds * intData.pricePerSecond;

  LogManager.success(
    'Giving back ' +
      toGiveBack +
      ' to company ' +
      int.companyId +
      ` [${int.id}] (${type})`
  );

  await SQLManager.knex
    .update({
      tokens: SQLManager.knex.raw('?? + ??', ['tokens', toGiveBack]),
    })
    .table('company')
    .where('id', int.companyId);

  // Send Emails

  const candidatesData = await SQLManager.knex
    .select({
      candidateId: 'id',
    })
    .from('job_interviews_candidates')
    .where('job_interview_id', int.id);

  LogManager.success(
    'Found ' + candidatesData.length + ' candidates' + ` [${int.id}] (${type})`
  );

  for (const c of candidatesData) {
    await int.processCandidate(c, mailId);
  }

  // Cleanup

  await SQLManager.knex
    .update({
      job_position_id: null,
      job_position_form_id: null,
    })
    .table('job_interviews')
    .where('id', int.id);

  await SQLManager.knex
    .update({
      mail_id: null,
    })
    .table('job_interviews_data')
    .where('int_id', int.id);

  await SQLManager.knex
    .delete()
    .from('job_interviews_candidates')
    .where('job_interview_id', int.id);
};
