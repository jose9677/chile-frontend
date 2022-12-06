import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoggedService } from 'src/app/shared/services/logged.service';

@Injectable({
  providedIn: 'root'
})
export class CheckLoginGuard implements CanActivate {

  isLoggedin: Observable<boolean>;

  constructor (
    private loggedService: LoggedService) {

    }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      this.isLoggedin = this.loggedService.isLoggedObservable

      if (!this.isLoggedin) {
        return true
      }
      return true;
  }

}
