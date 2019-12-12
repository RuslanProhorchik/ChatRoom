import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../../service/message.service';
import { Message } from '../../../models/message';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  
  messages: Message[];

  constructor(private messagesService: MessageService) { }

  ngOnInit() {
    this.messagesService.getMessages().subscribe(messages => {
      this.messages = messages;
    });
  }

}
