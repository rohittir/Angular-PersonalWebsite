

/**
 * class: SearchService
 * Directory: src/app/services
 * @author Rohit Tirmanwar
 */


import { Injectable } from "@angular/core";
import { Http, Headers, Response, Jsonp, RequestOptions } from '@angular/http';


@Injectable()
export class ServerConfigService {

    //
    // PROPERTIES
    //
    public serverHost = null;
    public serverPort = null;
    public serverUrl = null;

    constructor(public _http: Http) {
        this.readServerConfig('assets/server-config.json');
    }

    //
    // OPERATIONS
    //

    private readServerConfig(fileName: string) {
         this._http.get(fileName).toPromise().then(res => {
             let jsonData = res.json();
             this.serverHost = jsonData.serverConfig.host;
             this.serverPort = jsonData.serverConfig.port;
             this.serverUrl = 'http://' + this.serverHost + ':' + this.serverPort;
         })
         .catch(err => {
             console.error(err.json());
         })
    }

}