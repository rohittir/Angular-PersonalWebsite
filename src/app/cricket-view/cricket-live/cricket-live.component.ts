/**
 * class: CricketLiveComponent
 * Directory: src/app/cricket-view/cricket-live
 * @author Rohit Tirmanwar
 */


import { Component, OnInit, OnDestroy } from '@angular/core';
import { catchError } from 'rxjs/operators';
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
      .pipe(
        catchError((err: any) => {
          console.error(err);
          return err;
        })
      ).subscribe((res: any) => {
        const matches = res.mchdata.match;
        this.matchesList = [];
        for (let i = 0; i < matches.length; i++) {
          if (!this.isDuplicateMatch(matches[i])) {
            this.matchesList.push(matches[i]);
          }
        }
        // console.log(this.matchesList);
    });
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
      .pipe(
        catchError((err: any) => {
          console.error(err);
          return err;
        })
      ).subscribe((res: any) => {
        const matches = res;

        for (let i = 0; i < matches.length; i++) {
          this._liveScoreService.fetchLiveScore(matches[i].id)
            .pipe(
              catchError((err: any) => {
                console.error(err);
                return err;
              })
            ).subscribe((match: any) => {
              this.liveMatchesList.push(match[0]);
            });
        }

    });

  }

  //
  // EVENTS
  //
  showMatchInfo(match, userEvent = true) {
    if (match.$.datapath) {
      const matchId = this.extractMatchIdFromURL(match.$.datapath);
      this._router.navigate(['/cricket/livecommentary/' + matchId]);
    }
  }

  extractMatchIdFromURL(url: string): string {
    let matchId = '';
    if (url) {
      // http://synd.cricbuzz.com/j2me/1.0/match/2018/IPL_2018/CSK_KKR_APR10/

      const urlElements = url.split('/');

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



