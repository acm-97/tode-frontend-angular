import { Component, OnInit, OnChanges } from '@angular/core';
import { NotificationsService } from '../../services/notifications.service';
import { Requests } from 'src/app/models/notifications';
import { MessageSnackBarService } from 'src/app/services/message-snack-bar.service';
import { DocumentsService } from '../../services/documents.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit, OnChanges {
  requests = new Array();
  
  constructor( public notificationService: NotificationsService,
               private success: MessageSnackBarService,
               private documents: DocumentsService) { }

  ngOnInit(): void {
    this.geNotifications();
  }

  ngOnChanges() {
    this.geNotifications();
  }

  async geNotifications(){
    await this.notificationService.getNotifications()
    .subscribe(res => {      
      console.log(res);
      
      this.requests = res.requests as Requests[]
    })
  }

  updateNotificationForPermisions( _id, name) {
    this.notificationService.updateNotificationForPermisions( _id)
    .subscribe( res =>{
      this.success.openSnackBar(name, 'OK');
      this.geNotifications();
      this.documents.getDocuments();
    })
  }

  deleteNotification( _id ) {
    this.notificationService.deleteNotification( _id )
    .subscribe( res =>{
      this.geNotifications();
      this.success.openSnackBar('Solicitud eliminada', 'OK');
    })
  }
}
