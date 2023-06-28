import { Component, OnInit, Input } from '@angular/core';
import { Step, BaseComponent } from '../../base/base.component';
import { InterviewService, InterviewState } from 'src/app/interview.service';
import { AssistentService } from 'src/app/assistent.service';
import { __ } from 'src/app/utils.service';

@Component({
  selector: 'app-question-mp4',
  templateUrl: './question-mp4.component.html',
  styleUrls: ['./question-mp4.component.scss'],
})
export class QuestionMp4Component implements OnInit {
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
    this.id = 'mp4-player-' + Date.now();
  }

  ngOnInit() {
    this.title = this.step.data.title;

    this.int.stateChangeSubject.subscribe((newState) => {
      if (
        newState === InterviewState.QUESTION_MP4_STEP1 &&
        this.step.id === this.int.randomData.currentId
      ) {
        console.log('New state');
        setTimeout(() => {
          this.player = new Plyr('#' + this.id, {
            autoplay: false,
            volume: 1,
            muted: false,
            clickToPlay: false,
            controls: [
              'play-large',
              'play',
              'progress',
              'current-time',
              'mute',
              'volume',
              'captions',
              'settings',
              'pip',
              'airplay',
              'fullscreen',
            ],
          });

          this.player.on('ready', () => {
            setTimeout(() => {
              $('.plyr__progress input').attr('disabled', '');
            }, 100);
          });

          let i = 0;
          this.player.on('ended', () => {
            console.log('Ended');
            i++;
            if (i > 1) {
              setTimeout(() => {
                BaseComponent.i.goRight();
              }, 1000);
              return;
            }
            setTimeout(() => {
              this.title = __('interview.questions.mp4.textRepeat');
              this.assistent.setEmoji({
                emojiCallback: () => {
                  this.player.stop();
                  setTimeout(() => {
                    this.player.play();
                  }, 100);
                },
                emojiTimer: true,
                emojiMp3:
                  '/assets/tts/en/' +
                  'interview_questions_mp4_textRepeat' +
                  '.mp3',
                emoji: '15_Angel',
              });
            }, 1000);
          });
        }, 1);
      } else if (
        newState === InterviewState.QUESTION_MP4_STEP2 &&
        this.step.id === this.int.randomData.currentId
      ) {
        this.showPlayText = true;
        this.player.play();
      }
    });
  }

  onClickToPlay() {
    if (this.player) {
      this.player.play();
    }
  }
}
