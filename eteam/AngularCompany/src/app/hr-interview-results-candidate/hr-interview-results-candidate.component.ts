import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  Candidate,
  InterviewResultsService,
} from '../interview-results.service';

@Component({
  selector: 'app-hr-interview-results-candidate',
  templateUrl: './hr-interview-results-candidate.component.html',
  styleUrls: ['./hr-interview-results-candidate.component.scss'],
})
export class HrInterviewResultsCandidateComponent implements OnInit, OnDestroy {
  intId: number;
  canId: number;
  can = null;

  subs: Subscription[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private results: InterviewResultsService,
  ) {}

  async ngOnInit() {
    this.route.params.subscribe(async newParams => {
      this.intId = +newParams.intId;
      this.canId = newParams.canId;

      await this.reloadList();

      this.can = this.results.data.candidates.find(c => {
        return c.id === this.canId;
      });
    });
  }

  async reloadList() {
    await this.results.load(this.intId.toString());
  }

  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe());
  }

  goBack() {
    this.router.navigate(['/hr', 'interview', this.intId, 'results']);
  }
}
