import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { ServerService } from './server.service';
import API, { PublicInterviewResponse } from './services/API';
import { AssistentService } from './assistent.service';
import { Utils } from './services/Utils';
import { FormService } from './form.service';
import { CamService } from './hardware/cam.service';
import { Step } from './int/base/base.component';

export enum InterviewType {
  CAM = 'cam',
  MIC = 'mic',
}

export enum InterviewState {
  NONE,
  INTRO,

  QUESTION_IMG_STEP1,
  QUESTION_IMG_STEP2,

  SELF_REVIEW_STEP1,
  SELF_REVIEW_STEP2,

  QUESTION_TEXT_STEP1,
  QUESTION_TEXT_STEP2,

  QUESTION_MP3_STEP1,
  QUESTION_MP3_STEP2,

  QUESTION_MP4_STEP1,
  QUESTION_MP4_STEP2,

  ANSWER_TYPE_STEP1,
  ANSWER_TYPE_STEP2,

  ANSWER_SELECT_ONE_STEP1,
  ANSWER_SELECT_ONE_STEP2,

  ANSWER_SELECT_MANY_STEP1,
  ANSWER_SELECT_MANY_STEP2,

  ANSWER_SPEAK_STEP1,
  ANSWER_SPEAK_STEP2,
}

@Injectable({
  providedIn: 'root',
})
export class InterviewService {
  // WEBSITE RELATED DATA
  steps = new BehaviorSubject<Step[]>([]);
  showButtonNext = true;
  showButtonPrevious = true;
  interviewState = InterviewState.NONE;
  isPreview = false;

  // data used to communicate from StartComponent -> TypeComponent (text, input, select one, select multiple, type, ..)
  randomData: any = {};

  // RUNNING INTERVIEW DATA
  currentQuestionIndex = -1;
  currentQuestion: PublicInterviewResponse['pairs'][number] = null;
  questionAnswers: {
    uuid: string;
    response: {
      data: any;
      rating: number;
      didSkipRating: boolean;
    };
  }[] = [];

  serverData: PublicInterviewResponse = null;
  isDark = false;

  // INTERVIEW DATA COLLECTED
  isHardwareWorking = false;
  stickyHardwarePreview = false;
  interviewType: InterviewType;
  name: string;
  surname: string;
  email: string;
  phone: string;
  nickname: string;
  dataChangeSubject = new BehaviorSubject<void>(null);
  stateChangeSubject = new BehaviorSubject<InterviewState>(InterviewState.NONE);

  constructor(private server: ServerService) {}

  setState(state: InterviewState) {
    this.interviewState = state;
    this.stateChangeSubject.next(state);
  }

  setStickyHardware(val: boolean, cam: CamService) {
    this.stickyHardwarePreview = val;
    this.dataChangeSubject.next();

    if (this.stickyHardwarePreview) {
      if (this.isHardwareWorking) {
        if (this.interviewType === InterviewType.CAM) {
          setTimeout(() => {
            if (cam.stream) {
              const el = cam.stream.getPreview({ source: 'original' });
              el.style.width = '100%';
              el.style.borderRadius = '10px';
              $('.camera-review').html(el);
            }
          }, 1);
        }
      }
    }
  }

  initData(data) {
    this.serverData = data;
    this.isDark = this.serverData.dark;
  }

  generateResponseData() {
    return {
      answers: this.questionAnswers,
      submitAt: Date.now(),
      intTag: this.server.intTag,
      userTag: this.server.userTag,
      isHardwareWorking: this.isHardwareWorking,
      interviewType: this.interviewType,
      name: this.name,
      surname: this.surname,
      email: this.email,
      nickname: this.nickname,
      phone: this.phone,
    };
  }

  async submitInterview() {
    const data = this.generateResponseData();

    console.log(data);
    console.log(JSON.stringify(data));

    await API.submitInterviewResponse(
      this.server.intTag,
      this.server.userTag,
      {},
      data,
    );
    return;
  }
}
