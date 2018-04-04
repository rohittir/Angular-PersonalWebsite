
/**
 * class: HomePageComponent
 * Directory: src/app/home-page
 * @author Rohit Tirmanwar
 */


import { Component, OnInit } from '@angular/core';
import { JSONDataService } from '../services/json-data.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {


    //
    // PROPERTIES
    //
    userProfile = null;

    //
    // LIFECYCLE
    //
    constructor(private _jsonDataService: JSONDataService) {

    }


    ngOnInit() {
        this.initData();
    }


    //
    // OPERATIONS
    //
    initData() {
        let jsonData = this._jsonDataService.getJsonData();

        if (!jsonData) {
            setTimeout(this.initData.bind(this), 1000);
            return;
        }

        this.userProfile = jsonData.userData.profile;


    }


};



