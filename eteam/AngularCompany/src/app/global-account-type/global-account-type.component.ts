import { Component, OnInit } from '@angular/core';
import API from 'src/services/API';
import { Utils } from 'src/services/Utils';

declare var Swal: any;

@Component({
  selector: 'app-company-account-type',
  templateUrl: './global-account-type.component.html',
  styleUrls: ['./global-account-type.component.scss'],
})
export class GlobalAccountTypeComponent implements OnInit {
  types = [];
  isCompany = false;

  constructor() {}

  async ngOnInit() {
    await this.reloadData();
  }

  async reloadData() {
    try {
      const data = await API.getPlansData();
      this.types = data.plans;
      this.isCompany = data.isCompany;
    } catch (exp) {
      Swal.fire({
        type: 'error',
        title: 'Load data',
        text: Utils.getErrorMessage(exp),
      });
    }
  }

  async clickUpgrade(id) {
    Swal.showLoading();
    if (this.isCompany) {
      try {
        const res = await API.activatePlan({}, { planId: id });

        Swal.fire({
          type: 'success',
          title: 'Activate plan',
          text: res.message,
        });

        this.reloadData();
      } catch (exp) {
        Swal.fire({
          type: 'error',
          title: 'Activate plan',
          text: Utils.getErrorMessage(exp),
        });
      }
    } else {
      Swal.fire({
        type: 'info',
        title: 'Contact your boss',
        text: 'Only boss (company) can upgrade plan, please contact your boss',
      });
    }
  }
}
