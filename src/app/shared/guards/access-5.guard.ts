import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Access5Guard implements CanActivate {

  private rolUser: any;

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      this.rolUser = sessionStorage.getItem('rol-user');


      if ( this.rolUser == 5 ) {

        return true;
      }else {
        return false
      }
  }

}
