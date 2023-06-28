import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Utils } from 'src/services/Utils';
import API, { GetCompanyInterviewHistoryResponse } from 'src/services/API';

@Component({
  selector: 'app-company-interview-history',
  templateUrl: './company-interview-history.component.html',
  styleUrls: ['./company-interview-history.component.scss'],
})
export class CompanyInterviewHistoryComponent implements OnInit {
  ints: GetCompanyInterviewHistoryResponse['ints'] = null;

  constructor(private router: Router) {}

  async ngOnInit() {
    const intsRes: GetCompanyInterviewHistoryResponse = await Utils.sendRequestFullSilent(
      'Interview Archive',
      API.getCompanyInterviewHistory(),
    );

    this.ints = intsRes.ints;
  }

  moreInfoInt(intId: number) {
    this.router.navigate(['/company', 'interview-history', intId]);
  }
}
