

/**
 * class: FooterComponent
 * Directory: src/app/footer
 * @author Rohit Tirmanwar
 */


import { Component, OnInit } from '@angular/core';
import { JSONDataService } from '../services/json-data.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {


  //
  // PROPERTIES
  //
  socialDataLinks = null;

  constructor(private _jsonDataService: JSONDataService) {

  }

  ngOnInit() {
  }

  getSocialDataLinks() {
    const jsonData = this._jsonDataService.getJsonData();
    if (jsonData) {
      return jsonData.userData.social;
    }

    return null;
  }

}
