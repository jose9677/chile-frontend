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


  private errorMessage = '';



  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenService: TokenService,
    public loggedService: LoggedService

  ) {

    // this.checkToken();

  }



  login(authData: any): Observable<any | void >{
    return this.http.post<any>( AUTH_API + 'login', authData, httpOptions).pipe(map((result:any) => {

      console.log(result);

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


  validateRut(Rut: any): Observable<any>{
    return this.http.post( AUTH_API_NP + 'validateRut', Rut).pipe(map((result:any) => {

      console.log('Validate_Rut-Res->', result);

    }),
    catchError((err)=> this.handlerError(err))
    );
  }


  register(dataUser: any): Observable<any>{
    return this.http.post( AUTH_API + 'registerNeighbor', dataUser, httpOptions).pipe(map((result:any) => {

      console.log('Register_User-Res->', result);

    }),
    catchError((err)=> this.handlerError(err))
    );
  }


  uploadFiles(fileData: File, id_document_type: any): Observable<any>{
    console.log(fileData)

    const formfileData = new FormData();


    formfileData.append('document_path', fileData);
     console.log(formfileData)

    return this.http.post( AUTH_API_NP + 'file/' + id_document_type , formfileData).pipe(map((result:any) => {


      console.log('uploadFiles-Res->', result);

    }),
    catchError((err)=> this.handlerError(err))
    );
  }


  createRequest(dataRequest: any): Observable<any>{
    return this.http.post( AUTH_API + 'create-request', dataRequest, httpOptions).pipe(map((result:any) => {

      console.log('createUser-Res->', result);

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

  refreshOtp (rutUser: any): Observable<any>{
    return this.http.put( AUTH_API_NP + 'refresh-otp', rutUser).pipe(map((result:any) => {

      console.log('refreshotp-Res->', result);

    }),
    catchError((err)=> this.handlerError(err))
    );
  }


  activateUser(user:any, rol:any): Observable<any>{
    return this.http.put<any>( AUTH_API + 'active-user/'+ user, rol , httpOptions).pipe(map((result:any) => {

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
    window.sessionStorage.removeItem('rol-user');
    window.sessionStorage.removeItem('access_token');
    window.sessionStorage.removeItem('auth-user');
    // this.loggedService.changeLoggedStatus= false;
    this.router.navigate(['/auth/login']);
  }


  dropdownInfo(): Observable<any>{
    return this.http.get<any>( AUTH_API_NP + 'dropdownInfo', httpOptions).pipe(map((result:any) => {

      return result

    }),
    catchError((err)=> this.handlerError(err))
    );
  }


  restartUser(rutUser: any): Observable<any | void> {

    return this.http.delete<any>(AUTH_API_NP + 'restartUser', rutUser ).pipe(map((result: any) => {

      return result['message'];

    }),
      catchError((err) => this.handlerError(err))
    );
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
