import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AlertModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HeaderMenuComponent } from './header-menu/header-menu.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HeaderMenuComponent,
    ProfilePageComponent
  ],
  imports: [
    BrowserModule,
    AlertModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
