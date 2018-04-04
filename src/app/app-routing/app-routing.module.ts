

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

const routes: Routes = [
    {
        path: '',
        component: HomePageComponent,
    },
    {
      path: 'profile',
      component: ProfilePageComponent,
    },
    {
      path: 'search',
      component: SearchPageComponent,
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
