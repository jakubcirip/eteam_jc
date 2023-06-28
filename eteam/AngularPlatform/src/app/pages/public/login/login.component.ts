import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  CustomValidators,
  updateErrorMessages
} from 'src/app/form/ErrorMessage';
import { AlertService } from 'src/app/services/alert.service';
import API from 'src/app/services/API';
import { LangRoutes } from 'src/app/services/router.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
// login formular wrapper by wrapper used on public page where company login/register/...
export class LoginComponent implements OnInit {
  // so we can access it in html template
  LangRoutes = LangRoutes;
  
  // will contain login form object (used to get values, validate, ...)
  loginForm: FormGroup;

  // will contain object of errors. Key is input formControlName, value is error text
  loginErrors: { [key: string]: string } = {};

  // if formular is waiting for response from api
  isLoading = false;

  // use controller to prevent wrong types or "null"
  get domainCtrl() {
    return this.loginForm.get('domain') as FormControl;
  }

  constructor(private fb: FormBuilder, private alertS: AlertService) {}

  ngOnInit(): void {
    // define the form validators
    this.loginForm = this.fb.group({
      domain: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
          CustomValidators.slugValidator
        ]
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
          Validators.email
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100)
        ]
      ],
      rememberMe: ['', []]
    });

    this.loginForm.statusChanges.subscribe(() => {
      // if you type space in domain, change it to dash
      if (this.domainCtrl.value.includes(' ')) {
        this.domainCtrl.setValue(this.domainCtrl.value.split(' ').join('-'));
      }

      // update error messages to display above inputs
      this.loginErrors = updateErrorMessages(this.loginForm);
    });
  }

  async onLogin() {
    // if form is invalid, dont send API request. Also, make sure to show errors
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.loginErrors = updateErrorMessages(this.loginForm);
      return;
    }

    this.isLoading = true;

    // TODO: Implement "remember me" function. Currently, not implemeted on the api
    await this.alertS.sendRequest(
      $localize`:company_login - alert title@@so9WuMc:Company login`,
      API.loginCompany(
        {},
        {
          email: this.loginForm.value.email,
          password: this.loginForm.value.password,
          domain: this.loginForm.value.domain
        }
      )
    );

    this.isLoading = false;
  }
}
