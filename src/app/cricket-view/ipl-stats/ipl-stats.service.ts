/**
 * class: LiveScoreService
 * Directory: src/app/cricket-view
 * @author Rohit Tirmanwar
 */


import { Injectable } from "@angular/core";
import { Http, ResponseContentType, Response, RequestOptionsArgs } from "@angular/http";
import { ServerConfigService } from "../../services/server-config.service";


@Injectable()
export class IPLStatsService {

    constructor(private _http: Http, private _serverConfigService: ServerConfigService) {
    }

    //
    // OPERATIONS
    //

    // fetch the ipl stats data
    public fetchIPLStats(index): Promise<Response> {
        return this._http.get(this._serverConfigService.serverUrl
            + '/api/cricket/ipl2018/stats/' + index).toPromise();
    }


}




