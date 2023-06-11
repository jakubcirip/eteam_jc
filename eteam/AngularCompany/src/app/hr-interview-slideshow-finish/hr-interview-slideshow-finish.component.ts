import { Component, OnInit } from '@angular/core';
import { InterviewResultsService } from '../interview-results.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hr-interview-slideshow-finish',
  templateUrl: './hr-interview-slideshow-finish.component.html',
  styleUrls: ['./hr-interview-slideshow-finish.component.scss'],
})
export class HrInterviewSlideshowFinishComponent implements OnInit {
  candidates = [];
  canIds = [];

  intId;

  constructor(
    public results: InterviewResultsService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((newParams) => {
      this.intId = newParams.intId;

      if (newParams.canIds === 'all') {
        this.canIds = this.results.data.candidates.map((c) => c.id);
      } else {
        this.canIds = newParams.canIds.split('-').map((c) => +c);
      }

      const cans = this.results.data.candidates.filter((c) =>
        this.canIds.includes(c.id),
      );
      cans.sort((a, b) => (a.value >= b.value ? -1 : 1));

      this.candidates = cans;
    });
  }

  goBack() {
    this.router.navigate(['/hr', 'interview', this.intId, 'results']);
  }
}
