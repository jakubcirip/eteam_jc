import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { FeaturesComponent } from './components/home/features/features.component';
import { BenefitsComponent } from './components/home/benefits/benefits.component';
import { InterestedBannerComponent } from './components/home/interested-banner/interested-banner.component';
import { TrustedListComponent } from './components/home/trusted-list/trusted-list.component';
import { ContactComponent } from './components/home/contact/contact.component';
import { IntroComponent } from './components/home/intro/intro.component';
import { MenuComponent } from './components/shared/menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FeaturesComponent,
    BenefitsComponent,
    InterestedBannerComponent,
    TrustedListComponent,
    ContactComponent,
    IntroComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
