import { Component, OnInit } from '@angular/core';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  constructor(private langService: LocalizeRouterService) {}

  ngOnInit() {}

  onSetLang(lang: string) {
    this.langService.changeLanguage(lang);
  }
}
