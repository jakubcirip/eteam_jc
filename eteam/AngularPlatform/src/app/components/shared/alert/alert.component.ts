import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertInterface, AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {
  // store subscription so we can unsubscribe on destroy. recommended by Angular
  sub: Subscription;

  // will include alert data from alert service
  alertData: AlertInterface | null;

  // we use this to conditionally show alert but also keep animations working
  isAlertVisible = false;
  isAlertAnimating = false;

  constructor(private alertS: AlertService) {}

  ngOnInit() {
    this.sub = this.alertS.alertSubect.subscribe(
      (newAlert: AlertInterface | null) => {
        if (newAlert === null) {
          this.isAlertAnimating = false;

          // wait 300ms to perserve animation
          setTimeout(() => {
            this.isAlertVisible = false;
            this.alertData = newAlert;
          }, 300);
        } else {
          this.alertData = null;
          this.isAlertVisible = true;
          this.alertData = {
            buttons: [],
            ...newAlert
          };

          // wait 1 moment to perserve animation
          setTimeout(() => {
            window.requestAnimationFrame(() => {
              this.isAlertAnimating = true;
            });
          }, 50);
        }
      }
    );
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  onCloseAlert() {
    this.alertS.closeAlert();
  }

  onBtnClick(btnIndex: number) {
    if (
      !this.alertData ||
      !this.alertData.buttons ||
      !this.alertData.buttons[btnIndex]
    ) {
      return;
    }

    this.alertData.buttons[btnIndex].callback();
  }
}
