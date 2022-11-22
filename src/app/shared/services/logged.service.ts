import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggedService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<any>(sessionStorage.getItem("isLoggedin"));

  get isLoggedObservable(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  set changeLoggedStatus(loggedStatus : boolean) {
    sessionStorage.setItem('isLoggedin', JSON.stringify(loggedStatus));
    this.loggedIn.next(loggedStatus)

  }

  private roleUser: BehaviorSubject<boolean> = new BehaviorSubject<any>(window.sessionStorage.getItem("rolUser"));

  get roleUserObservable(): Observable<boolean> {
    return this.roleUser.asObservable().pipe(map((result:any) => {
      console.log('isloggedObservable -> ' + result)
      return result
    }));
  }

  constructor() { }
}
