/**
 * class: CricketNewsComponent
 * Directory: src/app/cricket-view/cricket-news
 * @author Rohit Tirmanwar
 */


import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { LiveScoreService } from '../live-score.service';

@Component({
  selector: 'app-cricket-news',
  templateUrl: './cricket-news.component.html'
})
export class CricketNewsComponent implements OnInit {

    //
    // INPUTS
    //

    //
    // PROPERTIES
    //
    headlinesList = null;
    currentHeadline = null;
    currentHeadlineIndex = null;

    //
    // LIFECYCLE
    //
    constructor(private _liveScoreService: LiveScoreService) {

    }


    ngOnInit() {
        this.initData();
    }

    initData() {
        this._liveScoreService.fetchCricketNews()
        .pipe(
            catchError((err: any) => {
                console.error(err);
                return err;
            })
        ).subscribe((res: any) => {
            // console.log(res);
            this.headlinesList = res.articles;
            this.showNext();
        });
    }

    //
    // EVENTS
    //

    showPrevious() {
        if (!this.headlinesList || this.headlinesList.length <= 0) {
            return;
        }

        if (!this.currentHeadline) {
            this.currentHeadlineIndex = 0;
        } else {
            this.currentHeadlineIndex--;
            if (this.currentHeadlineIndex < 0) {
                this.currentHeadlineIndex = this.headlinesList.length - 1;
            }
        }

        this.currentHeadline = this.headlinesList[this.currentHeadlineIndex];

    }

    showNext() {
        if (!this.headlinesList || this.headlinesList.length <= 0) {
            return;
        }

        if (!this.currentHeadline) {
            this.currentHeadlineIndex = 0;
        } else {
            this.currentHeadlineIndex++;
            if (this.currentHeadlineIndex >= this.headlinesList.length) {
                this.currentHeadlineIndex = 0;
            }
        }

        this.currentHeadline = this.headlinesList[this.currentHeadlineIndex];
    }

    showCurrentIndex() {
        return '' + (this.currentHeadlineIndex + 1) + ' / ' + this.headlinesList.length + '';
    }

    getDate(date: string) {
        return new Date(Date.parse(date)).toLocaleString();
    }


}



