import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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
import { ServerConfigService } from './services/server-config.service';
import { CricketNewsComponent } from './cricket-view/cricket-news/cricket-news.component';
import { CricketLiveComponent } from './cricket-view/cricket-live/cricket-live.component';
import { IPLStatsComponent } from './cricket-view/ipl-stats/ipl-stats.component';
import { IPLStatsService } from './cricket-view/ipl-stats/ipl-stats.service';
import { TimelinePageComponent } from './timeline-page/timeline-page.component';
import { CricketCommentaryComponent } from './cricket-view/cricket-commentary/cricket-commentary.component';


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
    ProfileDetailsComponent,
    CricketNewsComponent,
    CricketLiveComponent,
    IPLStatsComponent,
    TimelinePageComponent,
    CricketCommentaryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    SearchService,
    JSONDataService,
    LiveScoreService,
    ServerConfigService,
    IPLStatsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
