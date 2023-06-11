import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UtilsService } from './utils.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private utils: UtilsService,
    private translate: TranslateService,
  ) {}

  ngOnInit() {
    this.translate.setDefaultLang('en');
  }
}
