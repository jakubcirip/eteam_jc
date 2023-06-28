import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ServerService } from './server.service';
import { AssistentService } from './assistent.service';
import { InterviewService } from './interview.service';

@Injectable({
  providedIn: 'root',
})
export class InterviewGuard implements CanActivate {
  constructor(
    private assistent: AssistentService,
    private server: ServerService,
    private router: Router,
    private int: InterviewService,
  ) {}
  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Promise<boolean> {
    if (next.queryParams.preview) {
      this.int.isPreview = true;
    }

    try {
      await this.server.authorize(
        this.int,
        next.params.intTag,
        next.params.userTag,
      );
      await this.assistent.loadEmojis();

      if (!this.server.isAuthorized) {
        this.router.navigate(['error']);
        return false;
      }

      return true;
    } catch (err) {
      console.log(err);
      this.router.navigate(['error']);
      return false;
    }
  }
}
