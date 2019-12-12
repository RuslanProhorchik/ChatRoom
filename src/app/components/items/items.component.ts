import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../service/message.service';
import { Message } from '../../models/message';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  messages: Message[];
  constructor(public messagesService: MessageService) { 

  }

  ngOnInit() {
    this.messagesService.getMessages().subscribe(messages => {
      this.messages = messages;
    });
  }

}
