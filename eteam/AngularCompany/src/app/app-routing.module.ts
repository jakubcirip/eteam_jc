import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Error404Component } from './error404/error404.component';
import { AppComponent } from './app.component';
import { CompanyDivisionComponent } from './company-division/company-division.component';
import { CompanyHrsComponent } from './company-hrs/company-hrs.component';
import { CompanyIndexComponent } from './company-index/company-index.component';
import { TypeSelectComponent } from './type-select/type-select.component';
import { AuthGuard } from './auth.guard';
import { HrRegistrationSuccessComponent } from './hr-registration-success/hr-registration-success.component';
import { HrLoginComponent } from './hr-login/hr-login.component';
import { HrBoardComponent } from './hr-board/hr-board.component';
import { HrIndexComponent } from './hr-index/hr-index.component';
import { HrAuthGuard } from './hr-auth.guard';
import { HrForgotComponent } from './hr-forgot/hr-forgot.component';
import { HrForgotPasswordFinishComponent } from './hr-forgot-password-finish/hr-forgot-password-finish.component';
import { CompanyBoardComponent } from './company-board/company-board.component';
import { CompanyAuthCheckComponent } from './company-auth-check/company-auth-check.component';
import { CompanyLoginComponent } from './company-login/company-login.component';
import { CompanyForgotPassComponent } from './company-forgot-pass/company-forgot-pass.component';
import { CompanyForgotPasswordFinishComponent } from './company-forgot-pass-finish/company-forgot-pass-finish.component';
import { CompanyRegistrationSuccessComponent } from './company-registration-success/company-registration-success.component';
import { ReverseAuthGuard } from './reverse-auth.guard';
import { ReverseHrAuthGuard } from './reverse-hr-auth.guard';
import { CompanyTokensComponent } from './company-tokens/company-tokens.component';
import { CompanyFaqComponent } from './company-faq/company-faq.component';
import { GlobalAccountTypeComponent } from './global-account-type/global-account-type.component';
import { HrFaqComponent } from './hr-faq/hr-faq.component';
import { HrJobPositionsComponent } from './hr-job-positions/hr-job-positions.component';
import { HrJobPositionsFormComponent } from './hr-job-positions-form/hr-job-positions-form.component';
import { HrSettingsComponent } from './hr-settings/hr-settings.component';
import { CompanySettingsComponent } from './company-settings/company-settings.component';
import { HrFmFoldersComponent } from './hr-fm-folders/hr-fm-folders.component';
import { HrFmMp3Component } from './hr-fm-mp3/hr-fm-mp3.component';
import { HrFmMp4Component } from './hr-fm-mp4/hr-fm-mp4.component';
import { HrJobPositionFormEditorComponent } from './hr-job-position-form-editor/hr-job-position-form-editor.component';
import { HrInterviewComponent } from './hr-interview/hr-interview.component';
import { HrInterviewPeopleComponent } from './hr-interview-people/hr-interview-people.component';
import { HrEmailsComponent } from './hr-emails/hr-emails.component';
import { HrEmailsEditorComponent } from './hr-emails-editor/hr-emails-editor.component';
import { InterviewEditorComponent } from './interview-editor/interview-editor.component';
import { HrInterviewCandidatsComponent } from './hr-interview-candidats/hr-interview-candidats.component';
import { HrInterviewSummaryComponent } from './hr-interview-summary/hr-interview-summary.component';
import { HrInterviewResultsComponent } from './hr-interview-results/hr-interview-results.component';
import { HrInterviewResultsCandidateComponent } from './hr-interview-results-candidate/hr-interview-results-candidate.component';
import { HrInterviewResultsCompareComponent } from './hr-interview-results-compare/hr-interview-results-compare.component';
import { HrInterviewResultsSlideshowComponent } from './hr-interview-results-slideshow/hr-interview-results-slideshow.component';
import {
  DeactivateFormEditorGuard,
  DeactivateEmailEditorGuard,
  DeactivateFormMedalsGuard,
  DeactivateFastInterviewGuard,
} from './deactivate.guard';
import { HrEmailTemplatesComponent } from './hr-email-templates/hr-email-templates.component';
import { HrInterviewSlideshowFinishComponent } from './hr-interview-slideshow-finish/hr-interview-slideshow-finish.component';
import { CompanyInterviewHistoryComponent } from './company-interview-history/company-interview-history.component';
import { CompanyInterviewHistoryDetailComponent } from './company-interview-history-detail/company-interview-history-detail.component';
import { HrJobPositionsFormMedalsComponent } from './hr-job-positions-form-medals/hr-job-positions-form-medals.component';
import { HrNonstopInterviewComponent } from './hr-nonstop-interview/hr-nonstop-interview.component';
import { HrFormTemplatesComponent } from './hr-form-templates/hr-form-templates.component';
import { FastInterviewComponent } from './fast-interview/fast-interview.component';
import { HrFmImgComponent } from './hr-fm-img/hr-fm-img.component';

let i = 0;

const generateAnimId = (): string => {
  i++;
  return 'Page' + i;
};

const routes: Routes = [
  {
    path: 'company',
    component: CompanyBoardComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        component: CompanyIndexComponent,
        data: { anim: generateAnimId() },
      },
      {
        path: 'divisions',
        component: CompanyDivisionComponent,
        data: { anim: generateAnimId() },
      },
      {
        path: 'divisions/:division_id',
        component: CompanyHrsComponent,
        data: { anim: generateAnimId() },
      },
      {
        path: 'tokens',
        component: CompanyTokensComponent,
        data: { anim: generateAnimId() },
      },
      {
        path: 'faq',
        component: CompanyFaqComponent,
        data: { anim: generateAnimId() },
      },
      {
        path: 'plan',
        component: GlobalAccountTypeComponent,
        data: { anim: generateAnimId() },
      },
      {
        path: 'settings',
        component: CompanySettingsComponent,
        data: { anim: generateAnimId() },
      },
      {
        path: 'interview-history',
        component: CompanyInterviewHistoryComponent,
        data: { anim: generateAnimId() },
      },
      {
        path: 'interview-history/:historyIntId',
        component: CompanyInterviewHistoryDetailComponent,
        data: { anim: generateAnimId() },
      },
    ],
  },

  {
    path: 'hr',
    component: HrBoardComponent,
    canActivate: [HrAuthGuard],
    canActivateChild: [HrAuthGuard],
    children: [
      {
        path: '',
        component: HrIndexComponent,
        data: { anim: generateAnimId() },
      },
      {
        path: 'plan',
        component: GlobalAccountTypeComponent,
        data: { anim: generateAnimId() },
      },
      {
        path: 'fast-interview',
        component: FastInterviewComponent,
        data: { anim: generateAnimId() },
        canDeactivate: [DeactivateFastInterviewGuard],
      },
      {
        path: 'faq',
        component: HrFaqComponent,
        data: { anim: generateAnimId() },
      },
      {
        path: 'jobs',
        component: HrJobPositionsComponent,
        data: { anim: generateAnimId() },
      },
      {
        path: 'jobs/templates',
        component: HrFormTemplatesComponent,
        data: { anim: generateAnimId() },
      },
      {
        path: 'jobs/:positionId/templates',
        component: HrJobPositionsFormComponent,
        data: { anim: generateAnimId() },
      },
      {
        path: 'jobs/:positionId/templates/:formId/editor',
        component: HrJobPositionFormEditorComponent,
        data: { anim: generateAnimId() },
        canDeactivate: [DeactivateFormEditorGuard],
      },
      {
        path: 'jobs/:positionId/templates/:formId/medals',
        component: HrJobPositionsFormMedalsComponent,
        data: { anim: generateAnimId() },
        canDeactivate: [DeactivateFormMedalsGuard],
      },
      {
        path: 'settings',
        component: HrSettingsComponent,
        data: { anim: generateAnimId() },
      },
      {
        path: 'files',
        component: HrFmFoldersComponent,
        data: { anim: generateAnimId() },
      },
      {
        path: 'files/mp3',
        component: HrFmMp3Component,
        data: { anim: generateAnimId() },
      },
      {
        path: 'files/mp4',
        component: HrFmMp4Component,
        data: { anim: generateAnimId() },
      },
      {
        path: 'files/img',
        component: HrFmImgComponent,
        data: { anim: generateAnimId() },
      },
      {
        path: 'interview',
        component: HrInterviewComponent,
        data: { anim: generateAnimId() },
      },
      {
        path: 'nonstop-interview',
        component: HrNonstopInterviewComponent,
        data: { anim: generateAnimId() },
      },
      {
        path: 'interview/:intId',
        component: InterviewEditorComponent,
        data: { anim: generateAnimId() },
      },
      {
        path: 'interview/:intId/people',
        component: HrInterviewCandidatsComponent,
        data: { anim: generateAnimId() },
      },
      {
        path: 'interview/:intId/summary',
        component: HrInterviewSummaryComponent,
        data: { anim: generateAnimId() },
      },
      {
        path: 'interview/:intId/results',
        component: HrInterviewResultsComponent,
        data: { anim: generateAnimId() },
      },
      {
        path: 'interview/:intId/candidate/:canId',
        component: HrInterviewResultsCandidateComponent,
        data: { anim: generateAnimId() },
      },
      {
        path: 'interview/:intId/compare/:canIds',
        component: HrInterviewResultsCompareComponent,
        data: { anim: generateAnimId() },
      },
      {
        path: 'interview/:intId/slideshow/:canIds',
        component: HrInterviewResultsSlideshowComponent,
        data: { anim: generateAnimId() },
      },
      {
        path: 'interview/:intId/slideshow-finish/:canIds',
        component: HrInterviewSlideshowFinishComponent,
        data: { anim: generateAnimId() },
      },
      {
        path: 'people',
        component: HrInterviewPeopleComponent,
        data: { anim: generateAnimId() },
      },
      {
        path: 'emails',
        component: HrEmailsComponent,
        data: { anim: generateAnimId() },
      },
      {
        path: 'emails/templates',
        component: HrEmailTemplatesComponent,
        data: { anim: generateAnimId() },
      },
      {
        path: 'emails/:emailId/edit',
        component: HrEmailsEditorComponent,
        data: { anim: generateAnimId() },
        canDeactivate: [DeactivateEmailEditorGuard],
      },
    ],
  },

  {
    path: '',
    component: TypeSelectComponent,
    data: { anim: generateAnimId() },
  },
  {
    path: 'company-auth',
    component: CompanyAuthCheckComponent,
    data: { anim: 'NoAnim' },
    canActivate: [ReverseAuthGuard],
  },
  {
    path: 'company-login',
    component: CompanyLoginComponent,
    data: { anim: generateAnimId() },
    canActivate: [ReverseAuthGuard],
  },
  {
    path: 'company-forgot-password',
    component: CompanyForgotPassComponent,
    data: { anim: generateAnimId() },
    canActivate: [ReverseAuthGuard],
  },
  {
    path: 'company-forgot-password/:code',
    component: CompanyForgotPasswordFinishComponent,
    data: { anim: generateAnimId() },
    canActivate: [ReverseAuthGuard],
  },
  {
    path: 'company-registration-finish/:key',
    component: CompanyRegistrationSuccessComponent,
    data: { anim: generateAnimId() },
    canActivate: [ReverseAuthGuard],
  },
  {
    path: 'hr-registration-finish/:key',
    component: HrRegistrationSuccessComponent,
    data: { anim: generateAnimId() },
  },
  {
    path: 'hr-forgot-password',
    component: HrForgotComponent,
    data: { anim: generateAnimId() },
    canActivate: [ReverseHrAuthGuard],
  },
  {
    path: 'hr-forgot-password/:code',
    component: HrForgotPasswordFinishComponent,
    data: { anim: generateAnimId() },
    canActivate: [ReverseHrAuthGuard],
  },
  {
    path: 'hr-login',
    component: HrLoginComponent,
    data: { anim: generateAnimId() },
    canActivate: [ReverseHrAuthGuard],
  },

  /*
  {
    path: 'interview/:id',
    component: InterviewComponent,
  },
  {
    path: 'interview',
    component: IntroComponent,
  },
  */
  {
    path: '**',
    component: Error404Component,
    data: { anim: generateAnimId() },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
