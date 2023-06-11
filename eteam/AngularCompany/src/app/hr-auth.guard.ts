import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import API from 'src/services/API';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class HrAuthGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router, private auth: AuthService) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Promise<boolean> {
    try {
      const data = await API.authCheckHr({}, { authKey: this.auth.getHrKey() });
      this.auth.mainPosId = data.data.posId;

      if (data.success === true) {
        return true;
      } else {
        this.router.navigate(['/hr-login']);
        return false;
      }
    } catch (exp) {
      this.router.navigate(['/hr-login']);
      return false;
    }
  }

  async canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Promise<boolean> {
    return this.canActivate(next, state);
  }
}
