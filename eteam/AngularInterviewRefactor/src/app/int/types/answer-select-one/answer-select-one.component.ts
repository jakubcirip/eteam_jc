import { Component, OnInit, Input } from '@angular/core';
import { Step, BaseComponent } from '../../base/base.component';
import { InterviewState, InterviewService } from 'src/app/interview.service';

@Component({
  selector: 'app-answer-select-one',
  templateUrl: './answer-select-one.component.html',
  styleUrls: ['./answer-select-one.component.scss'],
})
export class AnswerSelectOneComponent implements OnInit {
  @Input() step: Step;
  InterviewState = InterviewState;

  currentValue = 'No answer';

  didAnswer = false;
  didContinue = false;
  name;
  interval;

  constructor(public int: InterviewService) {
    this.name = 'answer-select-one-' + Date.now();
  }

  ngOnInit() {
    this.int.stateChangeSubject.subscribe((newState) => {
      setTimeout(() => {
        $('.services-select-option .clickable').on('click', function () {
          $('.services-select-option li').removeClass('active');
          $(this).addClass('active');
        });

        if (this.didContinue) {
          return;
        }

        if (
          newState === InterviewState.ANSWER_SELECT_ONE_STEP2 &&
          this.step.id === BaseComponent.i.currentStepId
        ) {
          if (this.interval) {
            clearInterval(this.interval);
          }

          this.interval = setInterval(() => {
            this.int.randomData.timeLeft--;

            if (this.int.randomData.timeLeft < 0) {
              this.int.randomData.response = {
                didSkipManually: false,
                value: this.currentValue,
                type: 'select-one',
              };

              BaseComponent.i.goRight();
              clearInterval(this.interval);
            }
          }, 1000);
        }
      }, 1);
    });
  }

  onChange(e: any) {
    this.didAnswer = true;
    this.currentValue = e.target.value;
  }

  onNext() {
    this.didContinue = true;
    if (this.interval) {
      clearInterval(this.interval);
    }

    this.int.randomData.response = {
      didSkipManually: true,
      value: this.currentValue,
      type: 'select-one',
    };

    BaseComponent.i.goRight();
  }
}
