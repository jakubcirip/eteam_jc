import { Component, OnInit } from '@angular/core';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import API from 'src/services/API';
import { Utils } from 'src/services/Utils';
import { _ } from '../utils.service';
import { DataService } from '../data.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

declare const $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  registerUrl;

  constructor(
    private langService: LocalizeRouterService,
    private data: DataService,
    public lang: TranslateService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.registerUrl = environment.registerWeb;
  }

  onSetLang(lang: string) {
    if (this.lang.currentLang === lang) {
      return;
    }

    this.langService.changeLanguage(lang);
    this.data.init();
    this.reload();
  }

  async reload() {
    $('.preloader').fadeIn();
    setTimeout(() => {
      location.reload();
    }, 2000);
  }

  async onRegister(
    company: string,
    city: string,
    email: string,
    canContact: boolean,
  ) {
    await Utils.sendRequest(
      _('header.form.modalTitle'),
      API.registerInterest(
        {},
        {
          company,
          city,
          email,
          canContact,
        },
      ),
    );
  }
}
