import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  CanActivateChild,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ServerService } from './server.service';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { AssistentService } from './assistent.service';
import { InterviewService } from './interview.service';

@Injectable({
  providedIn: 'root',
})
export class AfterInviteGuard implements CanActivate, CanActivateChild {
  constructor(
    private server: ServerService,
    private router: Router,
    private localizeRouter: LocalizeRouterService,
    private assistent: AssistentService,
    private int: InterviewService,
  ) {}

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.server.isAuthorized) {
      return true;
    }

    // DELETE ME
    // await this.server.authorize(this.int, 'bHB5OkKQ', 'sQyCVjU2');
    // await this.assistent.loadEmojis();
    // return true;
    // DELETE ME

    const url = this.localizeRouter.translateRoute('/error');
    this.router.navigate([url]);
    return false;
  }

  async canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ) {
    const res = await this.canActivate(next, state);
    return res;
  }
}
