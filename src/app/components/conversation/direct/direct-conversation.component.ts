import { Component, OnInit } from '@angular/core';
import { IDirectConversationDisplay, UserDetail } from 'src/app/models';
import { DirectConversationService } from 'src/app/service/direct-conversation.service';
import { DirectConversationDisplay } from 'src/app/models/DirectConversationDisplay';
import { AuthService } from 'src/app/service/auth.service';
import { UserDetailService } from 'src/app/service/user-detail.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-direct-conversation',
  templateUrl: './direct-conversation.component.html',
  styleUrls: ['./direct-conversation.component.css']
})
export class DirectConversationComponent implements OnInit {
  user: firebase.User;
  conversations: IDirectConversationDisplay[];
  //users: UserDetail[];
  
  constructor(private auth: AuthService
    , private dcs: DirectConversationService
    , private uds: UserDetailService) { 

      this.auth.getUserState()      
      .subscribe(user => {
        this.user = user;
                 
        this.dcs.getDisplayedConversation(user.uid).subscribe(conversations => {       
           this.conversations = conversations;
              
          this.conversations.forEach(element => {
            element.user_name = this.uds.getUserInfo(element.user_uid).displayName;                 
            console.log(element.user_name);
          //       this.uds.getUserInfo(element.user_uid);
             });
          });
        });              
  }

  ngOnInit() {
  }
}
