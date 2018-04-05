/**
 * class: HomePageComponent
 * Directory: src/app/cricket-view/cricket-scorecard
 * @author Rohit Tirmanwar
 */


import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { LiveScoreService } from '../live-score.service';

@Component({
  selector: 'app-cricket-scorecard',
  templateUrl: './cricket-scorecard.component.html'
})
export class CricketScorecardComponent implements OnInit, OnChanges {

    //
    // INPUTS
    //
    @Input() scorecardURL = null;

    //
    // PROPERTIES
    //
    scoreCard = null;

    //
    // LIFECYCLE
    //
    constructor(private _liveScoreService: LiveScoreService) {

    }


    ngOnInit() {
        this.initData();
    }

    ngOnChanges() {
        this.initData();
    }

    initData() {
        if (!this.scorecardURL) {
            return;
        }

        this._liveScoreService.fetchLiveScorecard(this.scorecardURL, this.scorecardResults.bind(this));
    }



    //
    // OPERATIONS
    //
    scorecardResults(err, result) {

        if (err) {
            return;
        }

        this.scoreCard = result.scrCard;
        console.log(this.scoreCard);

    }
}



