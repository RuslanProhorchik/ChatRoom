import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from 'src/app/service/message.service';
import { Message } from 'src/app/models';

@Component({
  selector: 'app-display-conversation',
  templateUrl: './display-conversation.component.html',
  styleUrls: ['./display-conversation.component.css']
})
export class DisplayConversationComponent implements OnInit {  
  @Input() channelUid: string;
  
  isLoaded: boolean;

  constructor(private ms: MessageService) {     
  }

  ngOnInit(): void {
    this.isLoaded = false;
  }

  // public initSubcollection() {
  //   let storage_uid: string = 'v7IX6FnwBC2NxYSDMadU';
  //   this.ms.openMessagesStorage(storage_uid);
  // }

  // public addMessage(){
  //   let storage_uid: string = 'v7IX6FnwBC2NxYSDMadU';    

  //   let ms1: Message = {
  //     text: 'Text1',
  //     ownerUid: 'uCoCnXieuGXlP5Qs5a3c0SInr9s1',
  //     createdAt: new Date(Date.now())
  //   };
    
  //   let ms2: Message = {
  //     text: 'Text2',
  //     ownerUid: 'bf2mCC5QhZgiMdbSdNzsuhPlRXu2',
  //     createdAt: new Date(Date.now())
  //   };
    
  //   let ms3: Message = {
  //     text: 'Text3',
  //     ownerUid: 'uCoCnXieuGXlP5Qs5a3c0SInr9s1',
  //     createdAt: new Date(Date.now())
  //   };
    
    
  //   this.ms.openMessagesStorage(storage_uid);
  //   this.ms.addMessage(ms1);
  //   this.ms.addMessage(ms2);
  //   this.ms.addMessage(ms3);
  // }

}
