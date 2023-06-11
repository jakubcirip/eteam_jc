import {
  PlaceholderType,
  Placeholder,
} from '../../managers/PlaceholderManager';

import {
  CompanyNamePlaceholder,
  DivisionTagPlaceholder,
  CandidateEmailPlaceholder,
  DivisionNamePlaceholder,
  CompanyEmailPlaceholder,
  PositionFormQuestionsAmountPlaceholder,
  PositionFormNamePlaceholder,
  PositionNamePlaceholder,
  InterviewNamePlaceholder,
  InterviewTagPlaceholder,
  InterviewCandidatesAmountPlaceholder,
} from './SharedEmailPlaceholders';
import { Utils } from '../../../Utils';

export class RegistrationFailEmailType implements PlaceholderType {
  name: string = 'registration_fail';
  placeholders: Placeholder[];

  constructor() {
    this.placeholders = [
      new CandidateEmailPlaceholder(),
      new DivisionTagPlaceholder(),
      new DivisionNamePlaceholder(),
      new CompanyEmailPlaceholder(),
      new CompanyNamePlaceholder(),
      // new CompanyIcoPlaceholder(),
      new PositionFormQuestionsAmountPlaceholder(),
      new PositionFormNamePlaceholder(),
      new PositionNamePlaceholder(),
      new InterviewNamePlaceholder(),
      new InterviewTagPlaceholder(),
      new InterviewCandidatesAmountPlaceholder(),
      ...Utils.getMailDataPlaceholders(),
    ];
  }
}
