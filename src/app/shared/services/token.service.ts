import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

const TOKEN_KEY = 'access_token';
const USER_KEY = 'auth-user';
const USER_ROL = 'rol-user';
const USER_NAME = 'full-names';

@Injectable({
  providedIn: 'root'
})
export class TokenService {


  helper= new JwtHelperService();

  constructor(
    private router: Router,
  ) {

    this.checkToken();

   }


  // public signOut(): void {
  //   window.sessionStorage.clear();
  //   this.router.navigate(['login']);
  // }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);

  }

  public decodeToken(token:any) {
    console.log(this.helper.decodeToken(token))
     return this.helper.decodeToken(token);
  }

  public getToken(): string | null {

    return window.sessionStorage.getItem(TOKEN_KEY)
    ;
  }



  public saveUser(dataUser: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(dataUser.sub));
    window.sessionStorage.setItem(USER_ROL, JSON.stringify(dataUser.id_rol));
    window.sessionStorage.setItem(USER_NAME, JSON.stringify(dataUser.names+' '+dataUser.lastname ));


    // window.sessionStorage.setItem(USER_ROL, JSON.stringify(dataUser.id_rol));

  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }

  public checkToken(): void {
    const userToken: any = window.sessionStorage.getItem(TOKEN_KEY);
    const isExpired = this.helper.isTokenExpired(userToken);

    console.log('CheckToken');

    if (isExpired == true) {
      console.log('is Expired', isExpired);
      // this.logOut();
      window.sessionStorage.clear();
      // this.router.navigate(['/login']);
    }else{
      console.log('is Expired', isExpired);
    }
  }
}
