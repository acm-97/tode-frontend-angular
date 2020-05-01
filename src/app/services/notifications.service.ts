import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

import {tokenConfig} from '../services/oauth-user.service';
import { Notifications, Requests } from '../models/notifications';

interface NotificationsMessages{
  notifications: Notifications[];
  requests: Requests[];
}

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  selectedNotification: Notifications;
  notifications: Notifications[];

  selectedRequest: Requests;
  requests: Requests[];

  constructor( private http: HttpClient ) { 
    this.selectedNotification = new Notifications();
    this.selectedRequest = new Requests();
  }

  getNotifications() {
    return this.http.get<NotificationsMessages>('/api/notifications', tokenConfig())
  }

  updateNotificationForPermisions( _id ) {
    return this.http.get(`/api/updateNotificationForPermisions/${ _id }`, tokenConfig())
  }

  updateNotificationDocVersion( document, version ) {
    return this.http.get(`/api/updateNotificationDocVersion?document=${document}&version=${version}`, tokenConfig())
  }

  updateAllStatus() {
    return this.http.get(`/api/updateAllStatus`, tokenConfig())
  }

  deleteNotification( _id ) {
    return this.http.delete(`/api/delete_notification/${ _id }`, tokenConfig())
  }

  notificationNumber() {
    return this.http.get(`/api/notificationNumber`, tokenConfig())
  }

  requestNumber() {
    return this.http.get(`/api/requestNumber`, tokenConfig())
  }
}
