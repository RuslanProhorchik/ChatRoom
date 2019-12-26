import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Message } from 'src/app/models/message';
import { MessageService } from 'src/app/service/message.service';

@Component({
  selector: 'app-message-create',
  templateUrl: './message-create.component.html',
  styleUrls: ['./message-create.component.css']
})
export class MessageCreateComponent implements OnInit {

  private _messagesUid: string;

  @Input('messages_uid') set messagesUid(messagesUid: string) {
    this._messagesUid = messagesUid;

    if(this.messageService.isMessagesStorageOpened()) {
      this.messageService.closeMessagesStorage();
    }

    this.messageService.openMessagesStorage(messagesUid);
  }

  get messagesUid(): string { return this._messagesUid; }

  message: Message = {    
    text: ''    
  };

  constructor(private messageService: MessageService) {
   }

  public ngOnInit() {
  }

  public onSubmit() {
    if(this.message.text != '') {
      this.message.createdAt = new Date(Date.now());

      this.addMessage(this.message);
      this.clearFields();      
    }
  }

  private clearFields(){
    this.message.text = '';
  }

  private addMessage(message: Message) {    
    if(this.messagesUid != null) {    
      if(!this.messageService.isMessagesStorageOpened()) {    
        this.messageService.openMessagesStorage(this.messagesUid);          
      }      
      
      this.messageService.addMessage(message);      
    }
  }
}
