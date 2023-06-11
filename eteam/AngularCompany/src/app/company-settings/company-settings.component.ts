import { Component, OnInit } from '@angular/core';
import API, { HrSettings, CompanySettings } from 'src/services/API';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Utils } from 'src/services/Utils';

@Component({
  selector: 'app-company-settings',
  templateUrl: './company-settings.component.html',
  styleUrls: ['./company-settings.component.scss'],
})
export class CompanySettingsComponent implements OnInit {
  companyData: CompanySettings = null;

  constructor(private auth: AuthService, private router: Router) {}

  async ngOnInit() {
    this.companyData = await API.getCompanySettings();
  }

  logout() {
    this.auth.setHrKey('NOT LOGGED');
    this.router.navigate(['/company-login']);
    this.auth.setDarkTheme();
  }

  async updatePass(e, oldPass, newPass, newPassAgain) {
    e.preventDefault();
    await Utils.sendRequest(
      'Update Password',
      API.updateCompanyPassword(
        {},
        {
          oldPass,
          newPass,
          newPassAgain,
        },
      ),
    );
  }
}
