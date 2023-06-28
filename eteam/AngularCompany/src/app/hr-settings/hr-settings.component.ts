import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import API, { HrSettings } from 'src/services/API';
import { Utils } from 'src/services/Utils';
import { environment } from 'src/environments/environment';

declare var Swal: any;

@Component({
  selector: 'app-hr-settings',
  templateUrl: './hr-settings.component.html',
  styleUrls: ['./hr-settings.component.scss'],
})
export class HrSettingsComponent implements OnInit {
  hrData: HrSettings = null;
  mailuIp = environment.mailu;

  constructor(private auth: AuthService, private router: Router) {}

  async ngOnInit() {
    this.hrData = await API.getHrSettings();
  }

  logout() {
    this.auth.setHrKey('NOT LOGGED');
    this.router.navigate(['/hr-login']);
    this.auth.setDarkTheme();
  }

  showMailPass() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This will show plain password!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, show it!',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return API.getHrMailPass()
          .then((data) => {
            return data;
          })
          .catch((err) => {
            Swal.showValidationMessage(`Whoops! ${Utils.getErrorMessage(err)}`);
          });
      },
    }).then((result) => {
      if (result.value) {
        Swal.fire('Mail password', result.value.message, 'info');
      }
    });
  }

  async updatePass(e, oldPass, newPass, newPassAgain) {
    e.preventDefault();
    await Utils.sendRequest(
      'Update Password',
      API.updateHrPassword(
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
