/**
 * class: LiveScoreService
 * Directory: src/app/cricket-view
 * @author Rohit Tirmanwar
 */


import { Injectable } from "@angular/core";
import { Http, ResponseContentType } from "@angular/http";
import { RequestOptionsArgs } from "@angular/http/src/interfaces";
import { ServerConfigService } from "../services/server-config.service";


@Injectable()
export class LiveScoreService {

    public matchesList = null;
    public commentaryList = null;

    constructor(private _http: Http, private _serverConfigService: ServerConfigService) {
    }

    //
    // OPERATIONS
    //

    public fetchLiveMatches() {

        this._http.get(this._serverConfigService.serverUrl + '/cricket/livematches').toPromise().then(res => {
            this.setMatchList(null, res.json());
        })
        .catch(err => console.error(err));
    }

    // Set information based on the fetched results
    private setMatchList(err, result) {
        if (!err && result) {
            this.matchesList = result.mchdata.match;
            this.commentaryList = [];
            let indexToRemove = [];

            for (let i = 0; i < this.matchesList.length; i++) {

                if (this.matchesList[i].$.datapath) {
                    indexToRemove.push(i);
                    let matchUrl = this.matchesList[i].$.datapath;
                    this._http.get(this._serverConfigService.serverUrl + '/cricket/livematches/commentary?matchUrl=' + matchUrl).toPromise().then(res => {
                        this.setCommentary(null, res.json());
                    })
                    .catch(err => console.error(err));
                }
            }

            // remove others
            for (let i = 0; i < indexToRemove.length; i++) {
                this.matchesList.splice(indexToRemove[i] - i, 1);
            }
            console.log(this.matchesList);
        }
    }

    // set commentary list
    private setCommentary(err, result) {
        this.commentaryList.push(result.mchDetails.match[0]);
        console.log(this.commentaryList);

    }

    // fetch the scorecard
    public fetchLiveScorecard(url: string, callback) {
        this._http.get(this._serverConfigService.serverUrl + '/cricket/livematches/scorecard?matchUrl=' + url).toPromise().then(res => {
            callback(null, res.json());
        })
        .catch(err => {
            console.error(err);
            callback(err, null);
        });
    }

}

