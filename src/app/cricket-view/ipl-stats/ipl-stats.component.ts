/**
 * class: IPLStatsComponent
 * Directory: src/app/cricket-view/ipl-stats
 * @author Rohit Tirmanwar
 */


import { Component, Input, OnInit } from '@angular/core';
import { IPLStatsService } from './ipl-stats.service';

@Component({
  selector: 'app-ipl-stats',
  templateUrl: './ipl-stats.component.html'
})
export class IPLStatsComponent implements OnInit {

    //
    // INPUTS
    //

    //
    // PROPERTIES
    //
    selectedMenuIndex = null;
    selectedData = null;
    timeUpdated = null;

    availableStatsCategory = ['Points Table', 'Most Runs', 'Best Batting Average', 'Best Batting Strike Rate', 'Most Sixes', 'Fastest Fifties', 'Highest Scores', 'Most Wickets',
    'Best Bowling Average', 'Best Bowling Economy'];

    //
    // LIFECYCLE
    //
    constructor(private _iplStatsService: IPLStatsService) {

    }


    ngOnInit() {
        this.onMenuChange(0);
    }

    //
    // EVENTS
    //
    onMenuChange(index) {
        this.selectedMenuIndex = index;
        this.selectedData = null;
        this._iplStatsService.fetchIPLStats(index).then(res => {
            let resData = res.json();
            this.selectedData = resData.data;
            this.timeUpdated = resData.updated;
            // console.log(this.selectedData);
        })
        .catch(err => console.error(err));

    }


}



