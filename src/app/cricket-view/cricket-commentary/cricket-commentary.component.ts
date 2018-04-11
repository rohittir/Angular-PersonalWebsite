/**
 * class: CricketCommentaryComponent
 * Directory: src/app/cricket-view/cricket-commentary
 * @author Rohit Tirmanwar
 */


import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { LiveScoreService } from '../live-score.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cricket-commentary',
  templateUrl: './cricket-commentary.component.html'
})
export class CricketCommentaryComponent implements OnInit, OnDestroy {

    //
    // PROPERTIES
    //
    matchId = null;
    selectedCommentary = null;
    selectedTab = 'Commentary';
    dataFetchInterval = null;

    //
    // LIFECYCLE
    //
    constructor(private _route: ActivatedRoute, private _liveScoreService: LiveScoreService) {

    }


    ngOnInit() {
        this._route.params.subscribe(params => {
            this.matchId = params['matchId'];
            if (this.matchId) {
                this.initData();

                // refresh data in 1 min interval
                this.dataFetchInterval = setInterval(this.initData.bind(this), 60000);
            }
        });
    }

    ngOnDestroy() {
        if (this.dataFetchInterval) {
            clearInterval(this.dataFetchInterval);
            this.dataFetchInterval = null;
        }
    }

    initData() {
        if (this.matchId) {
            let convMatchId =this.matchId.replace(/:/g, '/');
            let url = 'http://synd.cricbuzz.com/j2me/1.0/' + convMatchId;
            this._liveScoreService.fetchMatchCommentary(url)
            .then(res => {
              this.selectedCommentary = res.json().mchDetails.match[0];
            })
            .catch(err => console.error(err));
        }
    }

    convertGMTtoLocalTime(gmtTime: string) {
        let time = gmtTime.split(':');
        if (time.length == 2) {
          let gmtTimeMin = Math.floor(parseInt(time[0]) * 60) + Math.floor(parseInt(time[1]));
          let offset = new Date().getTimezoneOffset();
          let localTimeMin = gmtTimeMin - offset;

          if (localTimeMin < 0 || localTimeMin > (60 * 24)) {
            return gmtTime + ' Hrs GMT';
          }

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


}



