import { Component, OnInit, Input } from '@angular/core';
import API, { FaqCompany } from 'src/services/API';
import { Utils } from 'src/services/Utils';

declare var Swal: any;
declare var Tawk_API: any;

@Component({
  selector: 'app-global-support',
  templateUrl: './global-support.component.html',
  styleUrls: ['./global-support.component.scss'],
})
export class GlobalSupportComponent implements OnInit {
  @Input() type: string;
  isVisible = false;

  faq: FaqCompany;

  constructor() {}
  async ngOnInit() {
    if (this.type === 'company') {
      this.faq = await API.getFaqCompany();
    } else {
      this.faq = await API.getFaqHr();
    }
  }

  toggleQuestion() {
    this.isVisible = !this.isVisible;
  }

  openLiveChat() {
    /*
    Swal.fire({
      type: 'info',
      title: 'Live Chat',
      text: 'Will be added soon',
    });
    */

    Tawk_API.toggle();
  }

  async sendEmail(e, name, email, subject, text) {
    try {
      e.preventDefault();
      let res;
      if (this.type === 'company') {
        res = await API.sendCompanySupportEmail(
          {},
          {
            name,
            email,
            subject,
            description: text,
          },
        );
      } else {
        res = await API.sendHrSupportEmail(
          {},
          {
            name,
            email,
            subject,
            description: text,
          },
        );
      }

      Swal.fire({
        type: 'success',
        title: 'Support Email',
        text: res.message,
      });
    } catch (exp) {
      Swal.fire({
        type: 'error',
        title: 'Support Email',
        text: Utils.getErrorMessage(exp),
      });
    }
  }
}
