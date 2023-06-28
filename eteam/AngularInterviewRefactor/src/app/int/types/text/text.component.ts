import { Component, OnInit, Input } from '@angular/core';
import { Step } from '../../base/base.component';
import { AssistentService } from 'src/app/assistent.service';
import { InterviewService } from 'src/app/interview.service';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss'],
})
export class TextComponent implements OnInit {
  @Input() step: Step;

  constructor(public int: InterviewService) {}

  ngOnInit() {}

  parseText(txt: string) {
    // txt = "">>currentQuestion"
    if (txt.startsWith('>>')) {
      txt = this.int.randomData[txt.split('>>').join('')];
    }

    return txt;
  }
}
