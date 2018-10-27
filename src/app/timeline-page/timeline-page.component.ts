
/**
 * class: TimelinePageComponent
 * Directory: src/app/timeline-page
 * @author Rohit Tirmanwar
 */


import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs/operators';
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
            .pipe(
                catchError((err: any) => {
                    console.error(err);

                    // retry locally when server is not available
                    this._jsonDataService.readUserTimelineFromJson()
                        .pipe(
                            catchError((err: any) => {
                                console.error(err);
                                return err;
                            })
                        ).subscribe((res1: any) => {
                            this.userTimelineData = res1.json();
                            this.initShowContent();
                        });
                    return err;
                })
            ).subscribe((res: any) => {
                this.userTimelineData = res.json();
                this.initShowContent();
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


}



