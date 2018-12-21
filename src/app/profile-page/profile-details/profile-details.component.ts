

/**
 * class: ProfileDetailsComponent
 * Directory: src/app/profile-page/profile-details
 * @author Rohit Tirmanwar
 */


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JSONDataService } from '../../services/json-data.service';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent implements OnInit {


  //
  // PROPERTIES
  //
  profileLabel = null;
  industryInfo = null;


  //
  // LIFECYCLE
  //
  constructor(private _route: ActivatedRoute, private _jsonDataService: JSONDataService) {
  }

  ngOnInit() {
    this._route.params.subscribe(params => {
      this.profileLabel = params['detailsLabel'];

      if (this.profileLabel) {
        this.initData();
      }

    });

  }

  initData() {

    const jsonData = this._jsonDataService.getJsonData();
    if (jsonData) {

      const industries = jsonData.userData.experience.industries;
      for (let i = 0; i < industries.length; i++) {
        if (industries[i].label === this.profileLabel) {
          this.industryInfo = industries[i];
          break;
        }
      }

    }


  }


}
