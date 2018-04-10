
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
    inspirationData = null;

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

        // USER PRofile Data
        this._jsonDataService.fetchUserData()
        .then(res => {
            this.userProfile = res.json().userData.profile;
            this._jsonDataService.setJsonData(res.json());
        })
        .catch(err => {
            console.error(err);

             // retry locally when server is not available
            this._jsonDataService.readUserProfileDataFromJson()
            .then(res1 => {
                this.userProfile = res1.json().userData.profile;;
                this._jsonDataService.setJsonData(res1.json());
            })
        });

        // INspirations data
        this._jsonDataService.fetchCurrentInspiration()
        .then(res => {
            this.inspirationData = res.json();
        })
        .catch(err => console.error(err));
    }


};



