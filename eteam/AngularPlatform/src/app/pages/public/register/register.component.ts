import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  CustomValidators,
  updateErrorMessages
} from 'src/app/form/ErrorMessage';
import { AlertService } from 'src/app/services/alert.service';
import API from 'src/app/services/API';
import { LangRoutes } from 'src/app/services/router.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

// login formular wrapper by wrapper used on public page where company login/register/...
export class RegisterComponent implements OnInit {
  // so we can use it in html template
  LangRoutes = LangRoutes;

  // will contain login form object (used to get values, validate, ...)
  registerForm: FormGroup;

  // will contain object of errors. Key is input formControlName, value is error text
  registerErrors: { [key: string]: string } = {};

  // button animation
  isLoading = false;

  constructor(private fb: FormBuilder, private alertS: AlertService) {}

  ngOnInit(): void {
    // define the form validators
    this.registerForm = this.fb.group({
      domain: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
          CustomValidators.slugValidator
        ]
      ],
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100)
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
      password_again: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100)
        ]
      ],
      agree_terms: ['', [Validators.required, Validators.requiredTrue]]
    });

    this.registerForm.statusChanges.subscribe(() => {
      // update error messages to display above inputs
      this.registerErrors = updateErrorMessages(this.registerForm);
    });
  }

  async onRegister() {
    // if form is invalid, dont send API request. Also, make sure to show errors
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      this.registerErrors = updateErrorMessages(this.registerForm);
      return;
    }

    this.isLoading = true;

    // TODO: Implement "remember me" function. Currently, not implemeted on the api
    await this.alertS.sendRequest(
      $localize`:company_register - alert title@@sogA0tp:Company register`,
      API.registerCompany(
        {},
        {
          email: this.registerForm.value.email,
          password: this.registerForm.value.password,
          passwordConfirm: this.registerForm.value.password_again,
          name: this.registerForm.value.name,
          domain: this.registerForm.value.domain,
          subModel: 0
        }
      )
    );

    this.isLoading = false;
  }
}
