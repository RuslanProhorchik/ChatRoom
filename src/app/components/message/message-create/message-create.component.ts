import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/models/message';
import { MessageService } from 'src/app/service/message.service';

@Component({
  selector: 'app-message-create',
  templateUrl: './message-create.component.html',
  styleUrls: ['./message-create.component.css']
})
export class MessageCreateComponent implements OnInit {

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
      this.messageService.addMessage(this.message);

      this.clearFields();
    }
  }

  private clearFields(){
    this.message.text = '';
  }
}
