import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Message } from '../models/message';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messagesCollection: AngularFirestoreCollection<Message>;  
  messages: Observable<Message[]>;

  constructor(public afs:AngularFirestore) { 
    //this.messages = this.afs.collection('messages').valueChanges();
    this.messages = this.afs.collection('messages').snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Message;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
  }

  public getMessages() {
    return this.messages;
  }
}
