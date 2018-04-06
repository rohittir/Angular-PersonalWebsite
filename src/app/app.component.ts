

/**
 * class: AppComponent
 * Directory: src/app/
 * @author Rohit Tirmanwar
 */


import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ServerConfigService } from './services/server-config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  constructor(private _router: Router, public _serverConfigService: ServerConfigService) {

  }

  ngOnInit() {

    this._router.events.subscribe((evt) => {
        if (!(evt instanceof NavigationEnd)) {
            return;
        }
        window.scrollTo(0, 0)
    });

  }




}
