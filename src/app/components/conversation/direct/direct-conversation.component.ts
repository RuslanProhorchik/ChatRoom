import { Component, OnInit } from '@angular/core';
import { IDirectConversationDisplay } from 'src/app/models/interfaces';
import { DirectConversationService } from 'src/app/service/direct-conversation.service';
import { DirectConversationDisplay } from 'src/app/models/DirectConversationDisplay';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-direct-conversation',
  templateUrl: './direct-conversation.component.html',
  styleUrls: ['./direct-conversation.component.css']
})
export class DirectConversationComponent implements OnInit {
  user: firebase.User;
  conversations: IDirectConversationDisplay[];
  
  constructor(private auth: AuthService
    , private dcs: DirectConversationService) { 

      this.auth.getUserState()
      .subscribe(user => {
        this.user = user;
        
        this.dcs.getDisplayedConversation(user.uid).subscribe(conversations => {       
          this.conversations = conversations;    
        });

      });              
    }

  ngOnInit() {
  }
}
