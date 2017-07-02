import { Injectable } from '@angular/core';
import {AngularFireAuth} from "angularfire2/auth/auth";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {AuthInfo} from "./auth-info";

@Injectable()
export class AuthService {

  static UNKNOWN_USER = new AuthInfo(null);
  authInfo$: BehaviorSubject<AuthInfo> = new BehaviorSubject(AuthService.UNKNOWN_USER);

  constructor(private auth: AngularFireAuth) { }
  signUp(email,password){

    return this.fromFirebaseAuthPromise(this.auth.auth.createUserWithEmailAndPassword(email,password));
  }

  logIn(email,password){

    return this.fromFirebaseAuthPromise(this.auth.auth.signInWithEmailAndPassword(email, password));
  }

  logOut(){
    this.auth.auth.signOut();
    this.authInfo$.next(AuthService.UNKNOWN_USER);
  }

  fromFirebaseAuthPromise(promise):Observable<any>{
    const subject=new Subject<any>();
    promise
      .then(res =>{
          //console.log(this.auth.auth.currentUser.uid);
          const authInfo = new AuthInfo(this.auth.auth.currentUser.uid);
          this.authInfo$.next(authInfo);
          subject.next(res);
          subject.complete();

        },
        err => {
          this.authInfo$.error(err);
          subject.error(err);
          subject.complete();
        });
    return subject.asObservable();
  }
}
