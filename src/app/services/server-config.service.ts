

/**
 * class: SearchService
 * Directory: src/app/services
 * @author Rohit Tirmanwar
 */


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';


@Injectable()
export class ServerConfigService {

    //
    // PROPERTIES
    //
    public serverHost = null;
    public serverPort = null;
    public serverUrl = null;

    constructor(public _http: HttpClient) {
        this.readServerConfig('assets/server-config.json');
    }

    //
    // OPERATIONS
    //

    private readServerConfig(fileName: string) {
        this._http.get(fileName).
        pipe(
            catchError((err: any) => {
                console.error(err);
                return err;
            })
        ).subscribe((res: any) => {
             const jsonData = res;
             this.serverHost = jsonData.serverConfig.host;
             this.serverPort = jsonData.serverConfig.port;
             this.serverUrl = 'http://' + this.serverHost + ':' + this.serverPort;

             if (jsonData.serverConfig.customURL && jsonData.serverConfig.customURL !== '') {
                this.serverUrl = jsonData.serverConfig.customURL;
             }

             if (jsonData.serverConfig.prod === true) {
                this.serverUrl = '';
             }
         });
    }

}

