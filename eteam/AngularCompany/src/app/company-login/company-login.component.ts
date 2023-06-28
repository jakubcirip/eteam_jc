import { Component, OnInit } from '@angular/core';
import API from 'src/services/API';
import { Utils, AlertTypes } from 'src/services/Utils';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

declare var Swal: any;

@Component({
  selector: 'app-company-login',
  templateUrl: './company-login.component.html',
  styleUrls: ['./company-login.component.scss'],
})
export class CompanyLoginComponent implements OnInit {
  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit() {}

  goToIndex() {
    this.router.navigate(['/']);
  }

  async loginUser(e, email, pass) {
    try {
      e.preventDefault();

      const data = await API.loginCompany(
        {},
        { email, password: pass, domain: this.auth.getDomain() },
      );
      this.auth.setKey(data.key);
      Utils.showAlert(AlertTypes.SUCCESS, 'Great!', data.message);
      this.router.navigate(['/company']);
    } catch (exp) {
      Utils.showAlert(AlertTypes.ERROR, 'Login', Utils.getErrorMessage(exp));
    }
  }
}
