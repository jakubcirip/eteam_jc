import { Component, OnInit, Input } from '@angular/core';
import { Step, BaseComponent } from '../../base/base.component';
import { InterviewState, InterviewService } from 'src/app/interview.service';

@Component({
  selector: 'app-self-review',
  templateUrl: './self-review.component.html',
  styleUrls: ['./self-review.component.scss'],
})
export class SelfReviewComponent implements OnInit {
  @Input() step: Step;

  InterviewState = InterviewState;
  didAnswer = false;
  didContinue = false;
  interval;
  currentRating = 0;

  constructor(public int: InterviewService) {}

  ngOnInit() {
    this.int.stateChangeSubject.subscribe((newState) => {
      if (this.didContinue) {
        return;
      }

      if (
        newState === InterviewState.SELF_REVIEW_STEP2 &&
        this.step.id === BaseComponent.i.currentStepId
      ) {
        if (this.interval) {
          clearInterval(this.interval);
        }

        this.interval = setInterval(() => {
          this.int.randomData.timeLeft--;

          if (this.int.randomData.timeLeft < 0) {
            const answerData = this.int.randomData.response;
            const currentUuid =
              BaseComponent.i.steps[BaseComponent.i.currentPage].data.pair.uuid;

            this.int.questionAnswers.push({
              uuid: currentUuid,
              response: {
                data: answerData,
                rating: this.currentRating,
                didSkipRating: false,
              },
            });

            clearInterval(this.interval);
            BaseComponent.i.goRight();
          }
        }, 1000);
      }
    });
  }

  onInputChange(rate: number) {
    this.didAnswer = true;
    this.currentRating = rate;
  }

  onNext() {
    this.didContinue = true;
    if (this.interval) {
      clearInterval(this.interval);
    }

    const answerData = this.int.randomData.response;
    const currentUuid =
      BaseComponent.i.steps[BaseComponent.i.currentPage].data.pair.uuid;

    this.int.questionAnswers.push({
      uuid: currentUuid,
      response: {
        data: answerData ? answerData : {},
        rating: this.currentRating,
        didSkipRating: true,
      },
    });

    console.log({
      uuid: currentUuid,
      response: {
        data: answerData,
        rating: this.currentRating,
      },
    });

    BaseComponent.i.goRight();
  }
}
