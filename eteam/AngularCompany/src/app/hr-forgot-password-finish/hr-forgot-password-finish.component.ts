import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import API from 'src/services/API';
import { Utils, AlertTypes } from 'src/services/Utils';

@Component({
  selector: 'app-hr-forgot-password-finish',
  templateUrl: './hr-forgot-password-finish.component.html',
  styleUrls: ['./hr-forgot-password-finish.component.scss'],
})
export class HrForgotPasswordFinishComponent implements OnInit {
  isValid = null;
  code = '';

  constructor(private route: ActivatedRoute, private router: Router) {}

  async submitRequest(e, pass1: string, pass2: string) {
    e.preventDefault();
    try {
      const res = await API.resetHrPassword(
        {},
        {
          resetPassKey: this.code,
          password: pass1,
          passwordAgain: pass2,
        },
      );

      Utils.showAlert(AlertTypes.SUCCESS, 'Great!', res.message);
      this.router.navigate(['/hr-login']);
    } catch (exp) {
      Utils.showAlert(
        AlertTypes.ERROR,
        'Password Reset',
        Utils.getErrorMessage(exp),
      );
    }
  }

  async ngOnInit() {
    let isOkay = false;

    try {
      this.code = this.route.snapshot.params.code;
      await API.resetHrPasswordValidate(
        {},
        {
          resetPassKey: this.code,
        },
      );
      isOkay = true;
    } catch (exp) {
      console.log(exp);
      isOkay = false;
    }

    this.isValid = isOkay;
  }
}
