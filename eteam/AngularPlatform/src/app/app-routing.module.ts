import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './pages/public/forgot-password/forgot-password.component';
import { LoginComponent } from './pages/public/login/login.component';
import { RegisterComponent } from './pages/public/register/register.component';
import { WrapperComponent } from './pages/public/wrapper/wrapper.component';
import { LangRoutes } from './services/router.service';

// Definition of all routes. we use LangRoutes so localization works properly
const routes: Routes = [
  // if we visit home, we are redirected to register page for company
  {
    path: '',
    redirectTo: `/${LangRoutes.auth}/${LangRoutes.register}`,
    pathMatch: 'full'
  },
  {
    path: LangRoutes.auth,
    component: WrapperComponent,
    children: [
      {
        path: LangRoutes.login,
        component: LoginComponent
      },
      {
        path: LangRoutes.register,
        component: RegisterComponent
      },
      {
        path: LangRoutes.forgotPassword,
        component: ForgotPasswordComponent
      }
    ]
  },

  // if the page is not found, we go to register page
  {
    path: '**',
    redirectTo: `/${LangRoutes.auth}/${LangRoutes.register}`,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

// TODO: Toto su vsetky company URLcky pre neprihlasenu firmu. asi.
// {
//   path: 'company-auth',
//   component: CompanyAuthCheckComponent,
//   data: { anim: 'NoAnim' },
//   canActivate: [ReverseAuthGuard],
// },
// {
//   path: 'company-login',
//   component: CompanyLoginComponent,
//   data: { anim: generateAnimId() },
//   canActivate: [ReverseAuthGuard],
// },

// {
//   path: 'company-forgot-password/:code',
//   component: CompanyForgotPasswordFinishComponent,
//   data: { anim: generateAnimId() },
//   canActivate: [ReverseAuthGuard],
// },
// {
//   path: 'company-registration-finish/:key',
//   component: CompanyRegistrationSuccessComponent,
//   data: { anim: generateAnimId() },
//   canActivate: [ReverseAuthGuard],
// },
