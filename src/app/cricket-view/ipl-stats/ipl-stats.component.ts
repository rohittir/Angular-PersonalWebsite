/**
 * class: IPLStatsComponent
 * Directory: src/app/cricket-view/ipl-stats
 * @author Rohit Tirmanwar
 */


import { Component, Input, OnInit } from '@angular/core';
import { catchError } from 'rxjs/operators';

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

    iplSchedule = null;

    availableStatsCategory = ['Schedule', 'Points Table', 'Most Runs',
        'Best Batting Average', 'Best Batting Strike Rate', 'Most Sixes',
        'Fastest Fifties', 'Highest Scores', 'Most Wickets',
        'Best Bowling Average', 'Best Bowling Economy'];

    //
    // LIFECYCLE
    //
    constructor(private _iplStatsService: IPLStatsService) {

    }


    ngOnInit() {
        this.onMenuChange(0);
        this.fetchIPLSchedule();
    }

    fetchIPLSchedule() {
        this._iplStatsService.fetchIPLSchedule()
        .pipe(
            catchError(err => {
                console.error(err);
                return err;
            })
        ).subscribe((data: any) => {
            console.log(data.json());
            this.iplSchedule = data.json();
        });
    }

    //
    // EVENTS
    //
    onMenuChange(index) {
        this.selectedMenuIndex = index;
        if (index >= 1) {
            --index;
            this.selectedData = null;
            this._iplStatsService.fetchIPLStats(index)
            .pipe(
                catchError(err => {
                    console.error(err);
                    return err;
                })
            )
            .subscribe((res: any) => {
                const resData = res.json();
                this.selectedData = resData.data;
                this.timeUpdated = resData.updated;
                // console.log(this.selectedData);
            });
        }

    }


}



