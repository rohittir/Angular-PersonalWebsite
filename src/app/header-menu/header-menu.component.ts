



import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html'
})
export class HeaderMenuComponent implements OnInit {


    //
    // PROPERTIES
    //

    searchText: string = '';

    //
    // LIFECYCLE
    //
    constructor(private _router: Router) {

    }


    ngOnInit() {

    }


    //
    // OPERATIONS
    //

    isActive(routeAddress: string) {

        return this._router.url === routeAddress;

    }


    //
    // EVENTS
    //

    onSearch() {
        alert(this.searchText);
    }




};



