import { Component, OnInit, OnChanges, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import * as io from "socket.io-client";
import { ActivatedRoute } from '@angular/router';

import { OauthUser } from 'src/app/models/oauth-user';
import { DocumentVersionService } from 'src/app/services/documents.service';
import { DocumentVersion, Documents } from '../../models/documents';
import { Chat } from 'src/app/models/chat';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnChanges,
AfterViewChecked {

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  chats: any;
  joinned: boolean = false;
  sender: OauthUser = JSON.parse(localStorage.getItem('auth'));
  content: string = "";
  socket = io('https://192.168.1.103:4000');
  messagesList: Chat;

  constructor(private chatService: ChatService,
              private versionService: DocumentVersionService,
              private route: ActivatedRoute) { }

  ngOnInit() { 
    var user = JSON.parse(localStorage.getItem('auth'))    
      if(user && this.route.snapshot.params.id) {
        this.getChat();
        this.scrollToBottom();
      }   
      /* this.socket.on('newChatMessage', function (data) {
      }.bind(this)); */
  }

  ngOnChanges(){
    this.getChat();
    this.scrollToBottom();
  }

  getChat() {
    this.versionService.getDocumentVersionById(this.route.snapshot.params.id)
    .subscribe( res => {
      this.versionService.selectedVersion = res as DocumentVersion
      this.chatService.getMessages(this.versionService.selectedVersion.document._id)
      .subscribe( res => {
          this.messagesList = res as Chat
      })   
    })
  }

  sendMessage() {
    this.chatService.addMessage(this.content, this.versionService.selectedVersion.document._id)
    .subscribe( res => {
      this.socket.emit('newChatMessage', res);
    })
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }

}
