import { Injectable } from '@angular/core';
import API, { InterviewData, InterviewPeople } from 'src/services/API';
import { Utils } from 'src/services/Utils';

export enum ResultsOrderType {
  TOTAL = 'Total Points',
  GOLD = 'Gold Medals',
  SILVER = 'Silver Medals',
  BRONZE = 'Bronze Medals',
  ID = 'ID',
  BLUE = 'Boolean Points',
}

export enum ResultsOrderDirection {
  DESC = 'Descending',
  ASC = 'Ascending',
}

export interface Candidate {
  id: number;
  name: string;
  email: string;
  totalMedalPoints: number;
  medails: {
    bronze: number[];
    silver: number[];
    gold: number[];
  };
  answers: string[];
  answerDate: string;
  overallRating: number;
  selfDescription: string;
  uid: number;
}

export interface Medal {
  id: number;
  title: string;
  description: string;
}

export interface ResultData {
  intName: string;
  medals: Medal[];
  failedCandidates: FailedCandidate[];
  questions: string[];
  candidates: Candidate[];
}

export interface FailedCandidate {
  id: number;
  name: string;
  email: string;
}

export interface CandidateData {
  canId: number;
  currentQuestion: number;
  qpData: any[];
}

declare const Swal: any;

@Injectable({
  providedIn: 'root',
})
export class InterviewResultsService {
  data: any = null;

  currentOrderType = ResultsOrderType.ID;
  currentOrderDir = ResultsOrderDirection.ASC;

  selectedCans: number[] = [];
  allSelected = false;

  canData: CandidateData[] = [];

  constructor() {}

  async load(intId: string) {
    if (this.data !== null) {
      return true;
    }

    try {
      const data = await API.getInterviewPeople(intId);
      this.data = data;

      this.generateCandidateData();

      console.log(this.data);

      return true;
    } catch (exp) {
      Swal.fire({
        type: 'error',
        title: 'Cant load data',
        text: Utils.getErrorMessage(exp),
      });

      return false;
    }
  }

  generateCandidateData() {
    this.canData = this.data.candidates.map((c) => {
      return {
        canId: c.id,
        currentQuestion: 0,
        qpData: [],
      };
    });
  }

  getCurrentOrder() {
    return `${this.currentOrderType}, ${this.currentOrderDir}`;
  }

  getTotalPoints(can: any) {
    if (!can.answersData) {
      return 0;
    }

    let totalpoints = 0;

    Object.keys(can.answersData.global).forEach((gKey) => {
      totalpoints += can.answersData.global[gKey].result;
    });

    Object.keys(can.answersData.answers).forEach((answerId) => {
      Object.keys(can.answersData.answers[answerId]).forEach((medalId) => {
        totalpoints += can.answersData.answers[answerId][medalId].result;
      });
    });

    return totalpoints;
  }

  getTotalMedals(can: any, type: string) {
    if (!can.answersData) {
      return 0;
    }

    let totalMedals = 0;

    Object.keys(can.answersData.global).forEach((gKey) => {
      if (can.answersData.global[gKey].medal === type) {
        totalMedals++;
      }
    });

    Object.keys(can.answersData.answers).forEach((answerId) => {
      Object.keys(can.answersData.answers[answerId]).forEach((medalId) => {
        if (can.answersData.answers[answerId][medalId].medal === type) {
          totalMedals++;
        }
      });
    });

    return totalMedals;
  }

  orderBy(type: ResultsOrderType) {
    if (this.currentOrderType !== type) {
      this.currentOrderType = type;
      this.currentOrderDir = ResultsOrderDirection.DESC;
    } else {
      this.currentOrderType = type;
      this.currentOrderDir =
        this.currentOrderDir === ResultsOrderDirection.DESC
          ? ResultsOrderDirection.ASC
          : ResultsOrderDirection.DESC;
    }

    const i1 = this.currentOrderDir === ResultsOrderDirection.DESC ? -1 : 1;
    const i2 = i1 === 1 ? -1 : 1;

    switch (this.currentOrderType) {
      case ResultsOrderType.TOTAL:
        this.data.candidates.sort((can1, can2) =>
          this.getTotalPoints(can1) > this.getTotalPoints(can2) ? i1 : i2,
        );
        break;
      case ResultsOrderType.GOLD:
        this.data.candidates.sort((can1, can2) =>
          this.getTotalMedals(can1, 'gold') > this.getTotalMedals(can2, 'gold')
            ? i1
            : i2,
        );
        break;
      case ResultsOrderType.SILVER:
        this.data.candidates.sort((can1, can2) =>
          this.getTotalMedals(can1, 'silver') >
          this.getTotalMedals(can2, 'silver')
            ? i1
            : i2,
        );
        break;
      case ResultsOrderType.BRONZE:
        this.data.candidates.sort((can1, can2) =>
          this.getTotalMedals(can1, 'bronze') >
          this.getTotalMedals(can2, 'bronze')
            ? i1
            : i2,
        );
        break;
      case ResultsOrderType.BLUE:
        this.data.candidates.sort((can1, can2) =>
          this.getTotalMedals(can1, 'blue') > this.getTotalMedals(can2, 'blue')
            ? i1
            : i2,
        );
        break;
      case ResultsOrderType.ID:
        this.data.candidates.sort((can1, can2) =>
          can1.id > can2.id ? i1 : i2,
        );
        break;
    }
  }

  selectAllCandidates(e: any) {
    if (this.selectedCans.length === this.data.candidates.length) {
      this.selectedCans = [];
      this.allSelected = false;
    } else {
      this.selectedCans = [];
      this.data.candidates.forEach((c) => {
        this.selectCandidate(null, c.id);
      });

      this.allSelected = true;
    }
  }

  selectCandidate(e: any, id: number) {
    if (this.selectedCans.includes(id)) {
      this.selectedCans.splice(this.selectedCans.indexOf(id), 1);
    } else {
      this.selectedCans.push(id);
    }

    if (this.selectedCans.length === this.data.candidates.length) {
      this.allSelected = true;
    } else {
      this.allSelected = false;
    }
  }

  getAnswerType(answerId: string) {
    const qObj = this.data.questions.find((q) => q.uuid === answerId);

    if (!qObj) {
      return 'Unnamed Answer';
    }

    return `${qObj.name} (${qObj.a.type.verboseName})`;
  }

  getMedalVerbose(medalId: string) {
    const obj = {
      global_answer_submit_speed: {
        title: 'Answer Submit Speed',
        description:
          'How fast did the candidate submit results after interview start?',
      },

      global_camera_over_mic: {
        title: 'Camera or Microphone',
        description: 'Did candidate select camera over microphone?',
      },

      text_writing_speed: {
        title: 'Writing Speed',
        description: 'How fast did candidate type while answering question?',
      },

      text_keywords: {
        title: 'Keywords',
        description: 'How many keywords did candidate use in answer?',
      },

      text_self_review: {
        title: 'Self Review',
        description: 'How many stars did candidate give himself after answer?',
      },

      text_did_skip_self_review: {
        title: 'Self Review Continue',
        description: 'Did candidate use continue button after self review?',
      },

      audio_face_emotions: {
        title: 'Face Emotions',
        description: 'Work in progress ...',
      },

      audio_talking_speed: {
        title: 'Talking Speed',
        description: 'How fast did candidate talk while answering question?',
      },

      audio_talking_pauses: {
        title: 'Talking Pauses',
        description:
          'How many percent of candidate answer was he talking without pause?',
      },

      audio_keywords: {
        title: 'Keywords',
        description: 'How many keywords did candidate use in answer?',
      },

      audio_self_review: {
        title: 'Self Review',
        description: 'How many stars did candidate give himself after answer?',
      },

      audio_did_skip_self_review: {
        title: 'Self Review Continue',
        description: 'Did candidate use continue button after self review?',
      },

      select_one_correct_option: {
        title: 'Select Correct One',
        description: 'Did candidate select correct option?',
      },

      select_one_did_skip: {
        title: 'Select Continue',
        description: 'Did candidate use continue button after answer?',
      },

      select_one_self_review: {
        title: 'Self Review',
        description: 'How many stars did candidate give himself after answer?',
      },

      select_one_did_skip_self_review: {
        title: 'Self Review Continue',
        description: 'Did candidate use continue button after self review?',
      },

      select_many_correct_option: {
        title: 'Select Correct Many',
        description: 'How many correct options did candidate select?',
      },

      select_many_did_skip: {
        title: 'Select Continue',
        description: 'Did candidate use continue button after answer?',
      },

      select_many_self_review: {
        title: 'Self Review',
        description: 'How many stars did candidate give himself after answer?',
      },

      select_many_did_skip_self_review: {
        title: 'Self Review Continue',
        description: 'Did candidate use continue button after self review?',
      },
    };

    return obj[medalId]
      ? obj[medalId]
      : {
          title: 'Unnamed medal',
          description: 'Medal not found.',
        };
  }
}
