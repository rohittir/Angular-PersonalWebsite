/**
 * class: LiveScoreService
 * Directory: src/app/cricket-view
 * @author Rohit Tirmanwar
 */


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ServerConfigService } from '../../services/server-config.service';


@Injectable()
export class IPLStatsService {

    constructor(
        private _http: HttpClient,
        private _serverConfigService: ServerConfigService) {
    }

    //
    // OPERATIONS
    //

    // fetch the ipl stats data
    public fetchIPLStats(index): Observable<any> {
        return this._http.get(this._serverConfigService.serverUrl
            + '/api/cricket/ipl2018/stats/' + index);
    }

     // fetch the ipl schedule
     public fetchIPLSchedule(): Observable<any> {
        return this._http.get(this._serverConfigService.serverUrl
            + '/api/cricket/ipl2018/schedule/');
    }


}




