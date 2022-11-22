import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { map, take } from 'rxjs';
import { LoggedService } from 'src/app/shared/services/logged.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private loggedService: LoggedService
    ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isLoggedin = this.loggedService.isLoggedObservable
    console.log(isLoggedin || null)

    const isLoggedin2 = sessionStorage.getItem('isLoggedin')

      if (isLoggedin2) {
      console.log(this.loggedService.isLoggedObservable)

      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
