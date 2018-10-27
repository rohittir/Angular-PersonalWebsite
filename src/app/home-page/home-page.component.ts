
/**
 * class: HomePageComponent
 * Directory: src/app/home-page
 * @author Rohit Tirmanwar
 */


import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { JSONDataService } from '../services/json-data.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {


    //
    // PROPERTIES
    //
    userProfile = null;
    inspirationData = null;

    //
    // LIFECYCLE
    //
    constructor(private _jsonDataService: JSONDataService) {

    }


    ngOnInit() {
        this.initData();
    }


    //
    // OPERATIONS
    //
    initData() {

        // USER PRofile Data
        this._jsonDataService.fetchUserData()
            .pipe(
                catchError((err: any) => {
                    console.log(err);

                    // retry locally when server is not available
                    this._jsonDataService.readUserProfileDataFromJson()
                        .pipe(
                            catchError((err: any) => {
                                console.error(err);
                                return err;
                            })
                        ).subscribe((res1: any) => {
                            this.userProfile = res1.userData.profile;
                            this._jsonDataService.setJsonData(res1);
                        });
                    return err;
                })
            ).subscribe((res: any) => {
                this.userProfile = res.userData.profile;
                this._jsonDataService.setJsonData(res);
            });

        // INspirations data
        this._jsonDataService.fetchCurrentInspiration()
            .pipe(
                catchError((err: any) => {
                    console.error(err);
                    return err;
                })
            ).subscribe((res: any) => {
                this.inspirationData = res;
            });
    }


};



