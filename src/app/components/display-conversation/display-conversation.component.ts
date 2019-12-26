import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from 'src/app/service/message.service';
import { Message } from 'src/app/models';

@Component({
  selector: 'app-display-conversation',
  templateUrl: './display-conversation.component.html',
  styleUrls: ['./display-conversation.component.css']
})
export class DisplayConversationComponent implements OnInit {  
  private _channelUid: string;
  @Input() set channelUid(channelUid: string) {
    this._channelUid = channelUid;

    if(channelUid != '') {
      this.isLoaded = true;
    } else {
      this.isLoaded = false;
    }
  }

  get channelUid(): string {
    return this._channelUid;
  }
  

  isLoaded: boolean;

  constructor(private ms: MessageService) {     
  }

  ngOnInit(): void {
    this.isLoaded = false;
  }
}
