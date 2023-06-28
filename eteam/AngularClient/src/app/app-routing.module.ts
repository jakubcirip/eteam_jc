import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmptyComponent } from './empty/empty.component';
import { LangGuard } from './lang.guard';
import { Location } from '@angular/common';

import {
  LocalizeRouterModule,
  LocalizeParser,
  LocalizeRouterSettings,
} from '@gilsdav/ngx-translate-router';
import { TranslateService } from '@ngx-translate/core';
import { LocalizeRouterHttpLoader } from '@gilsdav/ngx-translate-router-http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {
    path: '',
    component: EmptyComponent,
    canActivate: [LangGuard],
  },
];

@NgModule({
  imports: [
    HttpClientModule,
    RouterModule.forRoot(routes),
    LocalizeRouterModule.forRoot(routes, {
      parser: {
        provide: LocalizeParser,
        useFactory: (translate, location, settings, http) =>
          new LocalizeRouterHttpLoader(translate, location, settings, http),
        deps: [TranslateService, Location, LocalizeRouterSettings, HttpClient],
      },
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
