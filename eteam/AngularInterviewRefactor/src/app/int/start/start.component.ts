import { Component, OnInit } from '@angular/core';
import { Step, StepTypes, BaseComponent } from '../base/base.component';
import { InterviewService, InterviewState } from 'src/app/interview.service';
import { __ } from 'src/app/utils.service';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { Router, ActivatedRoute } from '@angular/router';
import { CamService } from 'src/app/hardware/cam.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss'],
})
export class StartComponent implements OnInit {
  steps: Step[] = [];

  constructor(
    private int: InterviewService,
    private localize: LocalizeRouterService,
    private router: Router,
    private cam: CamService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    this.int.steps.next(this.steps);
    this.int.showButtonNext = false;
    this.int.showButtonPrevious = false;

    this.steps.push({
      validator: async () => true,
      id: 'interview_intro',
      type: StepTypes.TEXT,
      emojiTimer: true,
      emoji: '37_Goodwork',
      emojiMp3: '/assets/tts/en/' + 'interviewIntro_title' + '.mp3',
      startCallback: () => {
        this.int.setState(InterviewState.INTRO);
      },
      emojiCallback: () => {
        // next page
        BaseComponent.i.goRight();
      },
      data: {
        title: __('interviewIntro.title'),
        text: null,
        terms: {
          url: null,
          text: null,
        },
      },
    });

    let i = 0;
    for (const pair of this.int.serverData.pairs) {
      const q: any = pair.q;
      const a: any = pair.a;

      if (q.type.id === 1) {
        this.getTextQuestionSteps(pair, i).forEach((s) => {
          this.steps.push(s);
        });
      } else if (q.type.id === 2) {
        this.getMp3QuestionSteps(pair, i).forEach((s) => {
          this.steps.push(s);
        });
      } else if (q.type.id === 3) {
        this.getMp4QuestionSteps(pair, i).forEach((s) => {
          this.steps.push(s);
        });
      } else if (q.type.id === 4) {
        this.getImgQuestionSteps(pair, i).forEach((s) => {
          this.steps.push(s);
        });
      }

      if (a.type.id === 1) {
        this.getTypeAnswerSteps(pair, i).forEach((s) => {
          this.steps.push(s);
        });
      } else if (a.type.id === 2) {
        this.getSpeakAnswerSteps(pair, i).forEach((s) => {
          this.steps.push(s);
        });
      } else if (a.type.id === 3) {
        this.getSelectOneAnswerSteps(pair, i).forEach((s) => {
          this.steps.push(s);
        });
      } else if (a.type.id === 4) {
        this.getSelectManyAnswerSteps(pair, i).forEach((s) => {
          this.steps.push(s);
        });
      }

      this.getSelfReviewSteps(pair, i).forEach((s) => {
        this.steps.push(s);
      });

      i++;
    }

    this.steps.push({
      validator: async () => true,
      id: 'interview_endsubmit',
      type: StepTypes.TEXT,
      emojiTimer: true,
      emoji: '22_Cool',
      emojiMp3: '/assets/tts/en/' + 'interviewIntro_lastQuestion' + '.mp3',
      emojiTimerStart: async () => {
        // TODO: Vrat spat
        // if(this.int.isPreview) {
        //   return;
        // }

        try {
          await this.int.submitInterview();
          BaseComponent.i.goRight();
        } catch (err) {
          const translatedPath: any = this.localize.translateRoute(
            '/submit-error',
          );
          this.router.navigate([translatedPath]);
        }
      },
      data: {
        title: __('interviewIntro.lastQuestion'),
        text: null,
        terms: {
          url: null,
          text: null,
        },
      },
    });

    const isPreview = this.int.isPreview;

    if (isPreview) {
      this.steps.push({
        validator: async () => true,
        id: 'interview_endfinish',
        type: StepTypes.TEXT,
        emojiTimer: true,
        emoji: '37_Goodwork',
        emojiMp3: '/assets/tts/en/' + 'interviewIntro_finishPreview' + '.mp3',
        data: {
          title: __('interviewIntro.finishPreview'),
          text: null,
          terms: {
            url: null,
            text: null,
          },
        },
      });
    } else {
      this.steps.push({
        validator: async () => true,
        id: 'interview_endfinish',
        type: StepTypes.TEXT,
        emojiTimer: true,
        emoji: '37_Goodwork',
        emojiMp3: '/assets/tts/en/' + 'interviewIntro_finish' + '.mp3',
        data: {
          title: __('interviewIntro.finish'),
          text: null,
          terms: {
            url: null,
            text: null,
          },
        },
      });
    }
  }

  getSelfReviewSteps(currentPair: any, questionIndex: number): any[] {
    const resArr = [];

    resArr.push({
      validator: async () => true,
      id: 'interview_selfreview_step1_' + questionIndex,
      type: StepTypes.SELF_REVIEW,
      emojiTimer: true,
      emoji: '49_Yes',
      emojiMp3: '/assets/tts/en/' + 'interview_selfreview_text' + '.mp3',
      startCallback: () => {
        this.int.randomData.imgSrc = null;
        this.int.randomData.timeLeft = 15;

        this.int.setState(InterviewState.SELF_REVIEW_STEP1);
      },
      emojiCallback: () => {
        this.int.randomData.timeLeft = 15;
        this.int.setState(InterviewState.SELF_REVIEW_STEP2);
        // will go right from component review
      },
      data: {
        pair: currentPair,
        title: __('interview.selfreview.text'),
        text: null,
        terms: {
          url: null,
          text: null,
        },
      },
    });

    resArr.push({
      validator: async () => true,
      id: 'interview_selfreview_step2_' + questionIndex,
      type: StepTypes.TEXT,
      emojiTimer: true,
      emoji: '37_Goodwork',
      emojiMp3: '/assets/tts/en/' + 'interview_selfreview_after' + '.mp3',
      emojiCallback: () => {
        BaseComponent.i.goRight();
      },
      data: {
        pair: currentPair,
        title: __('interview.selfreview.after'),
        text: null,
        terms: {
          url: null,
          text: null,
        },
      },
    });

    return resArr;
  }

  getTypeAnswerSteps(currentPair: any, questionIndex: number): any[] {
    const a: any = currentPair.a;

    const resArr = [];

    resArr.push({
      validator: async () => true,
      id: 'interview_answer_type_step0_' + questionIndex,
      type: StepTypes.TEXT,
      emojiTimer: true,
      emoji: '13_Breathe',
      emojiMp3: '/assets/tts/en/' + 'interview_answers_prepareTime' + '.mp3',
      emojiAddationalTime: a.data.prepareTime,
      emojiCallback: () => {
        BaseComponent.i.goRight();
      },
      data: {
        title: __('interview.answers.prepareTime'),
        text: '>>currentQuestion',
        terms: {
          url: null,
          text: null,
        },
        pair: currentPair,
      },
    });

    resArr.push({
      validator: async () => true,
      id: 'interview_answer_type_step1_' + questionIndex,
      type: StepTypes.INTERVIEW_ANSWER_TEXT,
      emojiTimer: true,
      emoji: '08_Pokerface',
      emojiMp3: '/assets/tts/en/' + 'interview_answers_type' + '.mp3',
      startCallback: () => {
        this.int.randomData.timeLeft = currentPair.answerTime;

        this.int.setState(InterviewState.ANSWER_TYPE_STEP1);
      },
      emojiCallback: () => {
        this.int.randomData.timeLeft = currentPair.answerTime;
        this.int.setState(InterviewState.ANSWER_TYPE_STEP2);
      },
      data: {
        title: __('interview.answers.type'),
        text: null,
        terms: {
          url: null,
          text: null,
        },
        pair: currentPair,
      },
    });

    return resArr;
  }

  getSpeakAnswerSteps(currentPair: any, questionIndex: number): any[] {
    const a: any = currentPair.a;

    const resArr = [];

    resArr.push({
      validator: async () => true,
      id: 'interview_answer_speak_step0_' + questionIndex,
      type: StepTypes.TEXT,
      emojiTimer: true,
      emoji: '13_Breathe',
      emojiMp3: '/assets/tts/en/' + 'interview_answers_prepareTime' + '.mp3',
      emojiAddationalTime: a.data.prepareTime,
      emojiCallback: () => {
        BaseComponent.i.goRight();
      },
      data: {
        title: __('interview.answers.prepareTime'),
        text: '>>currentQuestion',
        terms: {
          url: null,
          text: null,
        },
        pair: currentPair,
      },
    });

    resArr.push({
      validator: async () => true,
      id: 'interview_answer_speak_step1_' + questionIndex,
      type: StepTypes.INTERVIEW_ANSWER_SPEAK,
      emojiTimer: true,
      emoji: '08_Pokerface',
      emojiMp3: '/assets/tts/en/' + 'interview_answers_speak' + '.mp3',
      startCallback: () => {
        this.int.randomData.timeLeft = currentPair.answerTime;

        this.int.setState(InterviewState.ANSWER_SPEAK_STEP1);
      },
      emojiCallback: () => {
        this.int.randomData.timeLeft = currentPair.answerTime;
        this.int.setState(InterviewState.ANSWER_SPEAK_STEP2);
      },
      data: {
        title: __('interview.answers.speak'),
        text: null,
        terms: {
          url: null,
          text: null,
        },
        pair: currentPair,
      },
    });

    return resArr;
  }

  getSelectOneAnswerSteps(currentPair: any, questionIndex: number): any[] {
    const a: any = currentPair.a;

    const resArr = [];

    resArr.push({
      validator: async () => true,
      id: 'interview_answer_selectone_step1_' + questionIndex,
      type: StepTypes.INTERVIEW_ANSWER_SELECT_ONE,
      emojiTimer: true,
      emoji: '08_Pokerface',
      emojiMp3: '/assets/tts/en/' + 'interview_answers_selectOne' + '.mp3',
      startCallback: () => {
        this.int.randomData.timeLeft = currentPair.answerTime;
        this.int.randomData.options = currentPair.a.data.options;
        this.int.setState(InterviewState.ANSWER_SELECT_ONE_STEP1);
      },
      emojiCallback: () => {
        this.int.randomData.timeLeft = currentPair.answerTime;
        this.int.setState(InterviewState.ANSWER_SELECT_ONE_STEP2);
        // will go right from inner component
      },
      data: {
        title: __('interview.answers.selectOne'),
        text: null,
        terms: {
          url: null,
          text: null,
        },
        pair: currentPair,
      },
    });

    return resArr;
  }

  getSelectManyAnswerSteps(currentPair: any, questionIndex: number): any[] {
    const a: any = currentPair.a;

    const resArr = [];

    resArr.push({
      validator: async () => true,
      id: 'interview_answer_selectmany_step1_' + questionIndex,
      type: StepTypes.INTERVIEW_ANSWER_SELECT_MANY,
      emojiTimer: true,
      emoji: '08_Pokerface',
      emojiMp3: '/assets/tts/en/' + 'interview_answers_selectMany' + '.mp3',
      startCallback: () => {
        this.int.randomData.timeLeft = currentPair.answerTime;
        this.int.randomData.options = currentPair.a.data.options;
        this.int.setState(InterviewState.ANSWER_SELECT_MANY_STEP1);
      },
      emojiCallback: () => {
        this.int.randomData.timeLeft = currentPair.answerTime;
        this.int.setState(InterviewState.ANSWER_SELECT_MANY_STEP2);
        // will go right from inner component
      },
      data: {
        title: __('interview.answers.selectMany'),
        text: null,
        terms: {
          url: null,
          text: null,
        },
        pair: currentPair,
      },
    });

    return resArr;
  }

  getMp3QuestionSteps(currentPair: any, questionIndex: number): any[] {
    const q: any = currentPair.q;

    const resArr = [];

    resArr.push({
      validator: async () => true,
      id: 'interview_question_mp3_step1_' + questionIndex,
      type: StepTypes.TEXT,
      emojiTimer: true,
      emoji: '08_Pokerface',
      emojiMp3: '/assets/tts/en/' + 'interview_questions_mp3_text' + '.mp3',
      emojiCallback: () => {
        BaseComponent.i.goRight();
      },
      data: {
        pair: currentPair,
        title: __('interview.questions.mp3.text'),
        text: null,
        terms: {
          url: null,
          text: null,
        },
      },
    });

    resArr.push({
      validator: async () => true,
      id: 'interview_question_mp3_step2_' + questionIndex,
      type: StepTypes.INTERVIEW_QUESTION_MP3,
      emojiTimer: true,
      emoji: '28_Wonder',
      emojiMp3: q.data.beforeTextMp3,
      emojiAddationalTime: q.data.beforeTextReadtime,
      startCallback: () => {
        this.int.randomData.currentId =
          'interview_question_mp3_step2_' + questionIndex;
        this.int.randomData.src = q.data.src;
        this.int.randomData.currentQuestion =
          q.data.afterText !== 'NULL' ? q.data.afterText : '';

        this.int.setState(InterviewState.QUESTION_MP3_STEP1);
      },
      emojiCallback: () => {
        this.int.setState(InterviewState.QUESTION_MP3_STEP2);
        // Will go right from mp3 question component, when MP3 file ends
      },
      data: {
        pair: currentPair,
        title: q.data.beforeText,
        text: null,
        terms: {
          url: null,
          text: null,
        },
      },
    });

    if (q.data.afterText !== 'NULL') {
      resArr.push({
        validator: async () => true,
        id: 'interview_question_mp3_step3_' + questionIndex,
        type: StepTypes.TEXT,
        emojiTimer: true,
        emoji: '08_Pokerface',
        emojiMp3: q.data.afterTextMp3,
        emojiAddationalTime: q.data.afterTextReadtime,
        emojiCallback: () => {
          BaseComponent.i.goRight();
        },
        data: {
          pair: currentPair,
          title: q.data.afterText,
          text: null,
          terms: {
            url: null,
            text: null,
          },
        },
      });
    }

    return resArr;
  }

  getImgQuestionSteps(currentPair: any, questionIndex: number): any[] {
    const q: any = currentPair.q;
    console.log(q);

    const resArr = [];

    resArr.push({
      validator: async () => true,
      id: 'interview_question_img_step1_' + questionIndex,
      type: StepTypes.TEXT,
      emojiTimer: true,
      emoji: '08_Pokerface',
      emojiMp3: '/assets/tts/en/' + 'interview_questions_img_text' + '.mp3',
      emojiCallback: () => {
        BaseComponent.i.goRight();
      },
      data: {
        pair: currentPair,
        title: __('interview.questions.img.text'),
        text: null,
        terms: {
          url: null,
          text: null,
        },
      },
    });

    resArr.push({
      validator: async () => true,
      id: 'interview_question_img_step1_' + questionIndex,
      type: StepTypes.INTERVIEW_QUESTION_IMAGE,
      emojiTimer: true,
      emoji: '28_Wonder',
      emojiMp3: q.data.beforeTextMp3,
      emojiAddationalTime: q.data.beforeTextReadtime
        ? q.data.beforeTextReadtime + 5
        : 5,
      startCallback: () => {
        this.int.randomData.currentId =
          'interview_question_img_step1_' + questionIndex;
        this.int.randomData.src = q.data.src;
        this.int.randomData.imgSrc = q.data.src;
        this.int.randomData.currentQuestion =
          q.data.afterText !== 'NULL' ? q.data.afterText : '';

        this.int.setState(InterviewState.QUESTION_IMG_STEP1);
      },
      emojiCallback: () => {
        this.int.setState(InterviewState.QUESTION_IMG_STEP2);
        BaseComponent.i.goRight();
      },
      data: {
        pair: currentPair,
        title: q.data.beforeText,
        text: null,
        terms: {
          url: null,
          text: null,
        },
      },
    });

    if (q.data.afterText !== 'NULL') {
      resArr.push({
        validator: async () => true,
        id: 'interview_question_img_step3_' + questionIndex,
        type: StepTypes.TEXT,
        emojiTimer: true,
        emoji: '08_Pokerface',
        emojiMp3: q.data.afterTextMp3,
        emojiAddationalTime: q.data.afterTextReadtime,
        emojiCallback: () => {
          BaseComponent.i.goRight();
        },
        data: {
          pair: currentPair,
          title: q.data.afterText,
          text: null,
          terms: {
            url: null,
            text: null,
          },
        },
      });
    }
    return resArr;
  }

  getMp4QuestionSteps(currentPair: any, questionIndex: number): any[] {
    const q: any = currentPair.q;

    const resArr = [];

    resArr.push({
      validator: async () => true,
      id: 'interview_question_mp4_step1_' + questionIndex,
      type: StepTypes.TEXT,
      emojiTimer: true,
      emoji: '08_Pokerface',
      emojiMp3: '/assets/tts/en/' + 'interview_questions_mp4_text' + '.mp3',
      emojiCallback: () => {
        BaseComponent.i.goRight();
      },
      data: {
        pair: currentPair,
        title: __('interview.questions.mp4.text'),
        text: null,
        terms: {
          url: null,
          text: null,
        },
      },
    });

    resArr.push({
      validator: async () => true,
      id: 'interview_question_mp4_step2_' + questionIndex,
      type: StepTypes.INTERVIEW_QUESTION_MP4,
      emojiTimer: true,
      emoji: '28_Wonder',
      emojiMp3: q.data.beforeTextMp3,
      emojiAddationalTime: q.data.beforeTextReadtime,
      startCallback: () => {
        this.int.randomData.currentId =
          'interview_question_mp4_step2_' + questionIndex;
        this.int.randomData.src = q.data.src;
        this.int.randomData.currentQuestion =
          q.data.afterText !== 'NULL' ? q.data.afterText : '';

        this.int.setState(InterviewState.QUESTION_MP4_STEP1);
      },
      emojiCallback: () => {
        this.int.setState(InterviewState.QUESTION_MP4_STEP2);
        // Will go right from mp3 question component, when MP3 file ends
      },
      data: {
        pair: currentPair,
        title: q.data.beforeText,
        text: null,
        terms: {
          url: null,
          text: null,
        },
      },
    });

    if (q.data.afterText !== 'NULL') {
      resArr.push({
        validator: async () => true,
        id: 'interview_question_mp4_step3_' + questionIndex,
        type: StepTypes.TEXT,
        emojiTimer: true,
        emoji: '08_Pokerface',
        emojiMp3: q.data.afterTextMp3,
        emojiAddationalTime: q.data.afterTextReadtime,
        emojiCallback: () => {
          BaseComponent.i.goRight();
        },
        data: {
          pair: currentPair,
          title: q.data.afterText,
          text: null,
          terms: {
            url: null,
            text: null,
          },
        },
      });
    }
    return resArr;
  }

  getTextQuestionSteps(currentPair: any, questionIndex: number): any[] {
    const q: any = currentPair.q;

    const resArr = [];

    resArr.push({
      validator: async () => true,
      id: 'interview_question_text_step1_' + questionIndex,
      type: StepTypes.TEXT,
      emojiTimer: true,
      emoji: '08_Pokerface',
      emojiMp3: '/assets/tts/en/' + 'interview_questions_text' + '.mp3',
      startCallback: () => {
        this.int.setState(InterviewState.QUESTION_TEXT_STEP1);
      },
      emojiCallback: () => {
        BaseComponent.i.goRight();
      },
      data: {
        pair: currentPair,
        title: __('interview.questions.text'),
        text: null,
        terms: {
          url: null,
          text: null,
        },
      },
    });

    resArr.push({
      validator: async () => true,
      id: 'interview_question_text_step2_' + questionIndex,
      type: StepTypes.TEXT,
      emojiTimer: true,
      emoji: '28_Wonder',
      emojiMp3: q.data.textMp3,
      emojiAddationalTime: q.data.readTime,
      startCallback: () => {
        this.int.setState(InterviewState.QUESTION_TEXT_STEP2);
        this.int.randomData.currentQuestion = currentPair.q.data.text;
      },
      emojiCallback: () => {
        BaseComponent.i.goRight();
      },
      data: {
        pair: currentPair,
        title: q.data.text,
        text: null,
        terms: {
          url: null,
          text: null,
        },
      },
    });

    return resArr;
  }
}
