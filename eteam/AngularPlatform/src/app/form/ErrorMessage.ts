import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';

// TODO: Translate this file

class ErrorMessage {
  constructor(
    public forControl: string,
    public forValidator: string,
    public text: string
  ) {}
}

const DefaultErrorMessages: { [key: string]: string } = {
  required: 'This field is required.',
  maxlength: 'This field has to be shorter.',
  minlength: 'This field has to be longer.',
  email: 'This field has to be a valid email.'
};

const ErrorMessageVerbose = [
  new ErrorMessage('agree_terms', 'required', 'Please agree to our terms.'),
  new ErrorMessage(
    'agree_terms',
    'required_true',
    'Please agree to our terms.'
  ),

  new ErrorMessage('domain', 'required', 'Please enter a domain name.'),
  new ErrorMessage('domain', 'maxlength', 'Domain name is too long.'),
  new ErrorMessage(
    'domain',
    'minlength',
    'Domain name must have at least 5 characters.'
  ),
  new ErrorMessage(
    'domain',
    'slug',
    $localize`:form_errors - error message@@snQWJXB:Domain name has to have ${'<a href="https://blog.hiroo.eu/what-is-a-slug" target="_blank" class="font-bold text-red-500">'}slug format${'</a>'}.`
  ),

  new ErrorMessage('email', 'required', 'Please enter a company email.'),
  new ErrorMessage('email', 'email', 'Email is not valid.'),
  new ErrorMessage('email', 'maxlength', 'Email is too long.'),
  new ErrorMessage(
    'email',
    'minlength',
    'Email must have at least 5 characters.'
  ),

  new ErrorMessage('name', 'required', 'Please enter a company name.'),
  new ErrorMessage('name', 'maxlength', 'Company name is too long.'),
  new ErrorMessage(
    'name',
    'minlength',
    'Company name must have at least 5 characters.'
  ),

  new ErrorMessage('password', 'required', 'Please enter a password.'),
  new ErrorMessage(
    'password',
    'minlength',
    'Password must have at least 5 characters.'
  ),
  new ErrorMessage('password', 'maxlength', 'Password is too long.'),

  new ErrorMessage('password_again', 'required', 'Please enter a password.'),
  new ErrorMessage(
    'password_again',
    'minlength',
    'Password must have at least 5 characters.'
  ),
  new ErrorMessage('password_again', 'maxlength', 'Password is too long.')
];

export const updateErrorMessages = (
  form: FormGroup
): { [key: string]: string } => {
  const errors: { [key: string]: string } = {};

  for (const message of ErrorMessageVerbose) {
    const control = form.get(message.forControl);
    if (!control) {
      continue;
    }

    if (
      control &&
      control.dirty &&
      control.invalid &&
      control.hasError(message.forValidator) &&
      !errors[message.forControl]
    ) {
      errors[message.forControl] = message.text;
    }
  }

  for (const formInputKey of Object.keys(form.value)) {
    const inputCtrl = form.get(formInputKey);

    if (
      inputCtrl &&
      inputCtrl.errors &&
      inputCtrl.dirty &&
      inputCtrl.invalid &&
      !errors[formInputKey] &&
      Object.keys(inputCtrl.errors).length > 0
    ) {
      const errorKey = Object.keys(inputCtrl.errors)[0];

      errors[formInputKey] = DefaultErrorMessages[errorKey]
        ? DefaultErrorMessages[errorKey]
        : 'Unexpected error (' + errorKey + ').';
    }
  }

  return errors;
};

export class CustomValidators {
  static slugValidator = (
    control: AbstractControl
  ): { [key: string]: any } | null => {
    const isValidSlug = /^[a-z](-?[a-z])*$/g.test(control.value);
    return isValidSlug ? null : { slug: true };
  };
}

// export const forbiddenNameValidator = (nameRe: RegExp): ValidatorFn => {
//     return (control: AbstractControl): {[key: string]: any} | null => {
//       const forbidden = nameRe.test(control.value);
//       return forbidden ? {forbiddenName: {value: control.value}} : null;
//     };
//   }
