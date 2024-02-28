import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, Subject, tap, throwError } from 'rxjs';
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

  private _refresh$ = new Subject<void>();

  get refresh$(){
    return this._refresh$;
  }

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
    return this.http.get<any>( AUTH_API_NP + 'consult-modify/'+ idRequest, httpOptions).pipe(map((result:any) => {

      return result;

    }),
    catchError((err)=> this.handlerError(err))
    );

  }

  getDataUserForRut(rutUser: any): Observable<any | void> {
    return this.http.get<any>( AUTH_API_NP + 'get-data-user/'+ rutUser, httpOptions).pipe(map((result:any) => {

      return result;

    }),
    catchError((err)=> this.handlerError(err))
    );

  }

  createRequest(dataRequest: any): Observable<any | void> {
    return this.http.post<any>( AUTH_API_NP + 'create-request', dataRequest, httpOptions).pipe(map((result:any) => {

      return result;

    }),
    catchError((err)=> this.handlerError(err))
    );

  }

  confirmRenovation(idRequest: any, dataRequest: any): Observable<any | void> {
    return this.http.put<any>( AUTH_API_NP + 'confirm-reno-sol/'+ idRequest, dataRequest, httpOptions).pipe(map((result:any) => {

      return result;

    }),
    catchError((err)=> this.handlerError(err))
    );

  }

  uploadFilesNewRequest(documentRequest: any): Observable<any | void> {

    for (const value of documentRequest.keys()) {
      console.log(value);
    }
    return this.http.post<any>( AUTH_API_NP + 'sol-doc', documentRequest).pipe(map((result:any) => {

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

  getForSocialAssistant(rutSocialAssistant: any): Observable<any | void> {

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

  UpdatePersonalData(rutUser: any, personalData: any): Observable<any>{
    let url = `${AUTH_API_NP}update-user-modify-VIP/${rutUser}`;
    return this.http.put(url, personalData).pipe(map((result:any) => {

      return result;

    }),
    tap(() => {
      this._refresh$.next();
    }),
    catchError((err)=> this.handlerError(err))
    )

  }

  UpdateRequestData(idRequest: any, rutEmployee: any, requestData: any): Observable<any>{
    let url = `${AUTH_API_NP}update-sol-modify-VIP/${idRequest}/${rutEmployee}`;
    return this.http.put(url, requestData).pipe(map((result:any) => {

      return result;

    }),
    tap(() => {
      this._refresh$.next();
    }),
    catchError((err)=> this.handlerError(err))
    )

  }

  UpdateDocuments(idRequest: any, documentType, filesData: any): Observable<any>{
    let url = `${AUTH_API_NP}load-file-modify/${idRequest}/${documentType}`;
    return this.http.post(url, filesData).pipe(map((result:any) => {

      return result;

    }),
    tap(() => {
      this._refresh$.next();
    }),
    catchError((err)=> this.handlerError(err))
    )

  }

  deleteDocuments(listDocuments: any): Observable<any>{
    let url = `${AUTH_API_NP}delete-doc-many`;
    return this.http.put(url, listDocuments).pipe(map((result:any) => {

      return result;

    }),
    tap(() => {
      this._refresh$.next();
    }),
    catchError((err)=> this.handlerError(err))
    )

  }

  UpdateAdditionalInformation(id: any, rutEmployee: any, additionallData: any): Observable<any>{
    let url = `${AUTH_API_NP}update-extra-data/${id}/${rutEmployee}`;
    return this.http.put(url, additionallData).pipe(map((result:any) => {

      return result;

    }),
    tap(() => {
      this._refresh$.next();
    }),
    catchError((err)=> this.handlerError(err))
    )

  }

  dropdownInfo(): Observable<any>{
    return this.http.get<any>( AUTH_API_NP + 'dropdownInfo', httpOptions).pipe(map((result:any) => {

      return result

    }),
    catchError((err)=> this.handlerError(err))
    );
  }

  private handlerError(err:any): Observable<never> { //pasa error al login component
    let errorMessage= 'An error ocurred';
    if (err) {

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

