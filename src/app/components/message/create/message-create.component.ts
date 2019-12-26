import { Component, OnInit, Input } from '@angular/core';
import { Message } from 'src/app/models/message';
import { MessageService } from 'src/app/service/message.service';
import { AuthService } from 'src/app/service/auth.service';
import { IUserDetail } from 'src/app/models';
import { UserDetailService } from 'src/app/service/user-detail.service';

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

  activeUser: firebase.User;  
  activeUserDetail: IUserDetail;

  message: Message = {    
    text: ''    
  };

  constructor(
    private messageService: MessageService,
    private auth: AuthService, 
    private uds: UserDetailService) {
   }

  public ngOnInit() {
    this.auth.getUserState()
    .subscribe(user => {
      this.activeUser = user;

      console.log(user.uid);
      this.uds.getUserDetail(user.uid).subscribe(detail => {
        this.activeUserDetail = detail;        
        //console.log(this.activeUserDetail);
      });            
    });    
  }

  public onSubmit() {
    if(this.message.text != '') {
      this.message.createdAt = new Date(Date.now());
      this.message.ownerUid = this.activeUserDetail.uid;

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
