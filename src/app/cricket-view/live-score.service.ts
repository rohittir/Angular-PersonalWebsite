/**
 * class: LiveScoreService
 * Directory: src/app/cricket-view
 * @author Rohit Tirmanwar
 */


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ServerConfigService } from '../services/server-config.service';


@Injectable()
export class LiveScoreService {

    constructor(private _http: HttpClient, private _serverConfigService: ServerConfigService) {
    }

    //
    // OPERATIONS
    //

    public fetchLiveMatches(): Observable<any> {
        return this._http.get(this._serverConfigService.serverUrl
            + '/api/cricket/livecricscore/csLiveMatches/');
    }

    public fetchLiveScore(matchId: string): Observable<any> {
        return this._http.get(this._serverConfigService.serverUrl
            + '/api/cricket/livecricscore/csLiveScore/?matchId=' + matchId);
    }

    public fetchCurrentMatches(): Observable<any> {
        return this._http.get(this._serverConfigService.serverUrl
            + '/api/cricket/cbLiveMatches/');
    }

    // fetch the scorecard
    public fetchMatchScorecard(matchUrl: string): Observable<any> {
        return this._http.get(this._serverConfigService.serverUrl
            + '/api/cricket/cbScorecard/?matchUrl=' + matchUrl);
    }

    // fetch the commentary
    public fetchMatchCommentary(matchUrl: string): Observable<any> {
        return this._http.get(this._serverConfigService.serverUrl
            + '/api/cricket/cbCommentary/?matchUrl=' + matchUrl);
    }

    // fetch the news headlines
    public fetchCricketHeadlines(): Observable<any> {
        return this._http.get(this._serverConfigService.serverUrl
            + '/api/cricket/cricnews/top-headlines/');
    }

     // fetch the news headlines
    public fetchCricketNews(): Observable<any> {
        return this._http.get(this._serverConfigService.serverUrl
            + '/api/cricket/cricnews/everything/');
    }

}

