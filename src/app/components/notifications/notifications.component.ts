import { Component, OnInit, OnChanges } from '@angular/core';
import { NotificationsService } from '../../services/notifications.service';
import { Notifications } from 'src/app/models/notifications';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit, OnChanges {
  notifications = new Array();
  
  constructor( public notificationService: NotificationsService) { }

  ngOnInit(): void {
    this.geNotifications();
  }

  ngOnChanges() {
    this.geNotifications();
  }

  async geNotifications(){
    await this.notificationService.getNotifications()
    .subscribe(res => {      
      this.notifications = res.notifications as Notifications[]
    })
  }

  updateNotificationStatus( document, version ) {
    this.notificationService.updateNotificationDocVersion( document, version )
    .subscribe()  
    this.geNotifications();  
  }

  updateAllStatus() {
    this.notificationService.updateAllStatus()
    .subscribe()
    this.geNotifications();
  }
}
