/**
 * class: CricketScorecardComponent
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
    @Input() isSquad = false;

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

        this._liveScoreService.fetchMatchScorecard(this.scorecardURL)
        .then(res => {
            this.scoreCard = res.json().scrCard;
            console.log(this.scoreCard);
        })
        .catch(err => console.error(err));
    }

    //
    // OPERATIONS
    //
    getTeamSquad(teamSquad: string): Array<string> {

        let players: Array<string> = [];
        if (teamSquad) {
            players = teamSquad.split(',');

            if (players.length > 11) {
                players.splice(11, players.length - 11);
            }

            // for (let i = 0; i < players.length; i++) {
                // if (players[i].lastIndexOf('(S)') === (players[i].length - 3)) {
                //     players.splice(i, 1);
                //     i--;
                // }
            // }
        }

        return players;
    }

    getTeamSubs(teamSquad: string): Array<string> {
        let players: Array<string> = [];
        if (teamSquad) {
            players = teamSquad.split(',');

            if (players.length >= 11) {
                players.splice(0, 11);
            }

            // for (let i = 0; i < players.length; i++) {

            // }
        }

        return players;
    }


}



