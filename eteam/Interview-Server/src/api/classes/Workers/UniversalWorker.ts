import { SQLManager } from '../../managers/SQLManager';
import { LogManager } from '../../managers/LogManager';
import { Interview } from '../Interview';

export const UniversalWorker = async (
  int: Interview,
  type: string,
  mailId: number
) => {
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
};
