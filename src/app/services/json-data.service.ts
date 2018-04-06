

/**
 * class: SearchService
 * Directory: src/app/services
 * @author Rohit Tirmanwar
 */


import { Injectable } from "@angular/core";
import { Http, Headers, Response, Jsonp, RequestOptions } from '@angular/http';
import { ServerConfigService } from "./server-config.service";


@Injectable()
export class JSONDataService {


    private jsonData = null;

    constructor(private _http: Http, private _serverConfigService: ServerConfigService) {
        this.fetchUserData();
    }

    //
    // OPERATIONS
    //

    private readDataFromJsonFile(fileName: string) {
         this._http.get(fileName).toPromise().then(res => {
             this.jsonData = res.json();
         })
         .catch(err => {
             console.error(err.json());
         })
    }

    private fetchUserData() {
        this._http.get(this._serverConfigService.serverUrl + '/api/profile').toPromise().then(res => {
            this.jsonData = res.json();
        })
        .catch(err => {
            console.error(err);

            // when server is not available
            this.readDataFromJsonFile('assets/data/user-profile.json');
        });
    }

    public getJsonData() {
        return this.jsonData;
    }



}