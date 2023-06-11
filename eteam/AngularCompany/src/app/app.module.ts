import { FullCalendarModule } from '@fullcalendar/angular';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthAppLeftComponent } from './auth-app-left/auth-app-left.component';
import { FormsModule } from '@angular/forms';
import { CompanyDivisionComponent } from './company-division/company-division.component';
import { CompanyHrsComponent } from './company-hrs/company-hrs.component';
import { TypeSelectComponent } from './type-select/type-select.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';
import { HrRegistrationSuccessComponent } from './hr-registration-success/hr-registration-success.component';
import { HrLoginComponent } from './hr-login/hr-login.component';
import { HrBoardComponent } from './hr-board/hr-board.component';
import { HrIndexComponent } from './hr-index/hr-index.component';
import { HrForgotComponent } from './hr-forgot/hr-forgot.component';
import { HrForgotPasswordFinishComponent } from './hr-forgot-password-finish/hr-forgot-password-finish.component';
import { CompanyLoginComponent } from './company-login/company-login.component';
import { CompanyForgotPassComponent } from './company-forgot-pass/company-forgot-pass.component';
import { Error404Component } from './error404/error404.component';
import { CompanyBoardComponent } from './company-board/company-board.component';
import { CompanyForgotPasswordFinishComponent } from './company-forgot-pass-finish/company-forgot-pass-finish.component';
import { CompanyRegistrationSuccessComponent } from './company-registration-success/company-registration-success.component';
import { CompanyIndexComponent } from './company-index/company-index.component';
import { CompanyAuthCheckComponent } from './company-auth-check/company-auth-check.component';
import { CompanyTokensComponent } from './company-tokens/company-tokens.component';
import { CompanyFaqComponent } from './company-faq/company-faq.component';
import { GlobalAccountTypeComponent } from './global-account-type/global-account-type.component';
import { GlobalSupportComponent } from './global-support/global-support.component';
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

import { MatSliderModule } from '@angular/material/slider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { HrInterviewCandidatsComponent } from './hr-interview-candidats/hr-interview-candidats.component';
import { HrInterviewSummaryComponent } from './hr-interview-summary/hr-interview-summary.component';
import { HrInterviewResultsComponent } from './hr-interview-results/hr-interview-results.component';
import { HrInterviewResultsCandidateComponent } from './hr-interview-results-candidate/hr-interview-results-candidate.component';
import { HrInterviewResultsCompareComponent } from './hr-interview-results-compare/hr-interview-results-compare.component';
import { HrInterviewResultsSlideshowComponent } from './hr-interview-results-slideshow/hr-interview-results-slideshow.component';
import { HrEmailTemplatesComponent } from './hr-email-templates/hr-email-templates.component';
import { EmailTemplatePipe } from './email-template.pipe';
import { InterviewCandidatesListComponent } from './interview-candidates-list/interview-candidates-list.component';
import { HrInterviewSlideshowFinishComponent } from './hr-interview-slideshow-finish/hr-interview-slideshow-finish.component';
import { CompanyInterviewHistoryComponent } from './company-interview-history/company-interview-history.component';
import { CompanyInterviewHistoryDetailComponent } from './company-interview-history-detail/company-interview-history-detail.component';
import { HrJobPositionsFormMedalsComponent } from './hr-job-positions-form-medals/hr-job-positions-form-medals.component';
import { HrNonstopInterviewComponent } from './hr-nonstop-interview/hr-nonstop-interview.component';
import { ArrayInfexFilterPipe } from './array-infex-filter.pipe';
import { InterviewErrorComponent } from './interview-error/interview-error.component';
import { HrFormTemplatesComponent } from './hr-form-templates/hr-form-templates.component';
import { FastInterviewComponent } from './fast-interview/fast-interview.component';
import { FastInterviewSettingsComponent } from './fast-interview-settings/fast-interview-settings.component';
import { HrInterviewResultsCandidateDetailComponent } from './hr-interview-results-candidate-detail/hr-interview-results-candidate-detail.component';
import { HrFmImgComponent } from './hr-fm-img/hr-fm-img.component';

@NgModule({
  declarations: [
    AppComponent,
    CompanyLoginComponent,
    CompanyForgotPassComponent,
    Error404Component,
    AuthAppLeftComponent,
    CompanyForgotPasswordFinishComponent,
    CompanyBoardComponent,
    CompanyDivisionComponent,
    CompanyHrsComponent,
    TypeSelectComponent,
    CompanyRegistrationSuccessComponent,
    CompanyIndexComponent,
    CompanyAuthCheckComponent,
    HrRegistrationSuccessComponent,
    HrLoginComponent,
    HrBoardComponent,
    HrIndexComponent,
    HrForgotComponent,
    HrForgotPasswordFinishComponent,
    CompanyTokensComponent,
    CompanyFaqComponent,
    GlobalAccountTypeComponent,
    GlobalSupportComponent,
    HrFaqComponent,
    HrJobPositionsComponent,
    HrJobPositionsFormComponent,
    HrSettingsComponent,
    CompanySettingsComponent,
    HrFmFoldersComponent,
    HrFmMp3Component,
    HrFmMp4Component,
    HrJobPositionFormEditorComponent,
    HrInterviewComponent,
    HrInterviewPeopleComponent,
    HrEmailsComponent,
    HrEmailsEditorComponent,
    InterviewEditorComponent,
    HrInterviewCandidatsComponent,
    HrInterviewSummaryComponent,
    HrInterviewResultsComponent,
    HrInterviewResultsCandidateComponent,
    HrInterviewResultsCompareComponent,
    HrInterviewResultsCandidateDetailComponent,
    HrInterviewResultsSlideshowComponent,
    HrEmailTemplatesComponent,
    EmailTemplatePipe,
    InterviewCandidatesListComponent,
    HrInterviewSlideshowFinishComponent,
    CompanyInterviewHistoryComponent,
    CompanyInterviewHistoryDetailComponent,
    HrJobPositionsFormMedalsComponent,
    HrNonstopInterviewComponent,
    ArrayInfexFilterPipe,
    InterviewErrorComponent,
    HrFormTemplatesComponent,
    FastInterviewComponent,
    FastInterviewSettingsComponent,
    HrFmImgComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    FullCalendarModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
