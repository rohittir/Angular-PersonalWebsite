


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
        this.populateData();
    }


    //
    // OPERATIONS
    //

    populateData() {
        this.jsonData = this._jsonDataService.getJsonData();

        if(!this.jsonData) {
            setTimeout(this.populateData.bind(this), 1000);
            return;
        }

        this.profile = this.jsonData.userData.profile;
        this.skillList = this.jsonData.userData.skills.keywords;
        this.schoolList = this.jsonData.userData.education.schools;
        this.industryList = this.jsonData.userData.experience.industries;
        this.academicProjectList = this.jsonData.userData.academic.projects;

    }







};



