import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { TranslateICUParser } from 'ngx-translate-parser-plural-select/dist';

import {
  TranslateLoader,
  TranslateModule,
  TranslateCompiler,
  TranslateParser,
} from '@ngx-translate/core';
import { Location } from '@angular/common';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { SliderComponent } from './slider/slider.component';
import { AboutComponent } from './about/about.component';
import { ServiceComponent } from './service/service.component';
import { CountersComponent } from './counters/counters.component';
import { TeamComponent } from './team/team.component';
import { ParralaxComponent } from './parralax/parralax.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ClientsComponent } from './clients/clients.component';
import { BlogComponent } from './blog/blog.component';
import { ClientComponent } from './client/client.component';
import { MapComponent } from './map/map.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './footer/footer.component';
import { EmptyComponent } from './empty/empty.component';
import { SliderNewComponent } from './slider-new/slider-new.component';
import { ModalComponent } from './lib/modal/modal.component';
import { RemoveDirective } from './remove.directive';
import { MoreFeaturesComponent } from './more-features/more-features.component';
import { CalcComponent } from './pages/calc/calc.component';
import { PricingNewComponent } from './pricing-new/pricing-new.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SliderComponent,
    AboutComponent,
    ServiceComponent,
    CountersComponent,
    TeamComponent,
    ParralaxComponent,
    PortfolioComponent,
    ClientsComponent,
    BlogComponent,
    ClientComponent,
    MapComponent,
    ContactComponent,
    FooterComponent,
    EmptyComponent,
    SliderNewComponent,
    ModalComponent,
    RemoveDirective,
    MoreFeaturesComponent,
    CalcComponent,
    PricingNewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      parser: {
        provide: TranslateParser,
        useClass: TranslateICUParser,
      },
    }),
  ],
  providers: [Location],
  bootstrap: [AppComponent],
})
export class AppModule {}

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
