import { Component, OnInit } from '@angular/core';
import API from 'src/services/API';
import { Utils } from 'src/services/Utils';
import { _ } from '../utils.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  async onSendMail(name: string, email: string, subject: string, text: string) {
    await Utils.sendRequest(
      _('contact.form.modalTitle'),
      API.sendContactEmail(
        {},
        {
          name,
          email,
          subject,
          text,
        },
      ),
    );
  }
}
