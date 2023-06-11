import { SQLManager } from '../../managers/SQLManager';
import { LogManager } from '../../managers/LogManager';
import { Interview } from '../Interview';

export const RemindWorker = async (
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

  const canData = await int.getInterviewCandidateData();
  for (const c of candidatesData) {
    const isNotSubmited = canData.notSubmited.find(
      (notCan: any) => notCan.canId === c.candidateId
    );
    if (isNotSubmited) {
      await int.processCandidate(c, mailId);
    }
  }
};
