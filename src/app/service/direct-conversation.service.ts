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


@Injectable({
  providedIn: 'root'
})
export class DirectConversationService {
  directConvers: Observable<DirectConversation[]>;
  displayedConversatons$: Observable<IDirectConversationDisplay[]>;

  constructor(private afs: AngularFirestore) {    
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

  public createConversation(ownerUID: string, partnerUID: string, messagesStoragesUID: string) {
    let retValue: string = null;
    
    console.log('createConversation ownerUID: ', ownerUID);
    console.log('createConversation partnerUID: ', partnerUID);
    console.log('createConversation messagesStoragesUID: ', messagesStoragesUID);

    this.afs.collection('conversations').add({
      messages_uid: messagesStoragesUID,     
      users_uid: [ownerUID, partnerUID]
    })
   .then(function(docRef) {

     retValue = docRef.id;            
     console.log("Document written with ID: ", docRef.id);

   })
   .catch(function(error) {
       console.error("Error adding document: ", error);
       retValue = null;
   });

   console.log('createConversation conversation_uid ', retValue);
   return retValue;    
  }
}
