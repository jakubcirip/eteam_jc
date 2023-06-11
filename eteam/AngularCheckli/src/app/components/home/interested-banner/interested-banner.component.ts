import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-interested-banner',
  templateUrl: './interested-banner.component.html',
  styleUrls: ['./interested-banner.component.scss'],
})
export class InterestedBannerComponent implements OnInit {
  @Input() focusForm: boolean;
  @Output() setFocusForm = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onFocusFormExternal() {
    document.querySelector('.small-contact-form')?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });

    setTimeout(() => {
      this.onFocusForm();
    }, 800);
  }
  onFocusForm() {
    this.setFocusForm.emit(true);

    setTimeout(() => {
      this.setFocusForm.emit(false);
    }, 800);
  }
}
