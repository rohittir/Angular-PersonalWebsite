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
    playingSquad = {};
    substituteSquad = {};

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
            this.initSquad();
            // console.log(this.scoreCard);
        })
        .catch(err => console.error(err));
    }

    initSquad() {
        if (this.scoreCard && this.scoreCard.squads[0].Team) {
            this.playingSquad = {};
            this.substituteSquad = {};
            for (let i = 0; i < this.scoreCard.squads[0].Team.length; i++) {
                let name = this.scoreCard.squads[0].Team[i].$.Name;
                let mem = this.scoreCard.squads[0].Team[i].$.mem;
                this.playingSquad[name] = this.getTeamSquad(mem);
                this.substituteSquad[name] = this.getTeamSubs(mem);
            }
        }

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

            for (let i = 0; i < players.length; i++) {
                let index = players[i].lastIndexOf('(S)');
                if (index >= 0) {
                    players[i] = players[i].substring(0, index);
                }
            }
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

            for (let i = 0; i < players.length; i++) {
                let index = players[i].lastIndexOf('(S)');
                if (index >= 0) {
                    players[i] = players[i].substring(0, index);
                }
            }
        }

        return players;
    }

    getStrikeRate(batsman) {
        if (batsman) {
            let runs = parseInt(batsman.$.r);
            let balls = parseInt(batsman.$.b);

            if (balls <= 0) {
                return '-';
            }

            let rate = ((runs/balls) * 100);
            return rate.toFixed(2);
        }
    }


}



