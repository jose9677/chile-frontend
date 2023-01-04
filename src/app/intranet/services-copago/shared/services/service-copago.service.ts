import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

const AUTH_API = environment.urlApi;
const AUTH_API_NP = environment.urlApiNp;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ServiceCopagoService {

  private errorMessage = '';

  private listServicesCopago: any[];



  constructor(
    private http: HttpClient
  ) {

    this.listServicesCopago = [];
   }


   addServices( typeService: any, nameService: any, amountServices: any) {
    this.listServicesCopago.push({"typeService": typeService, "nameService": nameService, "amountServices": amountServices})

    console.log(this.listServicesCopago);

   }

   getSetvices() {
    return this.listServicesCopago
   }

   getDataUser( rutNeighbor: any): Observable<any | void> {
    return this.http.get<any>( AUTH_API_NP + 'search-user/' + rutNeighbor, httpOptions).pipe(map((result: any) => {
      return result
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

    return throwError(this.errorMessage)
  }

}


