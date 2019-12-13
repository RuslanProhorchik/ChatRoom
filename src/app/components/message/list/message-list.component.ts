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
  editState: boolean;
  messageToEdit: Message;

  constructor(private messagesService: MessageService) { }

  ngOnInit() {
    this.messagesService.getMessages().subscribe(messages => {
      this.messages = messages;
    });

    this.editState = false;
  }

  public deleteMessage(event, message: Message){
    this.clearEditState();
    this.messagesService.deleteMessage(message);
  }

  public setEditState(message: Message){
    this.editState = true;
    this.messageToEdit = message;
  }

  public updateMessage(message: Message){
    this.messagesService.updateMessage(message);
    this.clearEditState();
  }

  public clearEditState() {
    this.editState = false;
    this.messageToEdit = null;
  }
  
}
