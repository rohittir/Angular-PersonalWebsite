

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
      path: 'search',
      component: SearchPageComponent,
    },
    {
      path: 'cricket',
      component: CricketViewComponent,
    },
    {
      path: 'profile/:detailsLabel',
      component: ProfileDetailsComponent
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
