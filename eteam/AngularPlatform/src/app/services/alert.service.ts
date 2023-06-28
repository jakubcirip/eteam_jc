import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';

export interface AlertButtonInterface {
  text: string;
  bgColor: string;
  textColor: string;
  callback: () => void | Promise<void>;
}

// exported interface used anywhere in app (most likely just this service and alert component) to share type of the alert data
export interface AlertInterface {
  type: 'success' | 'warning' | 'error';
  title: string;
  text: string;
  buttons?: AlertButtonInterface[];
}

@Injectable({
  providedIn: 'root'
})
// Only one alert can be opened at same time. If you attempt to open alert while it is opened, it will close the old one first.
export class AlertService {
  // if null is emmited, the modal will be closed
  public alertSubect: BehaviorSubject<AlertInterface | null> = new BehaviorSubject<AlertInterface | null>(
    null
  );

  constructor() {}

  // Used all over the application to send actions to API (login, register, delete user, update password, ...)
  // This method is not ment to be used to get data from API
  async sendRequest(
    title: string,
    req: Promise<any>,
    buttons?: AlertButtonInterface[]
  ): Promise<any> {
    // catching error means there is neetwork error, request data error or some api error
    try {
      const res = await req;

      await this.openAlert({
        type: 'success',
        title,
        text: res.message
          ? res.message
          : $localize`:alert_service - default success text@@so9XBBa:Action executed successfully.`,
        buttons: buttons
          ? buttons
          : [
              {
                text: $localize`:alert_service - close button success@@soah3Tl:Okay`,
                textColor: 'white',
                bgColor: 'green',
                callback: () => {
                  this.closeAlert();
                }
              }
            ]
      });

      return res;
    } catch (err) {
      await this.openAlert({
        type: err.toString().includes('Failed to fetch') ? 'error' : 'warning',
        title,
        text: this.parseReqestError(err),
        buttons: [
          {
            text: $localize`:alert_service - close button error@@soah3Tl:Close`,
            textColor: 'white',
            bgColor: 'gray',
            callback: () => {
              this.closeAlert();
            }
          }
        ]
      });

      return null;
    }
  }

  // Close currently opened alert
  public closeAlert() {
    // setting to null means "close alert"
    this.alertSubect.next(null);
  }

  // Open alert, but also close if one is already opened
  public async openAlert(alertData: AlertInterface) {
    // if alert is already opened, close it before opening new one
    if (this.alertSubect.getValue() !== null) {
      this.closeAlert();

      // wait 300ms which is css animation
      await new Promise((res, rej) => {
        setTimeout(() => {
          res(true);
        }, 300);
      });
    }

    this.alertSubect.next(alertData);
  }

  // parse error from API. This used to be complex method, now all of the logic is on the backend
  public parseReqestError(err: any): string {
    console.log(err);
    if (err.toString().includes('Failed to fetch')) {
      return $localize`:alert_service - server offline error text@@so9XI7T:Servers went down! Please try again later.`;
    }

    if (
      err &&
      err.details &&
      err.details.message &&
      typeof err.details.message === 'string'
    ) {
      return err.details.message.toString();
    }

    if (err && err.message) {
      return err.message.toString();
    }

    // TODO: Insread of log, send it to some external API to keep track of errors
    console.log(err);

    return $localize`:alert_service - default error text@@so9XMF4:Unexpected error, our developres will take care about this as soon as possible.`;
  }
}
