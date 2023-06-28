import { Routes, RouterModule } from '@angular/router';
import { LangGuard } from './lang.guard';
import { InterviewGuard } from './interview.guard';
import { InviteComponent } from './int/invite/invite.component';
import { AfterInviteGuard } from './after-invite.guard';
import { BeforeComponent } from './int/before/before.component';
import { BaseComponent } from './int/base/base.component';
import { ErrorComponent } from './error/error.component';
import { InviteCancelComponent } from './int/invite-cancel/invite-cancel.component';
import { StartComponent } from './int/start/start.component';
import { EmojiMp3Guard } from './emoji-mp3.guard';
import { InterviewErrorComponent } from './interview-error/interview-error.component';

export const routes: Routes = [
  {
    path: 'invite/:intTag/:userTag',
    canActivate: [InterviewGuard, LangGuard],
    component: InviteComponent,
  },
  {
    path: 'invite-cancel',
    canActivate: [LangGuard],
    component: InviteCancelComponent,
  },
  {
    path: 'submit-error',
    canActivate: [LangGuard],
    component: InterviewErrorComponent,
  },
  {
    path: 'interview',
    canActivate: [AfterInviteGuard, LangGuard, EmojiMp3Guard],
    canActivateChild: [AfterInviteGuard, LangGuard, EmojiMp3Guard],
    component: BaseComponent,
    children: [
      {
        path: 'setup',
        component: BeforeComponent,
      },
      {
        path: 'start',
        component: StartComponent,
      },
    ],
  },
  {
    path: 'error',
    component: ErrorComponent,
    canActivate: [LangGuard],
  },

  { path: '', redirectTo: '/error', pathMatch: 'full' },
  { path: '**', redirectTo: '/error', pathMatch: 'full' },
];
