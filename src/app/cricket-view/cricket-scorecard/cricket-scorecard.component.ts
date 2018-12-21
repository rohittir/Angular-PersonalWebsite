/**
 * class: CricketScorecardComponent
 * Directory: src/app/cricket-view/cricket-scorecard
 * @author Rohit Tirmanwar
 */


import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { catchError } from 'rxjs/operators';
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
        .pipe(
            catchError((err: any) => {
                console.error(err);
                return err;
            })
        ).subscribe((res: any) => {
            this.scoreCard = res.scrCard;
            this.initSquad();
            // console.log(this.scoreCard);
        });
    }

    initSquad() {
        if (this.scoreCard && this.scoreCard.squads[0].Team) {
            this.playingSquad = {};
            this.substituteSquad = {};
            for (let i = 0; i < this.scoreCard.squads[0].Team.length; i++) {
                const name = this.scoreCard.squads[0].Team[i].$.Name;
                const mem = this.scoreCard.squads[0].Team[i].$.mem;
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
                const index = players[i].lastIndexOf('(S)');
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
                const index = players[i].lastIndexOf('(S)');
                if (index >= 0) {
                    players[i] = players[i].substring(0, index);
                }
            }
        }

        return players;
    }

    getStrikeRate(batsman) {
        if (batsman) {
            const runs = parseInt(batsman.$.r, 10);
            const balls = parseInt(batsman.$.b, 10);

            if (balls <= 0) {
                return '-';
            }

            const rate = ((runs / balls) * 100);
            return rate.toFixed(2);
        }
    }


}



