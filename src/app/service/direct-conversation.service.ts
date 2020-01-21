import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DirectConversation, IDirectConversationDisplay, StoredConversation } from '../models';
import { 
  AngularFirestore, 
  AngularFirestoreCollection, 
  AngularFirestoreDocument 
} from '@angular/fire/firestore';

import { map } from 'rxjs/operators';
import { DirectConversationDisplay } from '../models/DirectConversationDisplay';
import { MessageService } from './message.service';


@Injectable({
  providedIn: 'root'
})
export class DirectConversationService {
  directConvers: Observable<DirectConversation[]>;
  displayedConversatons$: Observable<IDirectConversationDisplay[]>;

  constructor(private afs: AngularFirestore
    , private ms: MessageService) {    
  }

  public getConversations(userUID: string) {
    return this.directConvers;
  }

  public getDisplayedConversation(userUID: string) {

    this.displayedConversatons$ = this.afs.collection(
      'conversations'
      , ref=>ref.where('users_uid','array-contains', userUID)
      )
      .snapshotChanges()
      .pipe(map(changes => {
           return changes.map(a => {
             const loaded_data = a.payload.doc.data() as StoredConversation;

             let data: IDirectConversationDisplay = new DirectConversationDisplay();
             data.messages_uid = loaded_data.messages_uid;                          
             data.user_uid = loaded_data.users_uid.find(x => x != userUID);
                          
             return data;
           });
         })       
      );
      
    return this.displayedConversatons$;
  
  }

  public createConversation(ownerUID: string
    , partnerUID: string): Observable<string> {
      
      return new Observable<string>((observer) => {
        
        this.ms.createMessagesStorage().subscribe(
          data => {
            this.afs.collection('conversations').add({                
              messages_uid: data,                                    
              users_uid: [ownerUID, partnerUID]
              })
              .then(function(docRef) {
                console.log("Conversation created with ID: ", docRef.id);
                observer.next(docRef.id);
                observer.complete();
              })
              .catch(() => {
                observer.error('Create conversation - Error. ');
              })      
          },
          error => {
            observer.error('Create conversation - Error. Message storage is not created');
          }          
        );              
      });      
  }
}
