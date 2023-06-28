import { Component, Input, OnInit } from '@angular/core';
import { AssistentService } from 'src/app/assistent.service';
import { InterviewService, InterviewState } from 'src/app/interview.service';
import { __ } from 'src/app/utils.service';
import { BaseComponent, Step } from '../../base/base.component';

@Component({
  selector: 'app-question-img',
  templateUrl: './question-img.component.html',
  styleUrls: ['./question-img.component.scss'],
})
export class QuestionImgComponent implements OnInit {
  @Input() step: Step;
  InterviewState = InterviewState;

  id;
  title = '';
  showPlayText = false;
  player;

  constructor(
    public int: InterviewService,
    private assistent: AssistentService,
  ) {
    this.id = 'img-player-' + Date.now();
  }

  ngOnInit() {
    this.title = this.step.data.title;

    // this.int.stateChangeSubject.subscribe((newState) => {
    //   if (newState === InterviewState.QUESTION_IMG_STEP1) {
    //   }
    // });
  }
}
