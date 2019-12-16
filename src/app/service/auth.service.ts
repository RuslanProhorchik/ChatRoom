import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { 
  AngularFirestore, 
  AngularFirestoreDocument
} from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap, switchMapTo } from 'rxjs/operators';

import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User>;
  isError: boolean;
  error: any;

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private route: Router
  ) { 

    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if(user) {
          return this.afs.doc<User>(`usesr/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );

    this.isError = false;
    this.error = null;
  }

  public async emailSignin() {  
    const provider = new auth.EmailAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    console.log('Loggin user: ', credential.user);

    return this.updateUserData(credential.user);
  };

  
  
  public async singOut() {
    await this.afAuth.auth.signOut();
    return this.route.navigate(['/']);
  }

  private updateUserData({uid, email, displayName}: User) {
    debugger;
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${uid}`);

    const data = {
      uid,
      email,
      displayName
    };

    return userRef.set(data, {merge: true});
  }
}
