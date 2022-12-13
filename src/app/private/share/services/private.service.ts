import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { catchError, map, Observable, throwError } from 'rxjs';


import { environment } from 'src/environments/environment';
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
export class PrivateService {
  private errorMessage = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenService: TokenService,
    public loggedService: LoggedService
  ) { }

  roles(): Observable<any>{
    return this.http.get<any>( AUTH_API_NP + 'details-roles', httpOptions).pipe(map((result:any) => {

      return result

    }),
    catchError((err)=> this.handlerError(err))
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

