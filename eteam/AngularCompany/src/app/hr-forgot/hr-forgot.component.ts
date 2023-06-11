import { Component, OnInit } from '@angular/core';
import { Utils, AlertTypes } from 'src/services/Utils';
import { Router } from '@angular/router';
import API from 'src/services/API';

@Component({
  selector: 'app-hr-forgot',
  templateUrl: './hr-forgot.component.html',
  styleUrls: ['./hr-forgot.component.scss'],
})
export class HrForgotComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  goToIndex() {
    this.router.navigate(['/hr-login']);
  }

  async submitRequest(e, email: string) {
    e.preventDefault();
    try {
      const res = await API.requestResetHrPassword(
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
