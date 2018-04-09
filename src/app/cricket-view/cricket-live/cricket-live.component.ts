/**
 * class: CricketLiveComponent
 * Directory: src/app/cricket-view/cricket-live
 * @author Rohit Tirmanwar
 */


import { Component, OnInit, OnDestroy } from '@angular/core';
import { LiveScoreService } from '../live-score.service';

@Component({
  selector: 'app-cricket-live',
  templateUrl: './cricket-live.component.html',
  styleUrls: ['./cricket-live.component.css']
})
export class CricketLiveComponent implements OnInit, OnDestroy {


  //
  // PROPERTIES
  //
  matchesList = null;
  liveMatchesList = [];

  selectedMatchInfo = null;
  selectedCommentary = null;
  selectedTab = 'Commentary';
  showLive = false;

  showMatchCommentary = false;
  dataFetchInterval = null;

  constructor(public _liveScoreService: LiveScoreService) { }

  ngOnInit() {
    this.refresh();
  }

  ngOnDestroy() {
    if (this.dataFetchInterval) {
      clearInterval(this.dataFetchInterval);
    }
  }

  //
  // OPERATIONS
  //

  private isDuplicateMatch(match): boolean {

    for (let i = 0; i < this.matchesList.length; i++) {
      if (match.$.datapath === this.matchesList[i].$.datapath && match.$.datapath) {
        return true;
      }
    }

    return false;
  }

  private refreshMatches() {
    // Fetch Live scores
    this._liveScoreService.fetchCurrentMatches()
    .then(res => {
        let matches = res.json().mchdata.match;
        // console.log(matches);

        this.matchesList = [];
        for (let i = 0; i < matches.length; i++) {
          if (!this.isDuplicateMatch(matches[i])) {
            this.matchesList.push(matches[i]);
          }

          // if (!this.selectedMatchInfo && i == 0) {
          //   this.selectedMatchInfo = matches[i];
          // }

          // this.showMatchInfo(this.selectedMatchInfo, false);
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

  refreshCommentary(match) {
    if (!match.$.datapath) {
      return;
    }

    this._liveScoreService.fetchMatchCommentary(match.$.datapath)
      .then(res => {
        this.selectedCommentary = res.json().mchDetails.match[0];
         if (this.dataFetchInterval && this.selectedCommentary.manofthematch) {
          clearInterval(this.dataFetchInterval);
        }
      })
      .catch(err => console.error(err));
  }

  convertGMTtoLocalTime(gmtTime: string) {
    let time = gmtTime.split(':');
    if (time.length == 2) {
      let gmtTimeMin = Math.floor(parseInt(time[0]) * 60) + Math.floor(parseInt(time[1]));
      let offset = new Date().getTimezoneOffset();
      let localTimeMin = gmtTimeMin - offset;

      let localHours = Math.floor(localTimeMin/60);
      let localMins = Math.floor(localTimeMin%60);
      let timeDay = 'AM';
      if (localHours >= 12) {
        localHours = localHours - 12;
        timeDay = 'PM';
      }
      if (localHours == 0) {
        localHours = 12;
      }

      let hours = (localHours < 10)? ('0' + localHours) : localHours;
      let mins = (localMins < 10)? ('0' + localMins) : localMins;

      return ( hours + ':' + mins + ' ' + timeDay);
    }
  }

  //
  // EVENTS
  //
  showMatchInfo(match, userEvent = true) {

    // if (match === this.selectedMatchInfo) {
    //   return;
    // }

    this.selectedMatchInfo = match;

    // if (!match.$.datapath) {
    //   this.selectedCommentary = null;
    //   return;
    // }

    this.selectedCommentary = null;
    this.refreshCommentary(match);

    if (userEvent) {
      this.showMatchCommentary = true;
    }

    if (this.dataFetchInterval) {
      clearInterval(this.dataFetchInterval);
    }

    this.dataFetchInterval = setInterval(this.refreshCommentary.bind(this), 60000, match);
  }


  refresh() {
    // this.refreshLiveScore();
    // this.selectedMatchInfo = null;

    if (!this.showMatchCommentary) {
      this.refreshMatches();
    } else {
      this.showMatchInfo(this.selectedMatchInfo);
    }
  }



}



