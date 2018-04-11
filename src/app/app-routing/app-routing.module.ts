

/**
 * class: AppRoutingModule
 * Directory: src/app/app-routing
 * @author Rohit Tirmanwar
 */


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from '../home-page/home-page.component';
import { ProfilePageComponent } from '../profile-page/profile-page.component';
import { SearchPageComponent } from '../search-page/search-page.component';
import { CricketViewComponent } from '../cricket-view/cricket-view.component';
import { ProfileDetailsComponent } from '../profile-page/profile-details/profile-details.component';
import { TimelinePageComponent } from '../timeline-page/timeline-page.component';
import { CricketCommentaryComponent } from '../cricket-view/cricket-commentary/cricket-commentary.component';
// import { CricketNewsComponent } from '../cricket-view/cricket-news/cricket-news.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
      path: 'home',
      component: HomePageComponent,
    },
    {
      path: 'profile',
      component: ProfilePageComponent,
    },
    {
      path: 'profile/:detailsLabel',
      component: ProfileDetailsComponent
    },
    {
      path: 'timeline',
      component: TimelinePageComponent,
    },
    {
      path: 'search',
      component: SearchPageComponent,
    },
    {
      path: 'cricket',
      component: CricketViewComponent,
    },
    {
      path: 'cricket/livecommentary/:matchId',
      component: CricketCommentaryComponent,
    }

];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    declarations: []
})

export class AppRoutingModule { }
