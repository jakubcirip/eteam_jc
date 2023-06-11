import { Injectable } from '@angular/core';

declare var $: any;

@Injectable({
  providedIn: 'root',
})
export class FormService {
  inputs = [];
  validators = {};

  constructor() {}

  registerValidator(index: number, validator) {
    this.validators['v_' + index] = validator;
  }

  isValid(index: number): boolean {
    const v = this.validators['v_' + index];

    if (!v) {
      return true;
    }

    return v();
  }

  goNext() {
    $('.wizard-card').bootstrapWizard('next');
  }
}
