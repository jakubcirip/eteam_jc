import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { SwaggerService } from './swagger.service';

@Injectable({
  providedIn: 'root',
})
export class SwaggerGuard implements CanActivate {
  constructor(private swagger: SwaggerService) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Promise<boolean> {
    await this.swagger.isReady();

    return true;
  }
}
