import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoggedService } from 'src/app/shared/services/logged.service';
import { __values } from 'tslib';


@Injectable({
  providedIn: 'root'
})
export class WithoutSaveGuard implements CanDeactivate<unknown> {


  private isRegisterUser: boolean;

  constructor(
    private loggedServices: LoggedService

  ) {

    this.loggedServices.isRegisterUserObservable.forEach((value: boolean) => {
      return this.isRegisterUser = value
    });

  }

  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      console.log(this.isRegisterUser);

      if (this.isRegisterUser != true) {
        return confirm('¿Quieres Salir sin Guardar los Cambios?')
      }else {
        return true
      }

  }

  hasUser(): boolean {
    return false;
  }

}
