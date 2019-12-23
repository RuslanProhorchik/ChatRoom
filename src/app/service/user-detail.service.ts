import { Injectable } from '@angular/core';

import { 
  AngularFirestore, 
  AngularFirestoreCollection, 
  AngularFirestoreDocument 
} from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { UserDetail, IUserDetail } from '../models';
import { map } from 'rxjs/operators';
import { firestore } from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class UserDetailService {
  users$: Observable<IUserDetail[]>;
  
  //user$: Observable<IUserDetail>;  
  
  userInfoDoc: AngularFirestoreDocument<IUserDetail>;

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

   public getUserInfo(uid: string): IUserDetail {
    
    console.log(uid);    
    // var docRef = this.afs.collection("users").doc(uid);

    // docRef.ref.get().then(function(doc) {
        
    //   if (doc.exists) {     
    //     console.log("Document data:", doc.data());            
    //     this.user$ = doc.data();

    //         // const obj = doc.data();                
    //         // obj.id = doc.id;                
    //         // return obj as IUserDetail;            
            
    //     } else {
    //         // doc.data() will be undefined in this case
    //         console.log("No such document!");            
    //     }
    // }).catch(function(error) {
    //     console.log("Error getting document:", error);
    // });
     
    return {      
      uid: 'id1',
      email: 'id1@gmail.com',
      firstName: 'F1',
      lastName: 'F2',
      displayName: 'F1 F2'
    };
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
