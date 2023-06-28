import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

let langService: TranslateService = null;
export const __ = (msg: string, args = {}): string => {
  if (!langService) {
    return 'ERROR';
  }

  const resMsg = langService.instant(msg, args);
  return resMsg;
};

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor(private lang: TranslateService) {
    // _('handshake')
    // poznamka hore aby generator vedel o ping sprave

    langService = lang;
    langService.setDefaultLang('en');
  }

  isLangReady(): Promise<void> {
    return new Promise((p) => {
      this.lang.get('handshake').subscribe((r) => {
        p();
      });
    });
  }
}
