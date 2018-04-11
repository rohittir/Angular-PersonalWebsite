/**
 * class: CricketLiveComponent
 * Directory: src/app/cricket-view/cricket-live
 * @author Rohit Tirmanwar
 */


import { Component, OnInit, OnDestroy } from '@angular/core';
import { LiveScoreService } from '../live-score.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cricket-live',
  templateUrl: './cricket-live.component.html'
})
export class CricketLiveComponent implements OnInit, OnDestroy {


  //
  // PROPERTIES
  //
  matchesList = null;
  liveMatchesList = [];
  selectedMatchInfo = null;
  showLive = false;
  dataFetchInterval = null;

  constructor(public _liveScoreService: LiveScoreService, public _router: Router) { }

  ngOnInit() {
    this.refresh();

    // refresh data in 1 min interval
    this.dataFetchInterval = setInterval(this.refresh.bind(this), 60000);
  }

  ngOnDestroy() {
    if (this.dataFetchInterval) {
      clearInterval(this.dataFetchInterval);
      this.dataFetchInterval = null;
    }
  }

  //
  // OPERATIONS
  //

  refresh() {
    this.refreshMatches();
  }

  private refreshMatches() {
    // Fetch Live scores
    this._liveScoreService.fetchCurrentMatches()
    .then(res => {
        let matches = res.json().mchdata.match;
        this.matchesList = [];
        for (let i = 0; i < matches.length; i++) {
          if (!this.isDuplicateMatch(matches[i])) {
            this.matchesList.push(matches[i]);
          }
        }
        // console.log(this.matchesList);
    })
    .catch(err => console.error(err));
  }

  private isDuplicateMatch(match): boolean {

    for (let i = 0; i < this.matchesList.length; i++) {
      if (match.$.datapath === this.matchesList[i].$.datapath && match.$.datapath) {
        return true;
      }
    }

    return false;
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
  showMatchInfo(match, userEvent = true) {
    if (match.$.datapath) {
      let matchId = this.extractMatchIdFromURL(match.$.datapath);
      this._router.navigate(['/cricket/livecommentary/' + matchId]);
    }
  }

  extractMatchIdFromURL(url: string): string {
    let matchId = '';
    if (url) {
      // http://synd.cricbuzz.com/j2me/1.0/match/2018/IPL_2018/CSK_KKR_APR10/

      let urlElements = url.split('/');

      if (urlElements.length >= 10) {
        matchId += urlElements[urlElements.length - 5];
        matchId += ':';
        matchId += urlElements[urlElements.length - 4];
        matchId += ':';
        matchId += urlElements[urlElements.length - 3];
        matchId += ':';
        matchId += urlElements[urlElements.length - 2];
        matchId += ':';
      }

    }

    return matchId;


  }



}



