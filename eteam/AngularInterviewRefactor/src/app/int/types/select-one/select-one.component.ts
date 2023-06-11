import { Component, OnInit, Input } from '@angular/core';
import { Step } from '../../base/base.component';
import { AssistentService } from 'src/app/assistent.service';

@Component({
  selector: 'app-select-one',
  templateUrl: './select-one.component.html',
  styleUrls: ['./select-one.component.scss'],
})
export class SelectOneComponent implements OnInit {
  @Input() step: Step;

  constructor(public assistent: AssistentService) {}

  ngOnInit() {}

  calculateBootstrapWidth(totalItems: number): number {
    return Math.floor(12 / totalItems);
  }

  onOptionChange(e: any) {
    const val = e.target.value;
    const opt = this.step.data.options.find((o) => o.value === val);

    if (!opt) {
      return;
    }

    if (opt.onSelect) {
      opt.onSelect();
    }
  }
}
