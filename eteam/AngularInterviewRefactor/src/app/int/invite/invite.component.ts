import { Component, OnInit } from '@angular/core';
import { InterviewService } from 'src/app/interview.service';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss'],
})
export class InviteComponent implements OnInit {
  constructor(
    private int: InterviewService,
    private localize: LocalizeRouterService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.int.isDark
      ? $('body').addClass('dark-version')
      : $('body').removeClass('dark-version');
  }

  onCancelInvite() {
    const translatedPath: any = this.localize.translateRoute('/invite-cancel');
    this.router.navigate([translatedPath]);
  }

  onAcceptInvite() {
    const translatedPath: any = this.localize.translateRoute(
      '/interview/setup',
    );
    this.router.navigate([translatedPath]);
  }
}
