import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable()
export class ChatService {

  constructor(private http: HttpClient) { }

  getChatByRoom(room) {
    return new Promise((resolve, reject) => {
      return this.http.get('/api/message/' + room)
       /*  .map(res => res.json()) */
        .subscribe(res => {
          resolve(res);
          console.log(res);
          
        }, (err) => {
          reject(err);
        });
    });
  }

  saveChat(data) {
    return new Promise((resolve, reject) => {
        this.http.post('/api/message', data)
          /* .map(res => res.json()) */
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }

}
