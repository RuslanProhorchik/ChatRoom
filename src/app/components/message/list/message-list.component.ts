import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { MessageService } from '../../../service/message.service';
import { Message } from '../../../models/message';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit, OnDestroy {
    
  private unsubscribe: Subject<void> = new Subject();

  constructor(private ms: MessageService) {     
  }

  private _messagesUid: string;  

  @Input('messages_uid') set messagesUid(messagesUid: string) {
    this._messagesUid = messagesUid;

    if(this.ms.isMessagesStorageOpened()) {
      this.ms.closeMessagesStorage();
      this.clearSubscriptions();    
    }

    this.ms.openMessagesStorage(messagesUid);
    
    this.ms.getMessages(messagesUid)
    .pipe(takeUntil(this.unsubscribe))
    .subscribe((messages) => {      
      this.messages = messages;      
    },
    (error) => console.error(error),
    () => console.log('[takeUntil] complete')    
    );    
  }

  get messagesUid(): string { return this._messagesUid; }

  messages: Message[];
  editState: boolean;
  messageToEdit: Message;

  ngOnInit() {
    this.editState = false;
  }

  ngOnDestroy(): void {
    this.clearSubscriptions();
  }

  public deleteMessage(event, message: Message){
    this.clearEditState();
    this.ms.deleteMessage(message);
  }

  public setEditState(message: Message){
    this.editState = true;
    this.messageToEdit = message;
  }

  public updateMessage(message: Message){
    this.ms.updateMessage(message);
    this.clearEditState();
  }

  public clearEditState() {
    this.editState = false;
    this.messageToEdit = null;
  }

  public clearSubscriptions() {    
    this.unsubscribe.next();
    this.unsubscribe.complete();
    console.log('unsubscribe executed');
  }  
}
