import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router"
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import qs from 'qs'

import {NotificationsComponent} from './components/index'
import {OauthUserService} from './services/oauth-user.service'
import {OauthUser} from './models/oauth-user'
import { NotificationsService } from './services/notifications.service';
import {ChatComponent} from './components/chat/chat.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [OauthUserService]

})
export class AppComponent implements OnInit {

  SideNav: boolean = false;
  visibleChat: boolean = JSON.parse(localStorage.getItem('visibleChat')) ;

  isAuthenticated:boolean = false;
  auth: OauthUser;

  notificationNumber: number;
  requestNumber: number;
  
  constructor(
      private _bottomSheet: MatBottomSheet,
      public notificationService: NotificationsService,
      private oauthUserService: OauthUserService,
      private router: Router) {
    this.auth = new OauthUser
  }
  

  ngOnInit(): void {       
    localStorage.setItem('isAuthenticated', JSON.stringify(this.isAuthenticated ) )

    if (qs.parse(location.search, { ignoreQueryPrefix: true }).sceibaId) {
      localStorage.setItem('sceibaId', qs.parse(location.search, { ignoreQueryPrefix: true }).sceibaId);
      localStorage.setItem('token', qs.parse(location.search, { ignoreQueryPrefix: true }).token);
    }        

      var uri = window.location.toString();
      if (uri.indexOf("?") > 0) {
          var clean_uri = uri.substring(0, uri.indexOf("?"));
          window.history.replaceState({}, document.title, clean_uri);
      }
    //this.auth = JSON.parse(localStorage.getItem('auth'))
    this.oauthUserService.getOauthUser()
      .subscribe( res =>{ 
        if(res != undefined && res != null) {      
        this.auth = res as OauthUser;
        this.isAuthenticated = true;
        localStorage.setItem('auth', JSON.stringify(res) )
        localStorage.setItem('isAuthenticated', JSON.stringify(this.isAuthenticated) )
      }}) 

      this.getNnotificationNumber();
      this.getRequestNumber();
  }

  openBottomSheet(): void {
    this._bottomSheet.open(ChatComponent);
  }
  
  logout():void{
    this.isAuthenticated = false;
    localStorage.clear();
    localStorage.setItem('isAuthenticated', JSON.stringify(this.isAuthenticated) )
    this.auth = new OauthUser
    this.router.navigate(['/'])
  }

  openSideNav(): Boolean{
    return this.SideNav = !this.SideNav
  }

  getNnotificationNumber(){
    this.notificationService.notificationNumber()
    .subscribe( res => this.notificationNumber = res as number)
  }

  getRequestNumber(){
    this.notificationService.requestNumber()
    .subscribe( res => this.requestNumber = res as number)
  }

}