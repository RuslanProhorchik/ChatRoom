import { Injectable } from '@angular/core';

import { 
  AngularFirestore, 
  AngularFirestoreCollection, 
  AngularFirestoreDocument 
} from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { User } from '../models';
import { map } from 'rxjs/operators';
import { firestore } from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  users$: Observable<User[]>;

  constructor(public afs:AngularFirestore) {
    // this.displayedConversatons$.pipe(
    //   //load
    //   map(data => {        
    //     return data.map( a => {
    //       const userInfo = this.userService.getUserInfo(a.user_uid);
    //       a.user_name = userInfo.displayName;
    //     });        
    //   })    
    // )
    // .subscribe({
    //   next: console.log,
    //   error: console.log
    // });
   }

  //  piblic getUsersDetail(users_uid: string[]): void {
  //  }
     
    //this.afs
    // this.usersInfo$ = this.afs.collection(
    //   'users'
    //   , ref=>ref.where('user_uid','in', users_uid))
    //   .snapshotChanges()
    //   .pipe(map(changes => {
    //        return changes.map(a => {
    //          const loaded_data = a.payload.doc.data() as ;

    //          let data: IDirectConversationDisplay = new DirectConversationDisplay();
    //          data.conversation_uid = a.payload.doc.id;
    //          data.isActive = false;
    //          data.user_name = 'AllNames';
    //          data.user_uid = loaded_data.users_uid.find(x => x != userUID);
                          
    //          return data;
    //        });
    //      })       
    //   );



    // this.messages = this.afs.collection('messages', ref => ref.orderBy('createdAt', 'asc')).snapshotChanges().pipe(map(changes => {
    //   return changes.map(a => {
    //     const data = a.payload.doc.data() as Message;
    //     data.id = a.payload.doc.id;
    //     return data;
    //   });
    // }));

    //return [];}
}
