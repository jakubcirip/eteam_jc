import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';

import { Index3Component } from './index3/index3.component';
import { SwaggerGuard } from './swagger.guard';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    canActivate: [SwaggerGuard],
  },
  {
    path: 'error',
    component: ErrorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
