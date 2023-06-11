import { LOCALE_ID, Inject } from '@angular/core';

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @Input() mobileMenuOpened: boolean;
  @Input() mobileMenuAnimFinished: boolean;
  @Input() focusForm: boolean;

  @Output() setMobileMenuOpened = new EventEmitter();
  @Output() setMobileMenuAnimFinished = new EventEmitter();
  @Output() setFocusForm = new EventEmitter();

  isLangOpened = false;
  isLangOpenedAnimation = false;

  langs: {
    name: string;
    fullName: string;
  }[] = [
    {
      name: 'en',
      fullName: 'English',
    },

    {
      name: 'cs',
      fullName: 'Czech',
    },
    {
      name: 'sk',
      fullName: 'Slovak',
    },
    {
      name: 'de',
      fullName: 'German',
    },
  ];

  currentLang: { name: string; fullName: string };

  constructor(@Inject(LOCALE_ID) public locale: string) {}

  ngOnInit(): void {
    const lang = this.langs.find((l) => l.name === this.locale);

    if (lang) {
      this.currentLang = lang;
      this.langs = this.langs.filter((l) =>
        l.name === this.locale ? false : true
      );
    } else {
      this.currentLang = this.langs[0];
      this.langs = this.langs.filter((l, i) => i > 0);
    }
  }

  onFocusForm() {
    this.setFocusForm.emit(true);

    setTimeout(() => {
      this.setFocusForm.emit(false);
    }, 800);
  }

  onFocusFormExternal() {
    document.querySelector('.small-contact-form')?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });

    setTimeout(() => {
      this.onFocusForm();
    }, 800);
  }

  onFocusFormExternalMobile() {
    this.onCloseMobile();

    document.querySelector('.small-contact-form')?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });

    setTimeout(() => {
      this.onFocusForm();
    }, 400);
  }

  scrollTo(id: string) {
    document.querySelector('.' + id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  scrollToMobile(id: string) {
    this.onCloseMobile();

    document.querySelector('.' + id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  onOpenMobile() {
    this.setMobileMenuAnimFinished.emit(false);
    this.setMobileMenuOpened.emit(true);

    setTimeout(() => {
      this.setMobileMenuAnimFinished.emit(true);
    }, 100);
  }

  onCloseMobile() {
    this.setMobileMenuAnimFinished.emit(false);
    this.setMobileMenuOpened.emit(false);

    setTimeout(() => {
      this.setMobileMenuAnimFinished.emit(true);
    }, 100);
  }

  toggleLang() {
    if (!this.isLangOpened) {
      this.isLangOpenedAnimation = true;
      setTimeout(() => {
        this.isLangOpened = true;
      }, 50);
    } else {
      this.isLangOpened = false;
      setTimeout(() => {
        this.isLangOpenedAnimation = false;
      }, 100);
    }
  }
}
