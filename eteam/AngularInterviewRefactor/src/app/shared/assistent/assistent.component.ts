import { Component, OnInit, Input } from '@angular/core';
import { AssistentService } from 'src/app/assistent.service';

@Component({
  selector: 'app-assistent',
  templateUrl: './assistent.component.html',
  styleUrls: ['./assistent.component.scss'],
})
export class AssistentComponent implements OnInit {
  @Input() title: string;

  constructor(public assistent: AssistentService) {}

  ngOnInit() {}

  onSkip() {
    this.assistent.skipCurrentText();
  }
}
