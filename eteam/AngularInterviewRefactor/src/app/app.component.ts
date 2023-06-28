import { Component, OnInit } from '@angular/core';
import { UtilsService } from './utils.service';
import { TranslateService } from '@ngx-translate/core';
import API from './services/API';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private utils: UtilsService,
    private translate: TranslateService,
  ) {
    API.setBaseUrl(environment.api);
  }

  async ngOnInit() {
    this.translate.setDefaultLang('en');
  }
}
