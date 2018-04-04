








/**
 * class: SearchService
 * Directory: src/app/services
 * @author Rohit Tirmanwar
 */


import { Injectable } from "@angular/core";
import { Promise } from "q";
import { Http, Headers, Response, Jsonp, RequestOptions } from '@angular/http';


@Injectable()
export class JSONDataService {


    private jsonData = null;

    constructor(private _http: Http) {
        this.readDataFromJsonFile('assets/data/user-profile.json');
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

    public getJsonData() {
        return this.jsonData;
    }



}