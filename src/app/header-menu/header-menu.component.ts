

/**
 * class: HeaderMenuComponent
 * Directory: src/app/header-menu
 * @author Rohit Tirmanwar
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JSONDataService } from '../services/json-data.service';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html'
})
export class HeaderMenuComponent implements OnInit {


    //
    // PROPERTIES
    //

    isCollapsed = false;
    searchText: string = '';

    //
    // LIFECYCLE
    //
    constructor(private _router: Router, private _jsonDataService: JSONDataService) {

    }


    ngOnInit() {

    }


    //
    // OPERATIONS
    //

    isActive(routeAddress: string) {
        return this._router.url === routeAddress;
    }

    getHeaading(): string {
        let data = this._jsonDataService.getJsonData();
        if (data) {
            return data.userData.profile.name;
        }

        return 'Loading...';
    }


    //
    // EVENTS
    //

    onSearch() {
        alert(this.searchText);
    }




};



