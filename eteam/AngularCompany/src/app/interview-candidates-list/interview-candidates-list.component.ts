import { Component, OnInit, Input } from '@angular/core';
import {
  InterviewResultsService,
  ResultsOrderType,
} from '../interview-results.service';
import { Router } from '@angular/router';

declare const Swal: any;

@Component({
  selector: 'app-interview-candidates-list',
  templateUrl: './interview-candidates-list.component.html',
  styleUrls: ['./interview-candidates-list.component.scss'],
})
export class InterviewCandidatesListComponent implements OnInit {
  @Input() intId;
  @Input() candidates;

  get resultTypes() {
    return ResultsOrderType;
  }

  constructor(
    public results: InterviewResultsService,
    private router: Router,
  ) {}

  ngOnInit() {}

  openMedalHelp() {
    Swal.fire({
      type: 'info',
      title: `Medal Information`,
      html: `
        Green: Total candidate points <b>(most relevant)</b><br><br><br>
        Orange (Gold): Best candidate/s<br>
        White (Silver): Second best candidate/s<br>
        Red (Bronze): Third best candidate/s<br>
        Blue: Best candidate/s in boolean medal<br><br>
        Left-Click on medal to order list of candidates by total amount of specific medals.
      `,
    });
  }

  onStartSlideshow() {
    this.router.navigate(['/hr', 'interview', this.intId, 'slideshow', 'all']);
  }

  openSpecificCandidate(can: any, id) {
    if (!can.answersData) {
      return;
    }

    this.router.navigate(['/hr', 'interview', this.intId, 'candidate', id]);
  }

  goToCompare() {
    const ids: any[] = this.results.selectedCans.map((c) => c);

    ids.sort((a, b) => (a > b ? 1 : -1));

    this.router.navigate([
      '/hr',
      'interview',
      this.intId,
      'compare',
      ids.join(','),
    ]);
  }
}
