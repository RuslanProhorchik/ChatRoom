import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IDirectConversationDisplay, IUserDetail, DirectConversationDisplay } from 'src/app/models';
import { DirectConversationService } from 'src/app/service/direct-conversation.service';
import { AuthService } from 'src/app/service/auth.service';
import { UserDetailService } from 'src/app/service/user-detail.service';
import { MessageService } from 'src/app/service/message.service';

@Component({
  selector: 'app-direct-conversation',
  templateUrl: './direct-conversation.component.html',
  styleUrls: ['./direct-conversation.component.css']
})
export class DirectConversationComponent implements OnInit {
  user: firebase.User;
  conversations: IDirectConversationDisplay[];
  users: IUserDetail[];

  @Output() activeChannelUid = new EventEmitter<string>();
  _activeChannelUid: string;

  constructor(private auth: AuthService
    , private dcs: DirectConversationService
    , private uds: UserDetailService) { 

      this.auth.getUserState().subscribe(user => {
        this.user = user;
                 
        this.dcs.getDisplayedConversation(user.uid).subscribe(conversations => {       
           this.conversations = conversations;           
              
          if(this.conversations != null && this.conversations.length > 0){            

            const uids = this.conversations.map(item => item.user_uid);

            this.uds.getUsersDetail(uids).subscribe(details => {
              this.users = details;
              //console.log(this.users);
            });             
          }
        });        
      });              
  }

  ngOnInit() {
    this._activeChannelUid = null;
  }

  public getDisplayConversationName(user_uid: string): string {
    if(this.users != null) {
      const user = this.users.find(currentValue => currentValue.uid == user_uid);      
      return (user === undefined)? user_uid : user.displayName;
    }
    else
      return user_uid;    
  }

  public getDisplayConversationStatus(user_uid: string): string {
    return 'N/A';
  }

  public onChannelChanged(event, conversation: IDirectConversationDisplay){
    this._activeChannelUid = conversation.messages_uid;
    this.activeChannelUid.emit(conversation.messages_uid);
  }

  public isActiveConversation(conversation: IDirectConversationDisplay) {
    return (this._activeChannelUid === conversation.messages_uid)? true : false;
  }

  public onAddDirectConversation(event) {    
    let ownerUID: string = this.user.uid;        
    let partnerUID: string = 's9QKAQKp3SWpZsU308Dfx6LwL4F3';
                 
    this.dcs.createConversation(ownerUID, partnerUID).subscribe((data) => {
      
      let newConversationDisplay: IDirectConversationDisplay = new DirectConversationDisplay();
      newConversationDisplay.user_uid = partnerUID;
      newConversationDisplay.messages_uid = data;
               
        this.onChannelChanged(event, newConversationDisplay);                
      },
      error => {
        console.log("New conversation was not created");
      }      
    );
  }
}
