/**
 * class: LiveScoreService
 * Directory: src/app/cricket-view
 * @author Rohit Tirmanwar
 */


import { Injectable } from "@angular/core";
import { Http, ResponseContentType, Response, RequestOptionsArgs } from "@angular/http";
import { ServerConfigService } from "../services/server-config.service";


@Injectable()
export class LiveScoreService {

    constructor(private _http: Http, private _serverConfigService: ServerConfigService) {
    }

    //
    // OPERATIONS
    //

    public fetchLiveMatches(): Promise<Response> {
        return this._http.get(this._serverConfigService.serverUrl
            + '/api/cricket/livecricscore/csLiveMatches/').toPromise();
    }

    public fetchLiveScore(matchId: string): Promise<Response> {
        return this._http.get(this._serverConfigService.serverUrl
            + '/api/cricket/livecricscore/csLiveScore/?matchId=' + matchId).toPromise();
    }

    public fetchCurrentMatches(): Promise<Response> {
        return this._http.get(this._serverConfigService.serverUrl
            + '/api/cricket/cbLiveMatches/').toPromise();
    }

    // fetch the scorecard
    public fetchMatchScorecard(matchUrl: string): Promise<Response> {
        return this._http.get(this._serverConfigService.serverUrl
            + '/api/cricket/cbScorecard/?matchUrl=' + matchUrl).toPromise();
    }

    // fetch the commentary
    public fetchMatchCommentary(matchUrl: string): Promise<Response> {
        return this._http.get(this._serverConfigService.serverUrl
            + '/api/cricket/cbCommentary/?matchUrl=' + matchUrl).toPromise();
    }

    // fetch the news headlines
    public fetchCricketHeadlines(): Promise<Response> {
        return this._http.get(this._serverConfigService.serverUrl
            + '/api/cricket/cricnews/top-headlines/').toPromise();
    }

     // fetch the news headlines
    public fetchCricketNews(): Promise<Response> {
        return this._http.get(this._serverConfigService.serverUrl
            + '/api/cricket/cricnews/everything/').toPromise();
    }

}

