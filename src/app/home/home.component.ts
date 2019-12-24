import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {    
  activeOwnerUid: string;
  activeMessagesUid: string;

  constructor() { }

  ngOnInit() {
    // this.activeOwnerUid='activeOwnerUid';
    // this.activeMessagesUid = 'activeMessagesUid';    
  }

  public onMessageChannelChanged(messages_uid: string){
    this.activeMessagesUid = messages_uid;
  }
}
