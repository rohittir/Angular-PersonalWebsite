

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


    //
    // DATA
    //
    userProfileData = null;

    constructor(private _http: Http, private _serverConfigService: ServerConfigService) {
    }

    //
    // OPERATIONS
    //

    public readUserProfileDataFromJson(): Promise<Response> {
        let fileName = 'assets/data/user-profile.json';
        return this._http.get(fileName).toPromise();
    }

    public readUserTimelineFromJson(): Promise<Response> {
        let fileName = 'assets/data/user-timeline.json';
        return this._http.get(fileName).toPromise();
    }

    public fetchUserData(): Promise<Response> {
        return this._http.get(this._serverConfigService.serverUrl + '/api/profile/').toPromise();
    }

    public fetchUserTimelineData(): Promise<Response> {
        return this._http.get(this._serverConfigService.serverUrl + '/api/profile/timeline/').toPromise();
    }

    public fetchCurrentInspiration(): Promise<Response> {
        return this._http.get(this._serverConfigService.serverUrl + '/api/inspiration/').toPromise();
    }


    //
    // GETTERS and SETTERS
    //
    setJsonData(data) {
        this.userProfileData = data;
    }
    getJsonData() {
        return this.userProfileData;
    }


}