import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { OauthUser } from '../models/oauth-user';

export const tokenConfig = () => {
  //headers
  const config = {
      headers: {
          "Content-type": "aplication/json"
      }
  }

  //if token add to headers
  if (localStorage.getItem('token')) { 
      config.headers['Autorizacion'] = localStorage.getItem('token'); 
      config.headers['sceibaId'] = localStorage.getItem('sceibaId');
  }

  return config
}

@Injectable({
  providedIn: 'root'
})
export class OauthUserService {

  selectedUser: OauthUser;
  users: OauthUser[];

  constructor( private http: HttpClient ) { }

  getOauthUser(){
    return this.http.get(`/api/user/${localStorage.getItem('sceibaId')}`, tokenConfig());
  }

  getUsersToPermission(value/* , document */) {
    return this.http.get(`/api/user_topermision?value=${value}`, tokenConfig());
   
    
  }
}
