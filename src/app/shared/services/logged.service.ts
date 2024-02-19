import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggedService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<any>(sessionStorage.getItem("isLoggedin"));

  constructor() {
   }

  get isLoggedObservable(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  set changeLoggedStatus(loggedStatus : boolean) {
    sessionStorage.setItem('isLoggedin', JSON.stringify(loggedStatus));
    this.loggedIn.next(loggedStatus)

  }

  private isRegisterUser: BehaviorSubject<boolean> = new BehaviorSubject<any>(false);

  get isRegisterUserObservable(): Observable<boolean> {
    return this.isRegisterUser.asObservable()

  }

  set changeisRegisterUserStatus(isRegisterUserStatus : boolean) {
    this.isRegisterUser.next(isRegisterUserStatus)

  }

  // private roleUser: BehaviorSubject<any> = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem("rol-user")));

  // get roleUserObservable(): Observable<any> {
  //   return this.roleUser.asObservable();
  // }

  // roleUserValue() {
  //   return this.roleUser.getValue();
  // }

  // private rutUser: BehaviorSubject<any> = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem("auth-user")));

  // get RutUserObservable(): Observable<any> {
  //   return this.rutUser.asObservable();
  // }

  // rutUserValue() {
  //   return this.rutUser.getValue();
  // }



}
