
/**
 * class: TimelinePageComponent
 * Directory: src/app/timeline-page
 * @author Rohit Tirmanwar
 */


import { Component, OnInit } from '@angular/core';
import { JSONDataService } from '../services/json-data.service';

@Component({
  selector: 'app-timeline-page',
  templateUrl: './timeline-page.component.html',
  styleUrls: ['./timeline-page.component.css']
})
export class TimelinePageComponent implements OnInit {


    //
    // PROPERTIES
    //
    userTimelineData = null;
    showContent = [];
    showAlways = [];


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

        // User Timeline Data
        this._jsonDataService.fetchUserTimelineData()
        .then(res => {
            this.userTimelineData = res.json();
            this.initShowContent();
        })
        .catch(err => {
            console.error(err);

            // retry locally when server is not available
            this._jsonDataService.readUserTimelineFromJson()
            .then(res1 => {
                this.userTimelineData = res1.json();
                this.initShowContent();
            })
        });
    }

    initShowContent() {
        this.showContent = [];
        this.showAlways = [];
        for (let i = 0; i < this.userTimelineData.timeline.length; i++) {
            this.showContent.push(false);
            this.showAlways.push(false);
        }
    }


};



