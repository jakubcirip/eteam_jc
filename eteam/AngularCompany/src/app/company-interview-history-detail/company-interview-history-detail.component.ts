import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import API, {
  GetCompanyInterviewHistoryDetailResponse,
} from 'src/services/API';
import { Utils } from 'src/services/Utils';

@Component({
  selector: 'app-company-interview-history-detail',
  templateUrl: './company-interview-history-detail.component.html',
  styleUrls: ['./company-interview-history-detail.component.scss'],
})
export class CompanyInterviewHistoryDetailComponent implements OnInit {
  historyIntId;
  data: GetCompanyInterviewHistoryDetailResponse = null;

  constructor(private route: ActivatedRoute, private router: Router) {}

  goBack() {
    this.router.navigate(['/company', 'interview-history']);
  }

  async ngOnInit() {
    this.route.params.subscribe(async (newParams) => {
      this.historyIntId = +newParams.historyIntId;

      this.data = await Utils.sendRequestFullSilent(
        'Interview Archive',
        API.getCompanyInterviewHistoryDetail(this.historyIntId),
      );
    });
  }
}
