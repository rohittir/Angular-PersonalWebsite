
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

  selectedMainTab = 'Live Score';
  iplStandings = null;

  constructor(public _liveScoreService: LiveScoreService) { }

  ngOnInit() {

  }

  //
  // OPERATIONS
  //



}
