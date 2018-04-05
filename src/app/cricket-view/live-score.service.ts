/**
 * class: LiveScoreService
 * Directory: src/app/cricket-view
 * @author Rohit Tirmanwar
 */


import { Injectable } from "@angular/core";
import { Http, ResponseContentType } from "@angular/http";
import { RequestOptionsArgs } from "@angular/http/src/interfaces";


var parseString = require('xml2js').parseString;


@Injectable()
export class LiveScoreService {

    liveScoreURL = 'http://synd.cricbuzz.com/j2me/1.0/livematches.xml';

    public matchesList = null;
    public commentaryList = null;

    constructor(private _http: Http) {
        setTimeout(this.fetchLiveMatches.bind(this), 2000);
    }

    //
    // OPERATIONS
    //

    fetchLiveMatches() {
        this._http.get(this.liveScoreURL, { responseType: ResponseContentType.Text }).toPromise().then(res => {
            parseString(res.text(), this.setMatchList.bind(this));
        })
        .catch(err => console.error(err));
    }

    setMatchList(err, result) {
        if (!err && result) {
            this.matchesList = result.mchdata.match;
            this.commentaryList = [];
            let indexToRemove = [];

            for (let i = 0; i < this.matchesList.length; i++) {

                if (this.matchesList[i].$.datapath) {
                    indexToRemove.push(i);
                    let url = this.matchesList[i].$.datapath + 'commentary.xml';
                    this._http.get(url, { responseType: ResponseContentType.Text }).toPromise().then(res => {
                        parseString(res.text(), this.setCommentary.bind(this));
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

    setCommentary(err, result) {
        this.commentaryList.push(result.mchDetails.match[0]);
        console.log(this.commentaryList);

    }

}

