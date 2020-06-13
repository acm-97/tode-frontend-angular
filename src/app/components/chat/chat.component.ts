import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import * as io from "socket.io-client";
import { DocumentsService, DocumentVersionService } from '../../services/documents.service';
import { DocumentVersion, Documents } from '../../models/documents';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewChecked {

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  authName = JSON.parse(localStorage.getItem("auth"));
  chats:any = new Array();
  rooms:any = new Array();
  disabled: boolean = false;
  joinned: boolean = false;
  newUser = { nickname: JSON.parse(localStorage.getItem("auth")).name, room: '' };
  msgData = { room: '', nickname: '', message: '' };
  socket = io('https://192.168.1.103:4000');

  constructor(
    private chatService: ChatService,
    public versionService: DocumentVersionService,
    public documentService: DocumentsService) {}

  ngOnInit() {
    this.getDocuments()    
    var user = JSON.parse(localStorage.getItem("user"));
    if(user!==null) {      
      this.getChatByRoom(user.room);
      this.msgData = { room: user.room, nickname: user.nickname, message: '' }
      this.joinned = true;
      this.scrollToBottom();
    }
    this.socket.on('new-message', function (data) {
      if(data.message.room === JSON.parse(localStorage.getItem("user")).room) {        
        this.chats.push(data.message);
        this.msgData = { room: user.room, nickname: user.nickname, message: '' }
        this.scrollToBottom();
      }
    }.bind(this));
  }

  getDocuments() {
    var doc
    var documents = new Array();

  this.documentService.getDocuments()
    .subscribe( res => {        
      for (var i = 0; i < res.docs.length; i++) {
        doc = res.docs[i] as Documents
          documents.push(doc)  
          this.documentService.documents = documents 
      }
    })  
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  toogleDisable() {
    this.disabled = true
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }

  getChatByRoom(room) {
    this.chatService.getChatByRoom(room).then((res) => {
      this.chats = res;
    }, (err) => {
      console.log(err);
    });
  }

  joinRoom() {
    var date = new Date();
    localStorage.setItem("user", JSON.stringify(this.newUser));
    this.getChatByRoom(this.newUser.room);
    this.msgData = { room: this.newUser.room, nickname: this.newUser.nickname, message: '' };
    this.joinned = true;
    this.socket.emit('save-message', { room: this.newUser.room, nickname: this.newUser.nickname, message: 'Join this room', updated_at: date });
  }

  sendMessage() {
    this.chatService.saveChat(this.msgData).then((result) => {
      this.socket.emit('save-message', result);
    }, (err) => {
      console.log(err);
    });
  }

  logout() {
    var date = new Date();
    var user = JSON.parse(localStorage.getItem("user"));
    this.socket.emit('save-message', { room: user.room, nickname: user.nickname, message: 'Left this room', updated_at: date });
    localStorage.removeItem("user");
    this.joinned = false;
    //this.disabled = false;
  }

}
