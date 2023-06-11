import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  EventEmitter,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SwaggerService } from '../swagger.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit, OnDestroy, OnChanges {
  subs = [];

  @Input() options: string[];
  @Input() placeholder: string;
  @Input() disabled: boolean;
  @Input() value: string;
  @Output() onchange = new EventEmitter<string>();

  myControl = new FormControl();
  filteredOptions: string[];

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    if (this.options) {
      return this.options.filter((option) =>
        option.toLowerCase().includes(filterValue),
      );
    } else {
      return [];
    }
  }

  ngOnDestroy() {
    this.subs.forEach((s) => {
      s.unsubscribe();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.value) {
      const newVal = changes.value.currentValue;
      this.myControl.setValue(newVal);
    }
  }

  async ngOnInit() {
    setTimeout(() => {
      this.filteredOptions = this.options;
    });

    this.subs.push(
      this.myControl.valueChanges.subscribe((v) => {
        this.onchange.emit(v);
        this.filteredOptions = this._filter(v);
      }),
    );
  }
}
