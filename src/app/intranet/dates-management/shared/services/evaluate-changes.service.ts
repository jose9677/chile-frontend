import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { number } from 'ngx-custom-validators/src/app/number/validator';
import { BehaviorSubject, Observable, Subject, catchError, map, tap, throwError } from 'rxjs';
import { ModalComponent } from 'src/app/public/auth/shared/modals/modal/modal.component';
import { ModalsService } from 'src/app/shared/services/modals.service';
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
export class EvaluateChangesService {

  private isEditingPersonalData: BehaviorSubject<boolean>;
  private isEditingRequestData: BehaviorSubject<boolean>;
  private isEditingDocuments: BehaviorSubject<boolean>;
  private isEditingAdditionalInformation: BehaviorSubject<boolean>;

  private _refresh$ = new Subject<void>();

  constructor(
    private http: HttpClient,
    private modalService: ModalsService
  ) {

    this.isEditingPersonalData = new BehaviorSubject(false);
    this.isEditingRequestData = new BehaviorSubject(false);
    this.isEditingDocuments = new BehaviorSubject(false);
    this.isEditingAdditionalInformation = new BehaviorSubject(false);

  }

  changeEditingPersonalData( editionStatus: boolean ) {
    this.isEditingPersonalData.next(editionStatus);
  }

  get editingPersonalDataObservable(): Observable<boolean> {
    return this.isEditingPersonalData.asObservable();
  }

  viewEditingPersonalData() {
    return this.isEditingPersonalData.getValue();
  }



  changeEditingRequestData( editionStatus: boolean ) {
    this.isEditingRequestData.next(editionStatus);
  }

  get EditingRequestDataObservable(): Observable<boolean> {
    return this.isEditingRequestData.asObservable();
  }

  viewEditingRequestData() {
    return this.isEditingRequestData.getValue();
  }



  changeEditingDocuments( editionStatus: boolean ) {
    this.isEditingDocuments.next(editionStatus);
  }

  get EditingDocumentsObservable(): Observable<boolean> {
    return this.isEditingDocuments.asObservable();
  }

  viewEditingDocuments() {
    return this.isEditingDocuments.getValue();
  }



  changeEditingAdditionalInformation( editionStatus: boolean ) {
    this.isEditingAdditionalInformation.next(editionStatus);
  }

  get EditingAdditionalInformationObservable(): Observable<boolean> {
    return this.isEditingAdditionalInformation.asObservable();
  }

  viewEditingAdditionalInformation() {
    return this.isEditingAdditionalInformation.getValue();
  }

  get refresh$(){
    return this._refresh$;
  }

  modified(id: any): Observable<any>{
    let url = AUTH_API + 'active-rol/'+ id;
    return this.http.put(url, null).pipe(map((result:any) => {

      console.log(result);

    }),
    tap(() => {
      this._refresh$.next();
    }),
    catchError((err)=> this.handlerError(err))
    )
  }

  acceptChanges(id: any): Observable<any>{
    let url = AUTH_API + 'active-rol/'+ id;
    return this.http.put(url, null).pipe(map((result:any) => {

      console.log(result);

    }),
    tap(() => {
      this._refresh$.next();
    }),
    catchError((err)=> this.handlerError(err))
    )
  }

  declineChanges(id: any): Observable<any>{
    let url = AUTH_API + 'active-rol/'+ id;
    return this.http.put(url, null).pipe(map((result:any) => {

      console.log(result);

    }),
    tap(() => {
      this._refresh$.next();
    }),
    catchError((err)=> this.handlerError(err))
    )
  }


  private handlerError(err:any): Observable<never> { //pasa error al login component
    if (err) {
      if (err.status === 500) {

        let title: string = ''
        let message: string = "Su Solicitud no Pudo ser Procesada Intente Nuevamente";
        this.modalService.OpenModalError2(ModalComponent, true, title, message);

      }
    }
    return throwError(err.error);
  }


  get roleAuthorizedEdit () {

    const roleAuthorized = [ 5 ];
    const userRole = sessionStorage.getItem('rol-user');
    const role = Number(userRole);

    if (roleAuthorized.includes(role)) return true;

    return false;
  }


}
