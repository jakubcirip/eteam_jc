import { Component, OnInit } from '@angular/core';
import { Utils } from 'src/services/Utils';
import { Router } from '@angular/router';
import API from 'src/services/API';

export enum FastInterviewState {
  INTRO,
  SELECT_EMAIL,
  SELECT_FORM,
  SELECT_DATES,
  NONE,
}

@Component({
  selector: 'app-fast-interview',
  templateUrl: './fast-interview.component.html',
  styleUrls: ['./fast-interview.component.scss'],
})
export class FastInterviewComponent implements OnInit {
  state = FastInterviewState.INTRO;
  FastInterviewState = FastInterviewState;

  canLeave = true;

  totalSteps = 3;
  currentStep = 0;
  currentText = '';
  currentTitle = '';

  emailCatalogId;
  formCatalogId;

  constructor(private router: Router) {}

  ngOnInit() {}

  onStart() {
    this.canLeave = false;
    window.scrollTo({ top: 0 });
    this.state = FastInterviewState.SELECT_FORM;
    this.currentStep = 1;
    this.currentTitle = 'Pick formular template from our templates gallery';
    this.currentText =
      'You are allowed to customize questions, remove them or add new ones. You can do this after finishing fast interview import.';
  }

  onImportForm(formCatalogId: number) {
    window.scrollTo({ top: 0 });
    this.formCatalogId = formCatalogId;

    this.state = FastInterviewState.NONE;

    setTimeout(() => {
      this.currentStep = 2;
      this.currentTitle = 'Pick email template from our templates gallery';
      this.currentText =
        'You are allowed to customize subject and text. You can change company name, color of the text or even add your own company logo. You can do this after finishing fast interview import.';

      setTimeout(() => {
        this.state = FastInterviewState.SELECT_EMAIL;
      }, 1500);
    }, 1000);
  }

  onImportEmail(emailCatalogId: number) {
    window.scrollTo({ top: 0 });
    this.emailCatalogId = emailCatalogId;

    this.state = FastInterviewState.NONE;

    setTimeout(() => {
      this.currentStep = 3;
      this.currentTitle = 'Configure your interview';
      this.currentText =
        'Determine when the interview starts, when we should remind candidates or when does the interview end.';

      setTimeout(() => {
        this.state = FastInterviewState.SELECT_DATES;
      }, 1500);
    }, 1000);
  }

  onImportSettings(settingsData: {
    imageData: string;
    imageType: string;
    name: string;
    color: string;
    isDark: boolean;
    prelog: string;
    startDate: Date;
    endDate: Date;
    remindDate: Date;
  }) {
    window.scrollTo({ top: 0 });
    this.state = FastInterviewState.NONE;

    setTimeout(() => {
      this.currentStep = -1;
      this.currentTitle = 'Fast Interview finished';
      this.currentText = 'Creating interview..';

      setTimeout(async () => {
        this.canLeave = true;
        const res = await Utils.sendRequest(
          'Fast Interview',
          API.createFastInterview(
            {},
            {
              emailId: this.emailCatalogId,
              formId: this.formCatalogId,
              imageType: settingsData.imageType,
              imageData: settingsData.imageData,
              prelog: settingsData.prelog,
              startDate: settingsData.startDate.toString(),
              endDate: settingsData.endDate.toString(),
              remindDate: settingsData.remindDate.toString(),
              isDark: settingsData.isDark,
              name: settingsData.name,
              color: settingsData.color,
            },
          ),
        );
        if (res) {
          this.router.navigate(['hr', 'interview']);
        } else {
          this.currentStep = 3;
          this.currentTitle = 'Configure your interview';
          this.currentText =
            'Determine when the interview starts, when we should remind candidates or when does the interview end.';
          this.state = FastInterviewState.SELECT_DATES;
        }
      }, 2500);
    }, 1000);
  }
}
