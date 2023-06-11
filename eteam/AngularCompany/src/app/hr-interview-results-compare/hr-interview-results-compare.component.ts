import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  InterviewResultsService,
  Candidate,
  Medal,
} from '../interview-results.service';
import { environment } from 'src/environments/environment';

declare var Swal: any;

@Component({
  selector: 'app-hr-interview-results-compare',
  templateUrl: './hr-interview-results-compare.component.html',
  styleUrls: ['./hr-interview-results-compare.component.scss'],
})
export class HrInterviewResultsCompareComponent implements OnInit {
  intId: number;
  cans: any[] = [];
  colWidth = 12;
  mailuUrl: string;

  candidatesWinnings: { id: number; value: number }[] = [];

  constructor(
    private route: ActivatedRoute,
    public results: InterviewResultsService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.mailuUrl = environment.mailu;

    this.route.params.subscribe(async (newParams) => {
      const { canIds, intId } = newParams;

      await this.results.load(intId.toString());

      const canIdArr: string[] = canIds.split(',');

      this.intId = intId;
      this.cans = this.results.data.candidates.filter((c) =>
        canIdArr.includes(c.id.toString()),
      );

      this.colWidth = Math.floor(12 / this.cans.length);

      this.onCansChange();
    });
  }

  onCansChange() {
    this.candidatesWinnings = [];

    this.cans.forEach((c) => {
      let totalWinnings = 0;

      // isAnswerDateWinner isSelfDescWinner isQuestionWinner isMedalWinner

      if (this.isOverallWinner(c)) {
        totalWinnings += 1;
      }

      if (this.isSelfDescWinner(c)) {
        totalWinnings += 1;
      }

      if (this.isAnswerDateWinner(c)) {
        totalWinnings += 1;
      }

      this.results.data.medals.forEach((m) => {
        if (this.isMedalWinner(c, m.id)) {
          totalWinnings += 1;
        }
      });

      this.results.data.questions.forEach((_q, qId) => {
        if (this.isQuestionWinner(c, qId)) {
          totalWinnings += 1;
        }
      });

      this.candidatesWinnings.push({
        id: c.id,
        value: totalWinnings,
      });
    });
  }

  onMedalInfo(medalTitle: string, medalText: string) {
    Swal.fire({
      type: 'info',
      title: medalTitle,
      text: medalText,
    });
  }

  goBack() {
    this.router.navigate(['/hr', 'interview', this.intId, 'results']);
  }

  getDate(date: string): Date {
    return new Date(date);
  }

  getMedal(medalId: number): Medal {
    return this.results.data.medals.find((m) => m.id === medalId);
  }

  getMedalClass(medalId: number, can: Candidate): string {
    if (can.medails.gold.includes(medalId)) {
      return 'badge-gold';
    }

    if (can.medails.silver.includes(medalId)) {
      return 'badge-silver';
    }

    if (can.medails.bronze.includes(medalId)) {
      return 'badge-bronze';
    }

    return 'badge-none';
  }

  getMedalStr(medalId: number, can: Candidate): string {
    if (can.medails.gold.includes(medalId)) {
      return 'Golden Medal';
    }

    if (can.medails.silver.includes(medalId)) {
      return 'Silver Medal';
    }

    if (can.medails.bronze.includes(medalId)) {
      return 'Bronze Medal';
    }

    return 'No Medal';
  }

  isWinner(
    arr: { value: number; id: number }[],
    id: number,
    reverse = false,
  ): boolean {
    arr.sort((a, b) =>
      a.value >= b.value ? (reverse ? 1 : -1) : reverse ? -1 : 1,
    );

    const allWinners = arr.filter((i) => i.value === arr[0].value);
    const isWinner = allWinners.find((i) => i.id === id);

    if (!isWinner) {
      return false;
    }

    if (isWinner.value === 0) {
      return false;
    }

    return true;
  }

  isMedalWinner(can: Candidate, medalId: number) {
    return this.isWinner(
      this.results.data.candidates.map((c) => {
        return {
          value: c.medails.gold.includes(medalId)
            ? 3
            : c.medails.silver.includes(medalId)
            ? 2
            : c.medails.bronze.includes(medalId)
            ? 1
            : 0,
          id: c.id,
        };
      }),
      can.id,
    );
  }

  isTotalWinner(can: Candidate) {
    return this.isWinner(this.candidatesWinnings, can.id);
  }

  getCandidateTotalWinner(can: Candidate) {
    return this.candidatesWinnings.find((c) => c.id === can.id).value;
  }

  isQuestionWinner(can: Candidate, qId: number) {
    return false;
  }

  isOverallWinner(can: Candidate) {
    return this.isWinner(
      this.results.data.candidates.map((c) => {
        return { value: c.overallRating, id: c.id };
      }),
      can.id,
    );
  }

  isSelfDescWinner(can: Candidate) {
    return this.isWinner(
      this.results.data.candidates.map((c) => {
        return { value: c.answers.desc.length, id: c.id };
      }),
      can.id,
    );
  }

  isAnswerDateWinner(can: Candidate) {
    return this.isWinner(
      this.results.data.candidates.map((c) => {
        return { value: new Date(c.answerDate).getTime(), id: c.id };
      }),
      can.id,
      true,
    );
  }
}
