import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Message } from '../models/message';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messagesCollection: AngularFirestoreCollection<Message>;  
  messages: Observable<Message[]>;

  constructor(public afs:AngularFirestore) { 
    this.messages = this.afs.collection('messages').valueChanges();
  }

  public getMessages() {
    return this.messages;
  }
}
