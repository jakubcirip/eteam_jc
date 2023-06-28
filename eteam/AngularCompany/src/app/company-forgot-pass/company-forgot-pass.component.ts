import { Component, OnInit } from '@angular/core';
import { Utils, AlertTypes } from 'src/services/Utils';
import API from 'src/services/API';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-forgot-pass',
  templateUrl: './company-forgot-pass.component.html',
  styleUrls: ['./company-forgot-pass.component.scss'],
})
export class CompanyForgotPassComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  goToIndex() {
    this.router.navigate(['/company-login']);
  }

  async submitRequest(e, email: string) {
    e.preventDefault();
    try {
      if (email.length < 5) {
        Utils.showAlert(
          AlertTypes.ERROR,
          'Password Reset',
          'Emails is too short',
        );
        return;
      }

      const res = await API.requestResetCompanyPassword(
        {},
        {
          email,
        },
      );

      Utils.showAlert(AlertTypes.SUCCESS, 'Great!', res.message);
    } catch (exp) {
      Utils.showAlert(
        AlertTypes.ERROR,
        'Password Reset',
        Utils.getErrorMessage(exp),
      );
    }
  }
}
