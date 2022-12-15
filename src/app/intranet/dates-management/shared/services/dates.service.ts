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
  ) {


  }


  getForRut(rutNeighbor: any): Observable<any | void> {
    return this.http.get<any>( AUTH_API_NP + 'detail-neightbor/'+ rutNeighbor, httpOptions).pipe(map((result:any) => {

      console.log(result);

      return result['data_User_Request'];


    }),
    catchError((err)=> this.handlerError(err))
    );
  }


  getForIdRequest(idRequest: any): Observable<any | void> {
    return this.http.get<any>( AUTH_API_NP + 'joinRequestUsers/'+ idRequest, httpOptions).pipe(map((result:any) => {

      return result;

    }),
    catchError((err)=> this.handlerError(err))
    );



  }

  confirmRequest(idRequest: any): Observable<any | void> {
    return this.http.put<any>( AUTH_API_NP + 'confirmNeightbor/'+ idRequest, httpOptions).pipe(map((result:any) => {

      return result;

    }),
    catchError((err)=> this.handlerError(err))
    );

  }

  reasignRequest(idRequest: any): Observable<any | void> {
    return this.http.put<any>( AUTH_API_NP + 'reprogramDate/'+ idRequest, httpOptions).pipe(map((result:any) => {

      return result;

    }),
    catchError((err)=> this.handlerError(err))
    );

  }

  getAllRequest(): Observable<any | void> {
    return this.http.get<any>( AUTH_API_NP + 'request-assigned', httpOptions).pipe(map((result:any) => {

      return result;

    }),
    catchError((err)=> this.handlerError(err))
    );
  }

  assignSocialAssistant(idRequest:any, assignData: any): Observable<any | void> {

    return this.http.post<any>(AUTH_API_NP + 'add-visitor/'+ idRequest, assignData).pipe(map((result: any) => {

      console.log('assignsocialassistant');

      return result;

    }),
      catchError((err) => this.handlerError(err))
    );
  }

  getforSocialAssistant(rutSocialAssistant: any): Observable<any | void> {

    return this.http.get<any>(AUTH_API_NP + 'joinRequestEmployee/' + rutSocialAssistant, httpOptions).pipe(map((result: any) => {

      return result;

    }),
      catchError((err) => this.handlerError(err))
    );
  }

  programVisitDate(idRequest: any, Date: any): Observable<any | void> {

    return this.http.put<any>(AUTH_API_NP + 'programVisitDate/'+ idRequest, Date).pipe(map((result: any) => {

      return result;

    }),
      catchError((err) => this.handlerError(err))
    );
  }

  getForRurSupervisor(): Observable<any | void> {

    return this.http.get<any>(AUTH_API_NP + 'detail-request').pipe(map((result: any) => {

      return result

    }),
      catchError((err) => this.handlerError(err))
    );
  }

  approbe( idRequest: any, dataRequest:any): Observable<any | void> {

    return this.http.put<any>(AUTH_API_NP + 'approve-request/' + idRequest, dataRequest).pipe(map((result: any) => {

      return result;

    }),
      catchError((err) => this.handlerError(err))
    );
  }

  getEmployees(rutSupervisor: any): Observable<any | void> {

    return this.http.get<any>(AUTH_API_NP + 'detailsAssistant/' + rutSupervisor).pipe(map((result: any) => {

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

