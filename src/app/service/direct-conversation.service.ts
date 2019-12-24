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
    // this.displayedConversatons = new Observable<IDirectConversationDisplay[]>((observer) => {      

    //   let allConversations: DirectConversationDisplay[] = [];
  
    //   allConversations.push({
    //     conversation_uid: 'i1',
    //     name: 'Item1',
    //     isActive: true
    //   });

    //   allConversations.push({
    //     conversation_uid: 'i2',
    //     name: 'Item2',
    //     isActive: false
    //   });

    //   allConversations.push({
    //     conversation_uid: 'i3',
    //     name: 'Item3',
    //     isActive: true
    //   });

    //   allConversations.push({
    //     conversation_uid: 'i4',
    //     name: 'Item4',
    //     isActive: false
    //   });

    //   observer.next(allConversations);
    //   observer.complete();
    // });   
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
             data.conversation_uid = a.payload.doc.id;
             data.isActive = false;
             data.user_name = 'AllNames';
             data.user_uid = loaded_data.users_uid.find(x => x != userUID);
                          
             return data;
           });
         })       
      );
      
    return this.displayedConversatons$;
  }
}
