import { Component, OnInit } from '@angular/core';
import API from 'src/services/API';
import { AuthService } from '../auth.service';
import { Utils, AlertTypes } from 'src/services/Utils';
import { Router } from '@angular/router';

declare var Swal: any;

@Component({
  selector: 'app-hr-login',
  templateUrl: './hr-login.component.html',
  styleUrls: ['./hr-login.component.scss'],
})
export class HrLoginComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {}

  goToIndex() {
    this.router.navigate(['/']);
  }

  async loginHr(e, email: string, pass: string) {
    try {
      e.preventDefault();
      Swal.showLoading();

      const res = await API.loginHr(
        {},
        {
          email,
          password: pass,
          domain: this.auth.getDomain(),
        },
      );

      this.auth.setHrKey(res.key);
      Utils.showAlert(AlertTypes.SUCCESS, 'Great!', res.message);
      this.router.navigate(['/hr']);
    } catch (exp) {
      Swal.fire({
        type: 'error',
        title: `Can't load data`,
        text: Utils.getErrorMessage(exp),
      });
    }
  }
}
