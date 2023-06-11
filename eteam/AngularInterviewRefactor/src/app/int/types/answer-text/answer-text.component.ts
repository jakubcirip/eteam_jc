import { Component, OnInit, Input } from '@angular/core';
import { Step, BaseComponent } from '../../base/base.component';
import { InterviewService, InterviewState } from 'src/app/interview.service';

@Component({
  selector: 'app-answer-text',
  templateUrl: './answer-text.component.html',
  styleUrls: ['./answer-text.component.scss'],
})
export class AnswerTextComponent implements OnInit {
  @Input() step: Step;

  InterviewState = InterviewState;
  interval;

  startTime;
  totalCharacters = 0;
  finalValue = 'No answer';

  constructor(public int: InterviewService) {}

  ngOnInit() {
    this.int.stateChangeSubject.subscribe((newState) => {
      if (
        newState === InterviewState.ANSWER_TYPE_STEP2 &&
        this.step.id === BaseComponent.i.currentStepId
      ) {
        this.startTime = Date.now();

        this.interval = setInterval(() => {
          this.int.randomData.timeLeft--;

          if (this.int.randomData.timeLeft < 0) {
            const endTime = Date.now();
            const totalDif = (endTime - this.startTime) / 1000;
            const k = 60 / totalDif;
            const charsPerMinute = Math.round(this.totalCharacters * k);
            const wordsPerMinute = Math.round(charsPerMinute / 5);

            this.int.randomData.response = {
              wordsPerMinute,
              value: this.finalValue,
              type: 'type',
            };

            BaseComponent.i.goRight();
            clearInterval(this.interval);
          }
        }, 1000);
      }
    });
  }

  onChange(e: any) {
    this.finalValue = e.target.value;
    this.totalCharacters++;
  }
}
