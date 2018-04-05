
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
  selectedMatchInfo = null;
  selectedCommentary = null;

  constructor(private _liveScoreService: LiveScoreService) { }

  ngOnInit() {
    this.initSettings();
  }

  //
  // OPERATIONS
  //

  initSettings() {

    if (!this._liveScoreService.commentaryList && !this._liveScoreService.matchesList) {
      setTimeout(this.initSettings.bind(this), 1000);
      return;
    }

    if (this._liveScoreService.matchesList && this._liveScoreService.matchesList.length > 0) {
      this.selectedMatchInfo = this._liveScoreService.matchesList[0];
    } else if (this._liveScoreService.commentaryList && this._liveScoreService.commentaryList.length > 0) {
      this.selectedCommentary = this._liveScoreService.commentaryList[0];
    }


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
