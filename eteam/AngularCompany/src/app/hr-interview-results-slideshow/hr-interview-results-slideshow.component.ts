import { Component, OnInit } from '@angular/core';
import { InterviewResultsService } from '../interview-results.service';
import { Router, ActivatedRoute } from '@angular/router';

declare const Swal: any;

@Component({
  selector: 'app-hr-interview-results-slideshow',
  templateUrl: './hr-interview-results-slideshow.component.html',
  styleUrls: ['./hr-interview-results-slideshow.component.scss'],
})
export class HrInterviewResultsSlideshowComponent implements OnInit {
  intId: number;

  canIds: number[];
  currentIndex = 0;

  selectedIds = [];

  constructor(
    public results: InterviewResultsService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((newParams) => {
      this.intId = +newParams.intId;
      if (newParams.canIds === 'all') {
        this.canIds = this.results.data.candidates.map((c) => c.id);
      } else {
        this.canIds = newParams.canIds.split('-').map((c) => +c);
      }

      this.currentIndex = 0;
      this.selectedIds = [];

      const cans = this.results.data.candidates
        .map((c) => {
          return { id: c.id, value: c.overallRating };
        })
        .filter((c) => this.canIds.includes(c.id));
      cans.sort((a, b) => (a.value >= b.value ? -1 : 1));
      this.canIds = cans.map((c) => c.id);
    });
  }

  onLike() {
    if (!this.selectedIds.includes(this.canIds[this.currentIndex])) {
      this.selectedIds.push(this.canIds[this.currentIndex]);
    }
    this.goToNextCandidate();
  }

  onDislike() {
    if (this.selectedIds.includes(this.canIds[this.currentIndex])) {
      this.selectedIds.splice(
        this.selectedIds.indexOf(this.canIds[this.currentIndex]),
        1,
      );
    }
    this.goToNextCandidate();
  }

  goToNextCandidate() {
    if (this.currentIndex >= this.canIds.length - 1) {
      if (this.selectedIds.length === this.canIds.length) {
        Swal.fire({
          title: 'Slideshow stuck',
          text:
            'You didnt remove any candidate. Remove at least one to process to next round.',
          type: 'info',
        });
      } else {
        if (this.selectedIds.length === 0) {
          Swal.fire({
            title: 'Slideshow finished',
            text: 'You have removed all of the candidates. Slideshow is over.',
            type: 'success',
          });
          this.router.navigate(['/hr', 'interview', this.intId, 'results']);
        } else if (this.selectedIds.length === 1) {
          Swal.fire({
            title: 'Slideshow finished',
            text:
              'You have removed all of the candidates except one. This is your winner.',
            type: 'success',
          });
          this.router.navigate([
            '/hr',
            'interview',
            this.intId,
            'candidate',
            this.selectedIds[0],
          ]);
        } else {
          Swal.fire({
            title: 'Round finished',
            text:
              'Do you want to start next round or finish slideshow and show remaining candidates?',
            type: 'info',
            showCancelButton: true,
            confirmButtonColor: '#448bff',
            cancelButtonColor: '#31c971',
            confirmButtonText: 'Finish slideshow',
            cancelButtonText: 'Start next round',
          }).then((result) => {
            if (result.value) {
              const nextIds = this.selectedIds;
              this.router.navigate([
                '/hr',
                'interview',
                this.intId,
                'slideshow-finish',
                nextIds.join('-'),
              ]);
            } else {
              const nextIds = this.selectedIds;
              this.router.navigate([
                '/hr',
                'interview',
                this.intId,
                'slideshow',
                nextIds.join('-'),
              ]);
            }
          });
        }
      }
    } else {
      this.currentIndex++;
    }
  }

  onChangeCandidate(toAdd: number, isDisabled: boolean) {
    if (isDisabled) {
      return;
    }
    this.currentIndex += toAdd;
  }

  getProgress() {
    return Math.ceil(((this.currentIndex + 1) / this.canIds.length) * 100);
  }

  goBack() {
    this.router.navigate(['/hr', 'interview', this.intId, 'results']);
  }
}
