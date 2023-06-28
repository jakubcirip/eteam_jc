import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanActivateChild,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AssistentService } from './assistent.service';
import { InterviewService } from './interview.service';

@Injectable({
  providedIn: 'root',
})
export class EmojiMp3Guard implements CanActivate, CanActivateChild {
  mp3Paths = [
    '/assets/tts/en/' + 'interviewIntro_title' + '.mp3',
    '/assets/tts/en/' + 'emojiIntroduction_title' + '.mp3',
    '/assets/tts/en/' + 'prelog_title' + '.mp3',
    '/assets/tts/en/' + 'formular_title' + '.mp3',
    '/assets/tts/en/' + 'hardware_title' + '.mp3',
    '/assets/tts/en/' + 'hardwareTest_title' + '.mp3',
    '/assets/tts/en/' + 'introSummary_title' + '.mp3',
    '/assets/tts/en/' + 'interview_questions_text' + '.mp3',
    '/assets/tts/en/' + 'interview_answers_type' + '.mp3',
    '/assets/tts/en/' + 'interview_selfreview_text' + '.mp3',
    '/assets/tts/en/' + 'interview_selfreview_after' + '.mp3',
    '/assets/tts/en/' + 'interview_questions_mp3_text' + '.mp3',
    '/assets/tts/en/' + 'interview_questions_img_text' + '.mp3',
    '/assets/tts/en/' + 'interview_questions_mp3_textRepeat' + '.mp3',
    '/assets/tts/en/' + 'interview_questions_mp4_textRepeat' + '.mp3',
    '/assets/tts/en/' + 'interview_questions_mp4_text' + '.mp3',
    '/assets/tts/en/' + 'interview_answers_selectOne' + '.mp3',
    '/assets/tts/en/' + 'interview_answers_selectMany' + '.mp3',
    '/assets/tts/en/' + 'interview_answers_prepareTime' + '.mp3',
    '/assets/tts/en/' + 'interview_answers_speak' + '.mp3',
    '/assets/tts/en/' + 'interviewIntro_lastQuestion' + '.mp3',
    '/assets/tts/en/' + 'interviewIntro_finish' + '.mp3',
    '/assets/tts/en/' + 'interviewIntro_finishPreview' + '.mp3',
  ];

  constructor(
    private assistent: AssistentService,
    private int: InterviewService,
  ) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Promise<boolean> {
    await new Promise((res, rej) => {
      let i = 0;
      const int = setInterval(() => {
        i++;

        if (i > 50) {
          clearInterval(int);
          res();
        }

        if (
          this.int.serverData &&
          this.int.serverData.pairs &&
          this.int.serverData.pairs.length > 0
        ) {
          clearInterval(int);
          res();
        }
      }, 100);
    });

    for (const pair of this.int.serverData.pairs) {
      const q: any = pair.q;

      const qKeys = ['textMp3', 'afterTextMp3', 'beforeTextMp3'];

      for (const k of qKeys) {
        if (q.data[k]) {
          this.mp3Paths.push(q.data[k]);
        }
      }
    }

    await Promise.all(
      this.mp3Paths.map(async (path) => {
        await this.assistent.registerEmojiMp3(path);
      }),
    );

    return true;
  }

  async canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Promise<boolean> {
    const res = await this.canActivate(next, state);
    return res;
  }
}
