import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  mobileMenuOpened = false;
  mobileMenuAnimFinished = true;
  focusForm = false;

  setFocusForm(val: boolean) {
    this.focusForm = val;
  }

  setMobileMenuOpened(val: boolean) {
    this.mobileMenuOpened = val;
  }

  setMobileMenuAnimFinished(val: boolean) {
    this.mobileMenuAnimFinished = val;
  }
}
