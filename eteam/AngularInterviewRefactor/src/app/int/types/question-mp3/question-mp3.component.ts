import { Component, OnInit, Input } from '@angular/core';
import { Step, BaseComponent } from '../../base/base.component';
import { InterviewState, InterviewService } from 'src/app/interview.service';
import { AssistentService } from 'src/app/assistent.service';
import { __ } from 'src/app/utils.service';

@Component({
  selector: 'app-question-mp3',
  templateUrl: './question-mp3.component.html',
  styleUrls: ['./question-mp3.component.scss'],
})
export class QuestionMp3Component implements OnInit {
  @Input() step: Step;
  InterviewState = InterviewState;

  id;
  title = '';

  constructor(
    public int: InterviewService,
    private assistent: AssistentService,
  ) {
    this.id = 'mp3-player-' + Date.now();
  }

  ngOnInit() {
    this.title = this.step.data.title;

    let player;

    this.int.stateChangeSubject.subscribe((newState) => {
      if (newState === InterviewState.QUESTION_MP3_STEP1) {
        setTimeout(() => {
          player = new Plyr('#' + this.id, {
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

          player.on('ready', () => {
            setTimeout(() => {
              $('.plyr__progress input').attr('disabled', '');
            }, 100);
          });

          let i = 0;
          player.on('ended', () => {
            i++;
            if (i > 1) {
              setTimeout(() => {
                BaseComponent.i.goRight();
              }, 1000);
              return;
            }
            setTimeout(() => {
              this.title = __('interview.questions.mp3.textRepeat');
              this.assistent.setEmoji({
                emojiCallback: () => {
                  player.stop();
                  setTimeout(() => {
                    player.play();
                  }, 100);
                },
                emojiTimer: true,
                emojiMp3:
                  '/assets/tts/en/' +
                  'interview_questions_mp3_textRepeat' +
                  '.mp3',
                emoji: '15_Angel',
              });
            }, 1000);
          });
        }, 1);
      } else if (newState === InterviewState.QUESTION_MP3_STEP2) {
        player.play();
      }
    });
  }
}
