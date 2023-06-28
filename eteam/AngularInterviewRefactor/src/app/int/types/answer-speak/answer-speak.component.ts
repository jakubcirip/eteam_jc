import { Component, OnInit, Input } from '@angular/core';
import { Step, BaseComponent } from '../../base/base.component';
import {
  InterviewState,
  InterviewService,
  InterviewType,
} from 'src/app/interview.service';
import { CamService } from 'src/app/hardware/cam.service';
import { MicService } from 'src/app/hardware/mic.service';

@Component({
  selector: 'app-answer-speak',
  templateUrl: './answer-speak.component.html',
  styleUrls: ['./answer-speak.component.scss'],
})
export class AnswerSpeakComponent implements OnInit {
  @Input() step: Step;

  id;
  interval;

  InterviewState = InterviewState;
  InterviewType = InterviewType;

  constructor(
    public int: InterviewService,
    private cam: CamService,
    private mic: MicService,
  ) {
    this.id = 'answer-speak-camera-' + Date.now();
  }

  ngOnInit() {
    setTimeout(() => {
      if (this.cam.stream) {
        const el = this.cam.stream.getPreview({ source: 'original' });
        el.style.width = '100%';
        $('#' + this.id).html(el);
      }
    }, 1);

    this.int.stateChangeSubject.subscribe((newState) => {
      if (
        newState === InterviewState.ANSWER_SPEAK_STEP2 &&
        this.step.id === BaseComponent.i.currentStepId
      ) {
        if (this.int.interviewType === InterviewType.MIC) {
          this.mic.startRecording();
        } else {
          this.cam.startRecording();
        }

        this.interval = setInterval(async () => {
          this.int.randomData.timeLeft--;

          if (this.int.randomData.timeLeft < 0) {
            let res = '';

            if (this.int.interviewType === InterviewType.MIC) {
              res = await this.mic.stopRecording();
            } else {
              res = await this.cam.stopRecording();
            }

            this.int.randomData.response = {
              value: res,
              type: 'speak',
            };

            console.log(res);

            BaseComponent.i.goRight();
            clearInterval(this.interval);
          }
        }, 1000);
      }
    });
  }
}
