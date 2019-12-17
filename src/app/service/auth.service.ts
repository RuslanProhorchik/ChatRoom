import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of, BehaviorSubject } from 'rxjs';
import { switchMap, } from 'rxjs/operators';

import { CreateUserModel, LoginUserModel } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  newUser: CreateUserModel;
  private eventAuthError = new BehaviorSubject<string>("");
  eventAuthError$ = this.eventAuthError.asObservable();

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private route: Router
  ) { 
  }

  public getUserState(){
    return this.afAuth.authState;
  }

  public createUser(user: CreateUserModel) {    
    this.afAuth.auth.createUserWithEmailAndPassword(user.Email, user.Password)
    .then(userCredential => {
      this.newUser = user;    
      userCredential.user.updateProfile({
        displayName: user.FirstName + ' ' + user.LastName,
      });

      this.insertUserData(userCredential);
      this.route.navigate(['/login']);
    })
    .catch(error => {
      this.eventAuthError.next(error.message);
    });    
  }

  private insertUserData(userCredential: firebase.auth.UserCredential) {
    return this.afs.doc(`users/${userCredential.user.uid}`).set({
      email: this.newUser.Email,
      firstName: this.newUser.FirstName,
      lastName: this.newUser.LastName
    });
  }

  public logout() {
     this.afAuth.auth.signOut();     
     this.route.navigate(['/login']);
   }

   public login(user: LoginUserModel) {
     this.afAuth.auth.signInWithEmailAndPassword(user.Email, user.Password).catch(
       error => {
        this.eventAuthError.next(error);
       })
       .then(userCredential => {
         if(userCredential) {
           this.route.navigate(['/home']);
         }
       });      
   }
}
