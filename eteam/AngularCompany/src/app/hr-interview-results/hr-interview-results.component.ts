import { Component, OnInit, OnDestroy } from '@angular/core';
import API from 'src/services/API';
import { Router, ActivatedRoute } from '@angular/router';
import { Utils } from 'src/services/Utils';
import { SocketService } from '../socket.service';
import { Subscription } from 'rxjs';
import {
  InterviewResultsService,
  ResultsOrderType,
} from '../interview-results.service';
import {
  trigger,
  sequence,
  state,
  animate,
  transition,
  style,
} from '@angular/animations';

declare var Swal: any;

const rowsAnimation = trigger('rowsAnimation', [
  transition('void => *', [
    style({
      height: '*',
      opacity: '0',
      transform: 'translateX(-550px)',
      'box-shadow': 'none',
    }),
    sequence([
      animate(
        '.35s ease',
        style({
          height: '*',
          opacity: '.2',
          transform: 'translateX(0)',
          'box-shadow': 'none',
        }),
      ),
      animate(
        '.35s ease',
        style({ height: '*', opacity: 1, transform: 'translateX(0)' }),
      ),
    ]),
  ]),
]);

@Component({
  selector: 'app-hr-interview-results',
  templateUrl: './hr-interview-results.component.html',
  styleUrls: ['./hr-interview-results.component.scss'],
  animations: [rowsAnimation],
})
export class HrInterviewResultsComponent implements OnInit, OnDestroy {
  intId: number;
  people: any[] = null;

  get resultTypes() {
    return ResultsOrderType;
  }

  socketType = 'peopleList';
  subs: Subscription[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private socket: SocketService,
    public results: InterviewResultsService,
  ) {}

  async ngOnInit() {
    this.subs.push(
      this.socket.onChange.subscribe((type) => {
        if (type === this.socketType) {
          this.reloadList();
        }
      }),
    );

    this.subs.push(
      this.route.params.subscribe((newParams) => {
        this.intId = +newParams.intId;
        this.reloadList();
      }),
    );
  }

  async ngOnDestroy() {
    this.subs.forEach((s) => s.unsubscribe());
  }

  async reloadList() {
    await this.results.load(this.intId.toString());
  }

  goBack() {
    this.router.navigate(['/hr', 'interview']);
  }
}
