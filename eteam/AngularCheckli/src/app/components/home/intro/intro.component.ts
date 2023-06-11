import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
})
export class IntroComponent implements OnInit {
  @Input() focusForm: boolean;
  @Output() setFocusForm = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
