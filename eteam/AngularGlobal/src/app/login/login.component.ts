import { Component, OnInit } from '@angular/core';
import API from 'src/services/API';
import { Utils, AlertTypes } from 'src/services/Utils';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

declare var Swal: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  async loginUser(e, email, pass, domain) {
    try {
      e.preventDefault();

      Swal.fire({
        allowOutsideClick: false,
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      });

      const data = await API.loginCompany(
        {},
        { email, password: pass, domain },
      );
      Utils.showAlert(AlertTypes.SUCCESS, 'Great!', data.message);
      this.router.navigate(['/company']);

      window.location.replace(
        environment.companyUrl.split('{{domain}}').join(data.domain) +
          '/company-auth?secret=' +
          data.key +
          '&company=' +
          data.domain,
      );
    } catch (exp) {
      Utils.showAlert(
        AlertTypes.ERROR,
        'Login company',
        Utils.getErrorMessage(exp),
      );
    }
  }
}
