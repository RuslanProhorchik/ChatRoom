import { Component, OnInit } from '@angular/core';
import { IDirectConversationDisplay, User } from 'src/app/models';
import { DirectConversationService } from 'src/app/service/direct-conversation.service';
import { DirectConversationDisplay } from 'src/app/models/DirectConversationDisplay';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';
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
    , private us: UserService) { 

      // this.auth.getUserState()
      // .subscribe(user => {
      //   this.user = user;
        
      //   this.dcs.getDisplayedConversation(user.uid).subscribe(conversations => {       
      //     this.conversations = conversations;
          
      //     this.uds.getUsers(this.conversations.map(value => value.user_uid))
      //     .subscribe(usersInfo => {
      //       this.users = usersInfo;
      //     });
      //   });

      // });              
    }

  ngOnInit() {
  }
}
