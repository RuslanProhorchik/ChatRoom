import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { MessageService } from '../../../service/message.service';
import { Message } from '../../../models/message';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/service/auth.service';
import { IUserDetail } from 'src/app/models';
import { UserDetailService } from 'src/app/service/user-detail.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit, OnDestroy {
    
  ownerUid: string;
  users: IUserDetail[];
  
  private unsubscribe: Subject<void> = new Subject();

  constructor(
    private ms: MessageService,
    private auth: AuthService,
    private uds: UserDetailService) {     
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
      
      const users_uids = this.messages.map(item => item.ownerUid).filter((v, i, a) => a.indexOf(v) === i);
      console.log('Loaded owner uids: ' + users_uids);

      if((users_uids != null) && (users_uids.length > 0)) {
        this.uds.getUsersDetail(users_uids)
        .pipe(takeUntil(this.unsubscribe))
        .subscribe(details => {
          this.users = details;

          console.log(this.users);
        });
      }
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

    this.auth.getUserState()
    .subscribe(user => {
      this.ownerUid = user.uid;
      //console.log('Owner Uid' + this.ownerUid);
    });    
  }

  ngOnDestroy(): void {
    this.clearSubscriptions();
  }

  public deleteMessage(event,message: Message){
    this.clearEditState();
    this.ms.deleteMessage(this._messagesUid, message);
  }

  public setEditState(message: Message){
    this.editState = true;
    this.messageToEdit = message;
  }

  public updateMessage(message: Message){
    this.ms.updateMessage(this._messagesUid, message);
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

  isDisplayMessageAsOwner(message: Message): boolean {    
    return (this.ownerUid === message.ownerUid)? true: false;
  }

  isNeedDisplayUserName(message: Message) {
    return (this.ownerUid === message.ownerUid)? false : true;
  }

  getDisplayedUserName(message: Message){
    if(this.users.length > 0) {
      return this.users.find(value => value.uid === message.ownerUid).displayName;
    } else {
      return message.ownerUid;
    }    
  }
}
