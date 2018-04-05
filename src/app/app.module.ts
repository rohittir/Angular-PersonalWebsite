import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
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
import { CricketViewComponent } from './cricket-view/cricket-view.component';
import { LiveScoreService } from './cricket-view/live-score.service';
import { CricketScorecardComponent } from './cricket-view/cricket-scorecard/cricket-scorecard.component';
import { ProfileDetailsComponent } from './profile-page/profile-details/profile-details.component';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HeaderMenuComponent,
    ProfilePageComponent,
    SearchPageComponent,
    FooterComponent,
    CricketViewComponent,
    CricketScorecardComponent,
    ProfileDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    NgbModule.forRoot()
  ],
  providers: [SearchService, JSONDataService, LiveScoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
