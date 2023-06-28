import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  key = 'NOT LOGGED';
  hrKey = 'NOT LOGGED';
  domain = environment.defaultDomain;

  mainPosId = 1;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cookie: CookieService,
  ) {
    const key = this.getParameterByName('secret');
    if (key) {
      this.setKey(key);
    } else {
      const sec = this.cookie.get('secret');
      if (sec) {
        this.setKey(sec);
      }
    }

    if (!this.domain || this.domain === environment.defaultDomain) {
      if (this.getSubdomain() !== null) {
        this.setDomain(this.getSubdomain());
      } else {
        const domain = this.getParameterByName('domain');
        if (domain) {
          this.setDomain(domain);
        } else {
          const backupDomain = this.cookie.get('domain');
          if (backupDomain) {
            this.setDomain(backupDomain);
          }
        }
      }
    }

    const key2 = this.getParameterByName('hr_secret');
    if (key2) {
      this.setHrKey(key2);
    } else {
      const key2Backup = this.cookie.get('hr_secret');
      if (key2Backup) {
        this.setHrKey(key2Backup);
      }
    }
  }

  setDomain(key: string) {
    this.domain = key;
    if (this.cookie.get('domain')) {
      this.cookie.delete('domain', '/');
    }
    this.cookie.set('domain', key, null, '/');
  }

  setKey(key: string) {
    this.key = key;
    if (this.cookie.get('secret')) {
      this.cookie.delete('secret', '/');
    }
    this.cookie.set('secret', key, null, '/');
  }

  setHrKey(key: string) {
    this.hrKey = key;
    if (this.cookie.get('hr_secret')) {
      this.cookie.delete('hr_secret', '/');
    }
    this.cookie.set('hr_secret', key, null, '/');
  }

  getKey(): string {
    return this.key;
  }

  getHrKey(): string {
    return this.hrKey;
  }

  getDomain(): string {
    return this.domain;
  }

  getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    const results = regex.exec(url);
    if (!results) {
      return null;
    }
    if (!results[2]) {
      return '';
    }
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }

  getSubdomain() {
    const url = window.location.host;
    const parts = url.split('.');
    if (parts.length < 3) {
      return null;
    }

    const sub = parts[0];
    return sub;
  }

  setDarkTheme() {
    const el = document.getElementById('page');
    if (el.classList.contains('bg-dark')) {
      // el.classList.remove('bg-dark');
    } else {
      el.classList.add('bg-dark');
    }
  }
}
