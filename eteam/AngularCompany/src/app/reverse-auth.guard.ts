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
export class ReverseAuthGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router, private auth: AuthService) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Promise<boolean> {
    try {
      const data = await API.authCheckCompany(
        {},
        { authKey: this.auth.getKey() },
      );

      if (data.success === true) {
        this.router.navigate(['/company']);
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
