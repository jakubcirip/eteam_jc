import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Step, ValidateTypes } from '../../base/base.component';
import { AssistentService } from 'src/app/assistent.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  @Input() step: Step;
  @ViewChild('form', {
    static: true,
  })
  form: HTMLElement;

  validateTypes = ValidateTypes;

  constructor(public assistent: AssistentService) {}

  ngOnInit() {
    setTimeout(() => {
      if (this.step.id) {
        $('#' + this.step.id).validate();
      }

      this.step.data.inputs.forEach((i) => {
        this.onInputChange(
          { target: { value: $('#' + this.step.id + '_' + i.id).val() } },
          i.onChange,
        );
      });
    }, 1);
  }

  onInputChange(e, onChange) {
    if (this.step.id) {
      $('#' + this.step.id).validate();
    }

    if (onChange) {
      const val = e.target.value;
      onChange(val);
    }
  }

  onSubmit(e) {
    e.preventDefault();
  }
}
