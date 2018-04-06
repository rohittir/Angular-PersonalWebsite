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
            + '/cricket/livematches').toPromise();
    }

    // fetch the scorecard
    public fetchMatchScorecard(matchUrl: string): Promise<Response> {
        return this._http.get(this._serverConfigService.serverUrl
            + '/cricket/livematches/scorecard?matchUrl=' + matchUrl).toPromise();
    }

    // fetch the commentary
    public fetchMatchCommentary(matchUrl: string): Promise<Response> {
        return this._http.get(this._serverConfigService.serverUrl
            + '/cricket/livematches/commentary?matchUrl=' + matchUrl).toPromise();
    }

}

