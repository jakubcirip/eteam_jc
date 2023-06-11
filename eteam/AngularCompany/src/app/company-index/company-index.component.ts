import { Component, OnInit } from '@angular/core';
import API, { CompanyIndexData } from 'src/services/API';

@Component({
  selector: 'app-company-index',
  templateUrl: './company-index.component.html',
  styleUrls: ['./company-index.component.scss'],
})
export class CompanyIndexComponent implements OnInit {
  data: CompanyIndexData;

  constructor() {}

  async ngOnInit() {
    this.data = await API.getCompanyIndexData();
  }

  calculateWidth() {
    const perc = (this.data.plan.id + 1) * 33;

    if (perc === 99) {
      return 100;
    }

    return perc;
  }
}
