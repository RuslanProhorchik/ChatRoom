import { Injectable } from '@angular/core';

import { 
  AngularFirestore
} from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { IUserDetail } from '../models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserDetailService {
  users$: Observable<IUserDetail[]>;      

  constructor(public afs:AngularFirestore) {       
  }
    
   public getUsersDetail(uids: string[]) {
     this.users$ = this.afs.collection('users', ref=>ref.where('uid','in', uids))
     .snapshotChanges()
     .pipe(map(changes => {
            return changes.map(a => {
              const loaded_data = a.payload.doc.data() as IUserDetail ;
              return loaded_data;
            });
          })       
       );

      return this.users$;    
    }
}
