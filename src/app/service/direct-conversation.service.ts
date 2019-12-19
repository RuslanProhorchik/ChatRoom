import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DirectConversation, IDirectConversationDisplay } from '../models/interfaces';
import { DirectConversationDisplay } from '../models/DirectConversationDisplay';

@Injectable({
  providedIn: 'root'
})
export class DirectConversationService {
  directConvers: Observable<DirectConversation[]>;

  displayedConversatons: Observable<IDirectConversationDisplay[]>;

  constructor() { 
    this.displayedConversatons = new Observable<IDirectConversationDisplay[]>((observer) => {      

      let allConversations: DirectConversationDisplay[] = [];
  
      allConversations.push({
        conversation_uid: 'i1',
        name: 'Item1',
        isActive: true
      });

      allConversations.push({
        conversation_uid: 'i2',
        name: 'Item2',
        isActive: false
      });

      allConversations.push({
        conversation_uid: 'i3',
        name: 'Item3',
        isActive: true
      });

      allConversations.push({
        conversation_uid: 'i4',
        name: 'Item4',
        isActive: false
      });

      observer.next(allConversations);
      observer.complete();
    });   
  }

  public getConversations(userUID: string) {
    return this.directConvers;
  }

  public getDisplayedConversation(userUID: string) {
    return this.displayedConversatons;
  }
}
