/**
 * class: CricketLiveComponent
 * Directory: src/app/cricket-view/cricket-live
 * @author Rohit Tirmanwar
 */


import { Component, OnInit } from '@angular/core';
import { LiveScoreService } from '../live-score.service';

@Component({
  selector: 'app-cricket-live',
  templateUrl: './cricket-live.component.html'
})
export class CricketLiveComponent implements OnInit {


  //
  // PROPERTIES
  //
  matchesList = null;
  liveMatchesList = [];

  selectedMatchInfo = null;
  selectedCommentary = null;
  selectedTab = 'Commentary';

  constructor(public _liveScoreService: LiveScoreService) { }

  ngOnInit() {
    this.refreshMatches();
    this.refreshLiveScore();
  }

  //
  // OPERATIONS
  //

  private refreshMatches() {
    // Fetch Live scores
    this._liveScoreService.fetchCurrentMatches()
    .then(res => {
        let matches = res.json().mchdata.match;

        this.matchesList = [];
        for (let i = 0; i < matches.length; i++) {
          this.matchesList.push(matches[i]);

          if (!this.selectedCommentary && i == 0) {
            this.showMatchInfo(matches[i]);
          }
        }
    })
    .catch(err => console.error(err));
  }


  //
  // LIVE Score From cricscore
  //
  refreshLiveScore() {

    this.liveMatchesList = [];
    this._liveScoreService.fetchLiveMatches()
    .then(res => {
      let matches = res.json();

      for (let i = 0; i < matches.length; i++) {
        this._liveScoreService.fetchLiveScore(matches[i].id)
        .then(match => {
          this.liveMatchesList.push(match.json()[0]);
        })
        .catch(err1 => console.error(err1));
      }

    })
    .catch(err => console.error(err));

  }


  //
  // EVENTS
  //

  showMatchInfo(match) {

    if (match === this.selectedMatchInfo) {
      return;
    }

    this.selectedMatchInfo = match;

    if (!match.$.datapath) {
      this.selectedCommentary = null;
      return;
    }

    this.selectedCommentary = null;
    this._liveScoreService.fetchMatchCommentary(match.$.datapath)
    .then(res => {
      this.selectedCommentary = res.json().mchDetails.match[0];
    })
    .catch(err => console.error(err));

  }





}



