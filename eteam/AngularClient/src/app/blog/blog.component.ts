import { Component, OnInit } from '@angular/core';
import { _ } from '../utils.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  seconds = 60;
  candidates = 10;
  questions = 10;
  jobs = 1;
  currentPlan = 'plan1';

  constructor(public data: DataService) {}

  ngOnInit() {}

  getSecondPrice() {
    if (this.currentPlan === 'plan3') {
      return 0.033333333;
    } else if (this.currentPlan === 'plan2') {
      return 0.016666667;
    } else {
      return 0.008333333;
    }
  }
}
