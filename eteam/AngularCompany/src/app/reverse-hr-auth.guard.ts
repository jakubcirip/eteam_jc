import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanActivateChild,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import API from 'src/services/API';

@Injectable({
  providedIn: 'root',
})
export class ReverseHrAuthGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router, private auth: AuthService) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Promise<boolean> {
    try {
      const data = await API.authCheckHr({}, { authKey: this.auth.getHrKey() });

      if (data.success === true) {
        this.router.navigate(['/hr']);
        return false;
      } else {
        return true;
      }
    } catch (exp) {
      return true;
    }
  }

  async canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Promise<boolean> {
    return this.canActivate(next, state);
  }
}
