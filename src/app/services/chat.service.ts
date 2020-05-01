import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { OauthUser } from '../models/oauth-user';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  sender: OauthUser = JSON.parse(localStorage.getItem('auth'));
  constructor( private http: HttpClient ) { }

  getMessages( _id ) {
    return this.http.get(`/message/${_id}`)
  }

  addMessage(message, document) {
    let reqBody = {
      sender: this.sender.name,
      content: message,
      document: document
  }
    return this.http.post("/message",{
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(reqBody)
    })
  }
}
