import { Injectable } from '@angular/core';
import { 
  AngularFirestore, 
  AngularFirestoreCollection, 
  AngularFirestoreDocument 
} from '@angular/fire/firestore';

import { Message } from '../models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messagesCollection: AngularFirestoreCollection<Message>;  
  messages: Observable<Message[]>;
  messageDoc: AngularFirestoreDocument<Message>;

  messages_uid: string;
  

  constructor(public afs:AngularFirestore) {     
    // this.messagesCollection = this.afs.collection('messages');
    // this.messages = this.afs.collection('messages', ref => ref.orderBy('createdAt', 'asc')).snapshotChanges().pipe(map(changes => {
    //   return changes.map(a => {
    //     const data = a.payload.doc.data() as Message;
    //     data.id = a.payload.doc.id;
    //     return data;
    //   });
    // }));

    //console.log(this.messages);
  }

  public getMessages(uid: string) {
    this.messages = this.afs.collection('messages')
    .doc(uid)
    .collection('storedMessages', ref => ref.orderBy('createdAt', 'asc'))
    .snapshotChanges()
    .pipe(map(changes => {    
      return changes.map(a => {    
        const data = a.payload.doc.data() as Message;    
        data.uid = a.payload.doc.id;    
        return data;    
      });
    }));

    return this.messages;
  }

  public addMessage(message: Message){    
    this.messagesCollection.add(message);
  }

  public deleteMessage(parent_uid: string, message: Message){
    //console.log('Delete: ' + message + ' in messages storage ' + parent_uid);
    this.messageDoc = this.afs.doc(`messages/${parent_uid}/storedMessages/${message.uid}`);
    this.messageDoc.delete();    
  }

  public updateMessage(parent_uid: string, message: Message){
    //console.log('Update: ' + message)
    this.messageDoc = this.afs.doc(`messages/${parent_uid}/storedMessages/${message.uid}`);
    this.messageDoc.update(message);
  }

  public openMessagesStorage(uid: string) {
    this.messagesCollection = this.afs.collection('messages').doc(uid).collection('storedMessages');
  }

  public isMessagesStorageOpened(): boolean {
    return (this.messagesCollection!=null)? true : false;
  }

  public closeMessagesStorage() {
    this.messagesCollection = null;
  }
}
