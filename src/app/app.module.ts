import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AlertModule } from 'ngx-bootstrap';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HeaderMenuComponent } from './header-menu/header-menu.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { SearchService } from './search-page/search.service';
import { FooterComponent } from './footer/footer.component';
import { JSONDataService } from './services/json-data.service';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HeaderMenuComponent,
    ProfilePageComponent,
    SearchPageComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AlertModule.forRoot()
  ],
  providers: [SearchService, JSONDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
