import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ModalsService } from 'src/app/shared/services/modals.service';
import { ModalComponent } from 'src/app/views/pages/ui-components/modal/modal.component';
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
    private http: HttpClient,
    private modalService: ModalsService
  ) {


  }


  getForRut(rutNeighbor: any): Observable<any | void> {
    return this.http.get<any>( AUTH_API + 'detail-neightbor/'+ rutNeighbor, httpOptions).pipe(map((result:any) => {


      return result['data_User_Request'];


    }),
    catchError((err)=> this.handlerError(err))
    );
  }


  getForIdRequest(idRequest: any): Observable<any | void> {
    return this.http.get<any>( AUTH_API + 'joinRequestUsers/'+ idRequest, httpOptions).pipe(map((result:any) => {
      return result;

    }),
    catchError((err)=> this.handlerError(err))
    );

  }

  confirmRequest(idRequest: any): Observable<any | void> {
    return this.http.put<any>( AUTH_API + 'confirmNeightbor/'+ idRequest, httpOptions).pipe(map((result:any) => {

      return result;

    }),
    catchError((err)=> this.handlerError(err))
    );

  }

  reasignRequest(idRequest: any): Observable<any | void> {
    return this.http.put<any>( AUTH_API + 'reprogramDate/'+ idRequest, httpOptions).pipe(map((result:any) => {

      return result;

    }),
    catchError((err)=> this.handlerError(err))
    );

  }

  getAllRequest(): Observable<any | void> {
    return this.http.get<any>( AUTH_API + 'request-assigned', httpOptions).pipe(map((result:any) => {

      return result;

    }),
    catchError((err)=> this.handlerError(err))
    );
  }

  assignSocialAssistant(idRequest:any, assignData: any): Observable<any | void> {

    return this.http.post<any>(AUTH_API + 'add-visitor/'+ idRequest, assignData).pipe(map((result: any) => {


      return result;

    }),
      catchError((err) => this.handlerError(err))
    );
  }

  getforSocialAssistant(rutSocialAssistant: any): Observable<any | void> {

    return this.http.get<any>(AUTH_API + 'joinRequestEmployee/' + rutSocialAssistant, httpOptions).pipe(map((result: any) => {

      return result;

    }),
      catchError((err) => this.handlerError(err))
    );
  }

  programVisitDate(idRequest: any, Date: any): Observable<any | void> {

    return this.http.put<any>(AUTH_API + 'programVisitDate/'+ idRequest, Date).pipe(map((result: any) => {

      return result;

    }),
      catchError((err) => this.handlerError(err))
    );
  }

  getForRurSupervisor(): Observable<any | void> {

    return this.http.get<any>(AUTH_API + 'detail-request').pipe(map((result: any) => {

      return result

    }),
      catchError((err) => this.handlerError(err))
    );
  }

  approbe( idRequest: any, dataRequest:any): Observable<any | void> {

    return this.http.put<any>(AUTH_API + 'approve-request/' + idRequest, dataRequest).pipe(map((result: any) => {

      return result;

    }),
      catchError((err) => this.handlerError(err))
    );
  }

  getEmployees(rutSupervisor: any): Observable<any | void> {

    return this.http.get<any>(AUTH_API + 'detailsAssistant/' + rutSupervisor).pipe(map((result: any) => {

      return result['message'];

    }),
      catchError((err) => this.handlerError(err))
    );
  }

  detailsVisitor( rutVisitor: any ): Observable<any | void> {

    return this.http.get<any>( AUTH_API + 'detailsVisitor/' + rutVisitor ).pipe(map((result: any) => {

      return result;

    }),
      catchError((err) => this.handlerError(err))
    );
  }

  private handlerError(err:any): Observable<never> { //pasa error al login component
    let errorMessage= 'An error ocurred';
    if (err) {
      // this.errorMessage= `error code: ${err}`;


      if (err.status === 500) {

        let title: string = ''
        let message: string = "Su Solicitud no Pudo ser Procesada Intente Nuevamente";
        this.modalService.OpenModalError2(ModalComponent, true, title, message);

      } else {

        this.errorMessage= err.error;

      }


    }

    return throwError(this.errorMessage)
  }

}

