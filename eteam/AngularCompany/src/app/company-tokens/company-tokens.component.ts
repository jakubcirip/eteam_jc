import { Component, OnInit } from '@angular/core';
import API, { GetCompanyTokensStatsResponse } from 'src/services/API';
import { Utils } from 'src/services/Utils';

declare var Swal: any;

@Component({
  selector: 'app-company-tokens',
  templateUrl: './company-tokens.component.html',
  styleUrls: ['./company-tokens.component.scss'],
})
export class CompanyTokensComponent implements OnInit {
  balance = 0;

  usageStats: GetCompanyTokensStatsResponse['stats'] = null;

  constructor() {}

  async ngOnInit() {
    const stats: GetCompanyTokensStatsResponse = await Utils.sendRequestFullSilent(
      'Usage Statistics',
      API.getCompanyTokensStats(),
    );

    if (stats) {
      this.usageStats = stats.stats;
    }

    this.refreshData();
  }

  async refreshData() {
    const data = await API.getTokensInfoCompany();
    this.balance = data.amount;
  }

  async purchasePackage(type: string) {
    Swal.showLoading();
    try {
      const res = await API.purchaseTokens(
        {},
        {
          packageId: type,
        },
      );

      Swal.fire({
        type: 'success',
        title: `Purchase`,
        text: res.message,
      });

      this.refreshData();
    } catch (exp) {
      Swal.fire({
        type: 'error',
        title: `Purchase error`,
        text: Utils.getErrorMessage(exp),
      });
    }
  }
}
