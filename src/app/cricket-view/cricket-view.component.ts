
/**
 * class: CricketViewComponent
 * Directory: src/app/cricket-view
 * @author Rohit Tirmanwar
 */


import { Component, OnInit } from '@angular/core';
import { LiveScoreService } from './live-score.service';

@Component({
  selector: 'app-cricket-view',
  templateUrl: './cricket-view.component.html',
  styleUrls: ['./cricket-view.component.css']
})
export class CricketViewComponent implements OnInit {


  //
  // PROPERTIES
  //
  matchesList = null;
  commentaryList = null;
  liveMatchesList = [];

  selectedMatchInfo = null;
  selectedCommentary = null;
  selectedTab = 'Commentary';
  fetchInterval = null;

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
        this.matchesList = res.json().mchdata.match;
        this.commentaryList = [];
        let indexToRemove = [];

        for (let i = 0; i < this.matchesList.length; i++) {
          if (this.matchesList[i].$.datapath) {
              indexToRemove.push(i);
              let matchUrl = this.matchesList[i].$.datapath;
              this._liveScoreService.fetchMatchCommentary(matchUrl)
              .then(res => {
                this.commentaryList.push(res.json().mchDetails.match[0]);
                if (!this.selectedMatchInfo && !this.selectedCommentary) {
                  this.selectedMatchInfo = this.commentaryList[0];
                }
              })
              .catch(err => console.error(err));
            } else {
              if (!this.selectedMatchInfo && !this.selectedCommentary) {
                this.selectedMatchInfo = this.matchesList[0];
              }
            }
        }

        // remove matches with commentary
        for (let i = 0; i < indexToRemove.length; i++) {
          this.matchesList.splice(indexToRemove[i] - i, 1);
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
      console.log(res.json());
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

  showCommentary(commentary) {
    this.selectedMatchInfo = null;
    this.selectedCommentary = commentary;
  }

  showMatchInfo(match) {
    this.selectedMatchInfo = match;
    this.selectedCommentary = null;
  }


}
