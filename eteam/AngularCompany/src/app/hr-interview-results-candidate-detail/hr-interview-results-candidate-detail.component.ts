import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import {
  InterviewResultsService,
  Candidate,
  CandidateData,
  Medal,
} from '../interview-results.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { Utils } from 'src/services/Utils';
import API from 'src/services/API';
import { DomSanitizer } from '@angular/platform-browser';

declare const createjs: any;

export enum MP3Status {
  READY,
  LOADING,
  PLAYING,
}

@Component({
  selector: 'app-hr-interview-results-candidate-detail',
  templateUrl: './hr-interview-results-candidate-detail.component.html',
  styleUrls: ['./hr-interview-results-candidate-detail.component.scss'],
})
export class HrInterviewResultsCandidateDetailComponent
  implements OnInit, OnDestroy {
  MP3Status = MP3Status;
  apiUrl = environment.api;
  @Input() set canId(val: number) {
    this.candidateId = val;
    setTimeout(() => {
      this.updateCandidate();
      console.log('Setting candidate');
    }, 500);
  }

  isAlive = true;

  candidateId: number;
  can: any = null;
  mailuUrl: string;
  canData: CandidateData;

  intId: number = null;

  mp3Perc = 0;
  mp3Status = MP3Status.READY;
  currentMp3 = null;

  constructor(
    public results: InterviewResultsService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
  ) {}

  print(obj) {
    return JSON.stringify(obj);
  }

  onNoteChange(newVal: string) {
    Utils.sendRequestToastSilent(
      'Notes update',
      API.updateInterviewNotes(
        this.intId,
        this.candidateId,
        {},
        { note: newVal },
      ),
    );
  }

  onStopMp3() {
    if (this.currentMp3) {
      this.currentMp3.stop();
      this.currentMp3 = null;
      this.mp3Status = MP3Status.READY;
      this.mp3Perc = 0;
    }
  }

  getMp4Src(mp4Id: string, isTemplate: boolean) {
    const url =
      environment.api +
      '/public/fm/mp4/' +
      (isTemplate ? 'T_' : '') +
      mp4Id +
      '/' +
      this.results.data.intTag +
      '.mp4';

    return url;
  }

  toSafeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  onStartMp3(mp3Id: string, isTemplate: boolean) {
    const url =
      environment.api +
      '/public/fm/mp3/' +
      (isTemplate ? 'T_' : '') +
      mp3Id +
      '/' +
      this.results.data.intTag +
      '.mp3';

    this.onStopMp3();
    this.mp3Status = MP3Status.LOADING;

    const cb = () => {
      if (this.currentMp3) {
        this.currentMp3.stop();
      }

      this.currentMp3 = createjs.Sound.play(url);
      this.currentMp3.on('complete', () => {
        this.mp3Status = MP3Status.READY;
        this.currentMp3 = null;
      });
      this.mp3Status = MP3Status.PLAYING;
    };

    if (createjs.Sound.loadComplete(url)) {
      cb();
    } else {
      createjs.Sound.on(
        'fileload',
        (event) => {
          if (event.id === url) {
            cb();
          }
        },
        this,
      );
    }

    createjs.Sound.registerSound(url, url);
  }

  onStartEmojiMp3(uuid: string, type: string) {
    const url = environment.api + '/public_tts/' + uuid + '_' + type + '.mp3';

    this.mp3Status = MP3Status.LOADING;

    const cb = () => {
      if (this.currentMp3) {
        this.currentMp3.stop();
      }

      this.currentMp3 = createjs.Sound.play(url);
      this.currentMp3.on('complete', () => {
        this.mp3Status = MP3Status.READY;
      });
      this.mp3Status = MP3Status.PLAYING;
    };

    if (createjs.Sound.loadComplete(url)) {
      cb();
    } else {
      createjs.Sound.on(
        'fileload',
        (event) => {
          if (event.id === url) {
            cb();
          }
        },
        this,
      );
    }

    createjs.Sound.registerSound(url, url);
  }

  ngOnInit() {
    this.mailuUrl = environment.mailu;

    this.route.params.subscribe(async (newParams) => {
      this.intId = +newParams.intId;
    });

    const mp3PercFrame = () => {
      setTimeout(() => {
        if (this.currentMp3) {
          this.mp3Perc = Math.min(
            100,
            Math.ceil(
              (this.currentMp3.position / this.currentMp3.duration) * 100,
            ),
          );
        }

        if (this.isAlive) {
          requestAnimationFrame(mp3PercFrame.bind(this));
        }
      }, 16);
    };

    requestAnimationFrame(mp3PercFrame.bind(this));
  }

  ngOnDestroy() {
    this.isAlive = false;
  }

  getMedalsDataForAnswer(can: any, answerId: string) {
    const data = this.getMedalsData(can, false);
    return data.find((d) => d.type === answerId).items;
  }

  getMedalsData(can: any, globalOnly: boolean) {
    const medals: any[] = [];

    if (globalOnly) {
      medals.push({
        type: 'global',
        typeName: 'Global Answers',
        items: [],
      });

      Object.keys(can.answersData.global).forEach((gKey) => {
        const medalData = this.results.getMedalVerbose(gKey);

        let percentageArr = this.results.data.candidates.map((c) => {
          return {
            id: c.id,
            val: c.answersData.global[gKey].result
              ? c.answersData.global[gKey].result
              : -1,
          };
        });
        percentageArr.sort((a, b) => (a.val > b.val ? -1 : 1));
        percentageArr = percentageArr.map((p) => p.id);
        const personIndex = percentageArr.indexOf(can.id);

        medals[0].items.push({
          type: can.answersData.global[gKey].medal,
          title: medalData.title,
          description: medalData.description,
          value: can.answersData.global[gKey].result,
          percentage:
            personIndex === -1
              ? 0
              : ((personIndex + 1) / percentageArr.length) * 100,
        });
      });
    } else {
      let i = -1;
      Object.keys(can.answersData.answers).forEach((answerId) => {
        medals.push({
          type: answerId,
          typeName: this.results.getAnswerType(answerId),
          items: [],
        });
        i++;

        Object.keys(can.answersData.answers[answerId]).forEach((medalId) => {
          const medalData = this.results.getMedalVerbose(medalId);

          let percentageArr = this.results.data.candidates.map((c) => {
            return {
              id: c.id,
              val: c.answersData.answers[answerId][medalId].result
                ? c.answersData.answers[answerId][medalId].result
                : -1,
            };
          });
          percentageArr.sort((a, b) => (a.val > b.val ? -1 : 1));
          percentageArr = percentageArr.map((p) => p.id);
          const personIndex = percentageArr.indexOf(can.id);

          medals[i].items.push({
            type: can.answersData.answers[answerId][medalId].medal,
            title: medalData.title,
            description: medalData.description,
            value: can.answersData.answers[answerId][medalId].result,
            percentage:
              personIndex === -1
                ? 0
                : Math.round(((personIndex + 1) / percentageArr.length) * 100),
          });
        });
      });
    }

    medals.forEach((m) => {
      m.items.sort((a, b) => {
        const aNum =
          a.type === 'gold'
            ? 5
            : a.type === 'silver'
            ? 4
            : a.type === 'bronze'
            ? 3
            : a.type === 'blue'
            ? 2
            : 0;
        const bNum =
          b.type === 'gold'
            ? 5
            : b.type === 'silver'
            ? 4
            : b.type === 'bronze'
            ? 3
            : b.type === 'blue'
            ? 2
            : 0;

        return aNum >= bNum ? -1 : 0;
      });
    });

    return medals;
  }

  getKeywords(text: string, keywords: string[]) {
    if (!keywords || !text) {
      return [];
    }

    return keywords.filter((k) => text.toLowerCase().includes(k.toLowerCase()));
  }

  isArray(i) {
    return Array.isArray(i);
  }

  async updateCandidate() {
    console.log(this.results);
    console.log(this.can);
    console.log('REEEE');
    await this.results.load(this.intId.toString());
    console.log('REEEE2');

    this.can = this.results.data.candidates.find(
      (c) => c.id === this.candidateId,
    );
    this.canData = this.results.canData.find(
      (c) => c.canId === this.candidateId,
    );

    console.log('REEEE3');
    const qpData = this.results.data.questions.map((q) => {
      const qObj: any = {
        uuid: q.uuid,
        name: q.name,
        qType: q.q.type,
        qData: null,
        aType: q.a.type,
        aData: null,
      };

      if (qObj.qType.id === 'text_question') {
        qObj.qData = {
          value: q.q.data.find((d) => {
            return d.data.type === 'question_text_message';
          }).value,
        };
      } else if (qObj.qType.id === 'mp3_question') {
        qObj.qData = {
          isTemplate: q.q.data.find((d) => {
            return d.data.type === 'question_mp3_source';
          }).isTemplate,
          src: q.q.data.find((d) => {
            return d.data.type === 'question_mp3_source';
          }).value,
          before: q.q.data.find((d) => {
            return d.data.type === 'question_mp3_beforetext';
          }).value,
          after: q.q.data.find((d) => {
            return d.data.type === 'question_mp3_aftertext';
          }).value,
        };
      } else if (qObj.qType.id === 'mp4_question') {
        qObj.qData = {
          isTemplate: q.q.data.find((d) => {
            return d.data.type === 'question_mp4_source';
          }).isTemplate,
          src: q.q.data.find((d) => {
            return d.data.type === 'question_mp4_source';
          }).value,
          before: q.q.data.find((d) => {
            return d.data.type === 'question_mp4_beforetext';
          }).value,
          after: q.q.data.find((d) => {
            return d.data.type === 'question_mp4_aftertext';
          }).value,
        };
      }

      console.log(q.uuid);
      console.log(this.can.medalsData.answers);

      const a = this.can.medalsData.answers.find((as) => as.uuid === q.uuid);

      qObj.selfReview = a.response.rating;

      if (qObj.aType.id === 'text_answer') {
        qObj.aData = {
          value: a.response.data.value,
          keywords: q.a.data.find((d) => {
            return d.data.type === 'answer_type_keywords';
          }).value,
        };
      } else if (qObj.aType.id === 'speak_answer') {
        qObj.aData = {
          value: a.response.data.value,
          type: this.can.medalsData.interviewType,
          keywords: q.a.data.find((d) => {
            return d.data.type === 'answer_speak_keywords';
          }).value,
          textValue:
            !this.can.answersData.sttObj ||
            !this.can.answersData.sttObj.data ||
            !this.can.answersData.sttObj.data[q.uuid]
              ? ''
              : this.can.answersData.sttObj.data[q.uuid].results[0]
                  .alternatives[0].transcript,
        };
      } else if (qObj.aType.id === 'select_one') {
        qObj.aData = {
          value: a.response.data.value,
          options: q.a.data.find(
            (d) => d.data.type === 'answer_selectone_options',
          ).value,
          correctOption: q.a.data.find(
            (d) => d.data.type === 'answer_selectone_correct',
          ).value,
        };
      } else if (qObj.aType.id === 'select_many') {
        qObj.aData = {
          value: a.response.data.value,
          options: q.a.data.find(
            (d) => d.data.type === 'answer_selectmany_options',
          ).value,
          correctOption: q.a.data.find(
            (d) => d.data.type === 'answer_selectmany_correct',
          ).value,
        };
      }

      return qObj;
    });

    console.log('REEEE4');
    this.canData.qpData = qpData;
    console.log('Setting ', qpData);
    console.log(this.canData.currentQuestion, 'aa');
  }

  getDate(dateStr: string): Date {
    return new Date(dateStr);
  }

  onQuestionMove(toAdd: number) {
    this.canData.currentQuestion += toAdd;
    this.onStopMp3();
  }

  getMedal(medalId: number): Medal {
    return this.results.data.medals.find((m) => m.id === medalId);
  }

  getNotOwnedMedalIds(): number[] {
    const medals = [];

    this.can.medails.gold.forEach((m) => medals.push(m));
    this.can.medails.silver.forEach((m) => medals.push(m));
    this.can.medails.bronze.forEach((m) => medals.push(m));

    return this.results.data.medals
      .filter((m) => !medals.includes(m.id))
      .map((m) => m.id);
  }
}
