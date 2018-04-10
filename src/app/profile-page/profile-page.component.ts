


/**
 * class: ProfilePageComponent
 * Directory: src/app/profile-page
 * @author Rohit Tirmanwar
 */

import { Component, OnInit } from '@angular/core';
import { JSONDataService } from '../services/json-data.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html'
})
export class ProfilePageComponent implements OnInit {


    //
    // PROPERTIES
    //
    jsonData = null;
    profile = null;
    skillList = null;
    schoolList = null;
    industryList = null;
    academicProjectList = null;


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
             this.jsonData = res.json();
             this._jsonDataService.setJsonData(this.jsonData);
             this.populateUserJSONData();
         })
         .catch(err => {
             console.error(err);

             // retry locally when server is not available
             this._jsonDataService.readUserProfileDataFromJson()
             .then(res1 => {
                 this.jsonData = res1.json();
                 this._jsonDataService.setJsonData(this.jsonData);
                 this.populateUserJSONData();
             })
         });
    }

    populateUserJSONData() {
        this.profile = this.jsonData.userData.profile;
        this.skillList = this.jsonData.userData.skills.keywords;
        this.schoolList = this.jsonData.userData.education.schools;
        this.industryList = this.jsonData.userData.experience.industries;
        this.academicProjectList = this.jsonData.userData.academic.projects;
    }







};



