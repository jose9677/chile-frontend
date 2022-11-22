import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { catchError, map, Observable, throwError } from 'rxjs';


import {environment} from '../../../../../environments/environment';
import { Router } from '@angular/router';
import { LoggedService } from 'src/app/shared/services/logged.service';
import { TokenService } from 'src/app/shared/services/token.service';




const AUTH_API = environment.urlApi;
const AUTH_API_NP = environment.urlApiNp;
const TOKEN_KEY = 'access_token';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  errorMessage = '';



  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenService: TokenService,
    public loggedService: LoggedService

  ) { }



  login(authData: any): Observable<any | void >{
    return this.http.post<any>( AUTH_API + 'login', authData).pipe(map((result:any) => {

      console.log('login User');

      window.sessionStorage.removeItem('error_status');

      const token = result.data.jwt;
      this.tokenService.saveToken(token);

      const tokenDecode = this.tokenService.decodeToken(token);

      const userSession: any = tokenDecode;
      this.tokenService.saveUser(userSession);

    }),
    catchError((err)=> this.handlerError(err))
    );
  }


  register(user: any): Observable<any>{
    return this.http.post( AUTH_API + 'register-user', user, httpOptions).pipe(map((result:any) => {

      console.log('Register_User-Res->', result);

    }),
    catchError((err)=> this.handlerError(err))
    );
  }


  validateRut(Rut: any): Observable<any>{
    return this.http.post( AUTH_API_NP + 'validate-user', Rut).pipe(map((result:any) => {

      console.log('Validate_Rut-Res->', result);

    }),
    catchError((err)=> this.handlerError(err))
    );
  }


  validateUser(user: any): Observable<any>{
    return this.http.post( AUTH_API_NP + 'validate-user', user).pipe(map((result:any) => {

      console.log('Validate_User-Res->', result);

    }),
    catchError((err)=> this.handlerError(err))
    );
  }



  validateEmail(otp: any): Observable<any>{
    return this.http.post( AUTH_API_NP + 'validate-email', otp).pipe(map((result:any) => {

      console.log('Validate_Email-Res->', result);

    }),
    catchError((err)=> this.handlerError(err))
    );
  }


  activateUser(user:any, rol:any): Observable<any>{
    return this.http.put<any>( AUTH_API + 'active-user/'+ user, rol ,httpOptions).pipe(map((result:any) => {

      console.log('activate_User-Res->', result);

    }),
    catchError((err)=> this.handlerError(err))
    );
  }


  desactivateUser(user:any): Observable<any>{
    return this.http.put<any>( AUTH_API + 'desactive-user/'+ user, httpOptions).pipe(map((result:any) => {

      console.log('activate_User-Res->', result);

    }),
    catchError((err)=> this.handlerError(err))
    );
  }


  recoveryPassword(data: any): Observable<any>{
    return this.http.put<any>( AUTH_API_NP + 'change-password', data, httpOptions).pipe(map((result:any) => {

      console.log('recoveryPassword-Res->', result);

    }),
    catchError((err)=> this.handlerError(err))
    );
  }


  logOut(): void {
    console.log('sesion cerrada');

    window.sessionStorage.clear();
    this.loggedService.changeLoggedStatus= false;
    this.router.navigate(['/login']);
  }

  public checkToken(): void {
    const userToken: any = window.sessionStorage.getItem(TOKEN_KEY);
    const isExpired = this.tokenService.helper.isTokenExpired(userToken);

    if (isExpired == true) {
      console.log('is Expired', isExpired);
      this.logOut();
      // window.sessionStorage.clear();
      this.router.navigate(['/login']);
    }else{
      console.log('is Expired', isExpired);
    }
  }

  private handlerError(err:any): Observable<never> { //pasa error al login component
    let errorMessage= 'An error ocurred';
    if (err) {
      // this.errorMessage= `error code: ${err}`;
      this.errorMessage= err;

    }
    console.log(this.errorMessage);

    return throwError(this.errorMessage)
  }





}
