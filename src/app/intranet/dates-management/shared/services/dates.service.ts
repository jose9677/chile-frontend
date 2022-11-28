import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';


const AUTH_API = environment.urlApi;
const AUTH_API_NP = environment.urlApiNp;
const TOKEN_KEY = 'access_token';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};



@Injectable({
  providedIn: 'root'
})
export class DatesService {

  private errorMessage = '';

  constructor(
    private http: HttpClient
  ) { }


  getForRut() {

    console.log('getForRut')

  }


  getForIdRequest() {

    console.log("getForIdRequest")

  }

  confirm() {

    console.log('confirm')

  }

  reasign() {

    console.log('reasing')

  }

  getAll(): Observable<any | void> {
    return this.http.get<any>( AUTH_API_NP + 'detailUserRequest', httpOptions).pipe(map((result:any) => {

      return result['data'];

    }),
    catchError((err)=> this.handlerError(err))
    );
  }

  assignSocialAssistant() {

    console.log('assignsocialassistant')

  }

  getforSocialAssistant() {

    console.log('get for social assistant')

  }

  approbe() {

    console.log('approve')

  }

  decline() {

    console.log('decline')

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
