import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { BehaviorSubject } from 'rxjs';

import { CreateUserModel, LoginUserModel, UserDetail } from '../models';
import { map, tap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {  
  private eventAuthError = new BehaviorSubject<string>("");
  eventAuthError$ = this.eventAuthError.asObservable();

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private route: Router
  ) { 
  }
  
  public redirectIfAuthorized(){      
    this.getUserState().pipe(
      take(1),
      map(user => !!user),
      tap(loggedIn => {
        return loggedIn;
      })      
    ).subscribe(result => {
      //console.log('User is authorized - ' + result);
      this.route.navigate(['/home']);
    });
  }

  public getUserState(){
    return this.afAuth.authState;
  }

  public createUser(user: CreateUserModel) {
    let newUser: UserDetail;

    this.afAuth.auth.createUserWithEmailAndPassword(user.Email, user.Password)
    .then(userCredential => {      
      newUser = new UserDetail(user);
      newUser.uid = userCredential.user.uid;

      userCredential.user.updateProfile({
        displayName: newUser.displayName
      });

      this.insertUserData(newUser);
      this.logout();            
    })
    .catch(error => {
      this.eventAuthError.next(error.message);
    });    
  }

  private insertUserData(userInfo: UserDetail) {
    return this.afs.doc(`users/${userInfo.uid}`).set({
      email: userInfo.email,
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      displayName: userInfo.displayName,
      uid: userInfo.uid
    });
  }

  public logout() {
     this.afAuth.auth.signOut();     
     this.route.navigate(['/login']);
   }

   public login(user: LoginUserModel) {

     this.afAuth.auth.signInWithEmailAndPassword(user.Email, user.Password).catch(
       error => {
        this.eventAuthError.next(error.message);
       })
       .then(userCredential => {
         if(userCredential) {
           this.route.navigate(['/home']);
         }
       });      
   }
}
