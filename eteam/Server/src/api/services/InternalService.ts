import * as path from 'path';
import * as fs from 'fs-extra';
import {
  ParseEmailPlaceholderResponse,
  InternalInterviewCandidateStatistics,
  InterviewSummary,
} from '../models/swaggerTypes';
import { SQLManager } from '../managers/SQLManager';
import { Error404 } from '../helpers/errors';
import { PlaceholderData } from '../classes/placeholders/SharedEmailPlaceholders';
import { PlaceholderManager } from '../managers/PlaceholderManager';
import { HrService } from './HrService';

export class InternalService {
  static async getInternalInterviewSummary(
    req: any,
    intId: number
  ): Promise<InterviewSummary> {
    const divData = await SQLManager.knex
      .select(['division_id'])
      .from('job_interviews')
      .where('id', intId)
      .limit(1);

    if (divData.length <= 0) {
      throw Error404(
        req,
        __('InternalService.getInternalInterviewSummary.interviewNotFound')
      );
    }
    return HrService.getHrInterviewSummaryInternal(
      req,
      divData[0].division_id,
      intId
    );
  }

  static async getInternalInterviewCandidateStatistics(
    req: any,
    intId: number
  ): Promise<InternalInterviewCandidateStatistics> {
    const intData = await SQLManager.knex
      .select(['tag'])
      .from('job_interviews')
      .where('id', intId)
      .limit(1);

    if (intData.length <= 0) {
      throw Error404(
        req,
        __(
          'InternalService.getInternalInterviewCandidateStatistics.interviewNotFound'
        )
      );
    }

    const { tag: intTag } = intData[0];

    const candidateData = await SQLManager.knex
      .select(['job_interview_person_id', 'id'])
      .from('job_interviews_candidates')
      .where('job_interview_id', intId);

    const candidatePromises = candidateData.map(async (can) => {
      const personId = can.job_interview_person_id;
      const canId = can.id;

      const personData = await SQLManager.knex
        .select(['tag'])
        .from('job_interviews_people')
        .where('id', personId)
        .limit(1);

      if (!personData) {
        throw Error404(
          req,
          __(
            'InternalService.getInternalInterviewCandidateStatistics.personNotFound'
          )
        );
      }

      return {
        tag: personData[0].tag,
        personId,
        canId,
      };
    });

    const allPeople: any = await Promise.all(candidatePromises);

    const intDir = path.join(
      process.env.dirname,
      '../private/fm/int/' + intTag
    );

    const files = await fs.readdir(intDir);
    const submitedPeople = files.map((f) => {
      return f.split('.json')[0];
    });

    const notSubmitedPeopleRes = allPeople.filter(
      (p) => !submitedPeople.includes(p.tag)
    );

    const submitedPeopleRes = allPeople.filter((p) =>
      submitedPeople.includes(p.tag)
    );

    return {
      submited: submitedPeopleRes,
      notSubmited: notSubmitedPeopleRes,
    };
  }

  static async parseInternalEmailPlaceholders(
    req: any,
    candidateId: number,
    companyId: number,
    divId: number,
    intId: number,
    mailId: number,
    customCanEmail: string
  ): Promise<ParseEmailPlaceholderResponse> {
    const mailData = await SQLManager.knex
      .select({
        mailType: 'type',
        mailSubject: 'subject',
        mailText: 'content',
      })
      .from('hr_emails')
      .where('id', mailId)
      .limit(1);

    if (mailData.length <= 0) {
      throw Error404(
        req,
        __('InternalService.parseInternalEmailPlaceholders.mailNotFound')
      );
    }

    const mail = mailData[0];

    if (candidateId === -1) {
      const objNoCandidate: PlaceholderData = {
        companyId,
        divId,
        intId,
        candidateEmail: customCanEmail,
      };

      const parsedTextNoCan = await PlaceholderManager.i.parseEmail(
        mail.mailText,
        mail.mailType,
        objNoCandidate
      );

      const parsedSubjectNoCan = await PlaceholderManager.i.parseEmail(
        mail.mailSubject,
        mail.mailType,
        objNoCandidate
      );

      return {
        candidateEmail: customCanEmail,
        subject: parsedSubjectNoCan,
        text: parsedTextNoCan,
      };
    }

    const personData = await SQLManager.knex
      .select({
        personId: 'job_interview_person_id',
      })
      .from('job_interviews_candidates')
      .where('id', candidateId)
      .limit(1);

    if (personData.length <= 0) {
      throw Error404(
        req,
        __('InternalService.parseInternalEmailPlaceholders.candidateNotFound')
      );
    }

    const [{ personId }] = personData;

    const candidateData = await SQLManager.knex
      .select({
        candidateEmail: 'email',
        candidateName: 'name',
        candidateTag: 'tag',
        candidateType: 'type',
      })
      .from('job_interviews_people')
      .where('id', personId)
      .limit(1);

    if (candidateData.length <= 0) {
      throw Error404(
        req,
        __('InternalService.parseInternalEmailPlaceholders.candidateNotFound')
      );
    }

    const candidate = candidateData[0];

    const obj: PlaceholderData = {
      companyId,
      divId,
      intId,
      candidateEmail: candidate.candidateEmail,
      candidateName: candidate.candidateName,
      candidateTag: candidate.candidateTag,
      candidateType: candidate.candidateType,
    };

    const parsedText = await PlaceholderManager.i.parseEmail(
      mail.mailText,
      mail.mailType,
      obj
    );

    const parsedSubject = await PlaceholderManager.i.parseEmail(
      mail.mailSubject,
      mail.mailType,
      obj
    );

    return {
      candidateEmail: candidate.candidateEmail,
      subject: parsedSubject,
      text: parsedText,
    };
  }
}
