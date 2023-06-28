import { Component, OnInit, Input } from '@angular/core';
import { Step, BaseComponent } from '../../base/base.component';
import { InterviewState, InterviewService } from 'src/app/interview.service';

@Component({
  selector: 'app-answer-select-many',
  templateUrl: './answer-select-many.component.html',
  styleUrls: ['./answer-select-many.component.scss'],
})
export class AnswerSelectManyComponent implements OnInit {
  @Input() step: Step;
  InterviewState = InterviewState;

  didAnswer = false;
  didContinue = false;
  interval;
  name;

  currentValue = [];

  constructor(public int: InterviewService) {
    this.name = 'answer-select-many-' + Date.now();
  }

  ngOnInit() {
    this.int.stateChangeSubject.subscribe((newState) => {
      setTimeout(() => {
        $('.opti-list ul .clickable').on('click', (el) => {
          $(el.currentTarget)
            .find('input[type=checkbox]')
            .prop(
              'checked',
              !$(el.currentTarget).find('input[type=checkbox]').prop('checked'),
            );

          const input = $(el.currentTarget).find('input[type=checkbox]');

          const val = input.val();

          if ($(el.currentTarget).hasClass('active')) {
            $(el.currentTarget).removeClass('active');
          } else {
            $(el.currentTarget).addClass('active');
          }
          this.onChange(val);
        });

        if (this.didContinue) {
          return;
        }

        if (
          newState === InterviewState.ANSWER_SELECT_MANY_STEP2 &&
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
                type: 'select-many',
              };

              BaseComponent.i.goRight();
              clearInterval(this.interval);
            }
          }, 1000);
        }
      }, 100);
    });
  }

  onChange(val: any) {
    if (this.currentValue.includes(val)) {
      this.currentValue = this.currentValue.filter((e) => e !== val);
    } else {
      this.currentValue.push(val);
    }

    this.didAnswer = true;
  }

  onNext() {
    this.didContinue = true;
    if (this.interval) {
      clearInterval(this.interval);
    }

    this.int.randomData.response = {
      didSkipManually: true,
      value: this.currentValue,
      type: 'select-many',
    };

    BaseComponent.i.goRight();
  }
}
