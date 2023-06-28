import { Component, OnInit } from '@angular/core';
import API from 'src/services/API';
import { Utils, AlertTypes } from 'src/services/Utils';

declare const Swal: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  companyName: string;
  companyDomain: string;
  // ICO: string;
  email: string;
  password: string;
  passwordAgain: string;
  selectedPlan: number;

  constructor() {
    this.selectedPlan = 0;
  }

  resetForm() {
    this.companyName = '';
    this.companyDomain = '';
    // this.ICO = '';
    this.email = '';
    this.password = '';
    this.passwordAgain = '';
    this.selectedPlan = 0;
  }

  registerUser = async () => {
    try {
      const data: any = [
        this.companyName,
        // this.ICO,
        this.email,
        this.password,
        this.passwordAgain,
        this.selectedPlan,
      ];

      Swal.fire({
        allowOutsideClick: false,
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      });

      const response = await API.registerCompany(
        {},
        {
          name: this.companyName,
          // ico: this.ICO,
          email: this.email,
          password: this.password,
          passwordConfirm: this.passwordAgain,
          subModel: +this.selectedPlan,
          domain: this.companyDomain,
        },
      );

      Utils.showAlert(AlertTypes.SUCCESS, 'Account Created', response.message);
      this.resetForm();
      return true;
    } catch (exp) {
      console.log(exp);
      Utils.showAlert(
        AlertTypes.ERROR,
        'Register company',
        Utils.getErrorMessage(exp),
      );
    }
  };
}
