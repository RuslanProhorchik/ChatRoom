import { Injectable } from '@angular/core';
import { 
  AngularFirestore, 
  AngularFirestoreCollection, 
  AngularFirestoreDocument 
} from '@angular/fire/firestore';

import { Message } from '../models/message';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messagesCollection: AngularFirestoreCollection<Message>;  
  messages: Observable<Message[]>;
  messageDoc: AngularFirestoreDocument<Message>;

  constructor(public afs:AngularFirestore) { 
    //this.messages = this.afs.collection('messages').valueChanges();
    this.messagesCollection = this.afs.collection('messages');

    //console.log(this.messagesCollection);

    this.messages = this.afs.collection('messages', ref => ref.orderBy('createdAt', 'asc')).snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Message;
        data.id = a.payload.doc.id;
        return data;
      });
    }));

    //console.log(this.messages);
  }

  public getMessages() {
    return this.messages;
  }

  public addMessage(message: Message){    
    this.messagesCollection.add(message);
  }

  public deleteMessage(message: Message){
    this.messageDoc = this.afs.doc(`messages/${message.id}`);
    this.messageDoc.delete();
  }

  public updateMessage(message: Message){
    this.messageDoc = this.afs.doc(`messages/${message.id}`);
    this.messageDoc.update(message);
  }
}
