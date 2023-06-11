import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import API from 'src/services/API';
import { ActivatedRoute, Router } from '@angular/router';
import { Utils } from 'src/services/Utils';

declare var Swal: any;

@Component({
  selector: 'app-hr-registration-success',
  templateUrl: './hr-registration-success.component.html',
  styleUrls: ['./hr-registration-success.component.scss'],
})
export class HrRegistrationSuccessComponent implements OnInit {
  public email = '';
  public key = '';

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  async ngOnInit() {
    try {
      const domain = this.auth.domain;
      this.key = this.route.snapshot.params.key;
      const userData = await API.getPreconfirmPerson(this.key, {});
      this.email = userData.email;
    } catch (exp) {
      Swal.fire({
        type: 'error',
        title: `Can't load data`,
        text: Utils.getErrorMessage(exp),
      });
    }
  }

  async finishRegistration(e, pass, passAgain) {
    e.preventDefault();
    Swal.showLoading();

    try {
      const res = await API.confirmPerson(
        {},
        {
          password: pass,
          passwordConfirm: passAgain,
          actiovationCode: this.key,
        },
      );

      Swal.fire({
        type: 'success',
        title: `Registration`,
        text: res.message,
      });

      this.router.navigate(['/hr-login']);
    } catch (exp) {
      Swal.fire({
        type: 'error',
        title: `Can't load data`,
        text: Utils.getErrorMessage(exp),
      });
    }
  }
}
