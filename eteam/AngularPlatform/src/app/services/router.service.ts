import { Injectable } from '@angular/core';

// we always use cammelCase for key, because if we used 'forgot-password' we wound have to access it using LangRoutes['forgot-password'] and that did not work in html template (angular somehow doesnt care and throw syntax error)
export const LangRoutes = {
  auth: $localize`:routing - route part@@soeY2eg:auth`,
  login: $localize`:routing - route part@@soeY2ue:login`,
  register: $localize`:routing - route part@@soeY2TX:register`,
  forgotPassword: $localize`:routing - route part@@soeY3e0:forgot-password`
};

@Injectable({
  providedIn: 'root'
})
export class RouterService {
  constructor() {}
}
