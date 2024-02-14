import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, catchError, map, tap, throwError } from 'rxjs';
import { ModalComponent } from 'src/app/public/auth/shared/modals/modal/modal.component';
import { ModalsService } from 'src/app/shared/services/modals.service';
import { environment } from 'src/environments/environment';

const AUTH_API = environment.urlApi;
const AUTH_API_NP = environment.urlApiNp;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class ApsManagementService {

  private _refresh$= new Subject<void>();

  private errorMessage = '';

  private isUpdateList: BehaviorSubject<boolean>;

  private viewTitle: BehaviorSubject<string>;



  constructor(
    private http: HttpClient,
    private modalService: ModalsService
  ) {
    this.isUpdateList = new BehaviorSubject<boolean>(false);
    this.viewTitle = new BehaviorSubject<string>(' ');
  }

  get refresh$(){
    return this._refresh$;
 }

  get statusUpdateNewListObservable(): Observable<boolean> {
    return this.isUpdateList.asObservable();
  }

  get statusUpdateNewListValue(): boolean {
    return this.isUpdateList.getValue();
  }

  set isUpdateNewList(status : boolean) {
    this.isUpdateList.next(status)

  }

  get viewTitleObservable(): Observable<string> {
    return this.viewTitle.asObservable();
  }

  set newViewTitle(title: any) {

    this.viewTitle.next(title);

  }


  getLatestApsUpdate(): Observable<any | void> {
    return this.http.get<any>( AUTH_API_NP + 'last-aps', httpOptions).pipe(map((result: any) => {
      return result[0];
    }),
    catchError((err) => this.handlerError(err))
    );
   }

   getAllAps(): Observable<any | void> {
    return this.http.get<any>( AUTH_API_NP + 'aps-historic', httpOptions).pipe(map((result: any) => {
      return result;
    }),
    catchError((err) => this.handlerError(err))
    );
   }

   updateAps( newListAps: any ): Observable<any | void> {

    return this.http.post<any>( AUTH_API_NP + 'import-aps', newListAps).pipe(map((result: any) => {
      return result;
    }),
    catchError((err) => this.handlerError(err))
    ).pipe(
      tap(()=>{
        this._refresh$.next();
      })
    );
   }

   statusOfProcess(): Observable<any | void> {
    return this.http.get<any>( AUTH_API_NP + 'process-aps', httpOptions).pipe(map((result: any) => {

      return result;
    }),
    catchError((err) => this.handlerError(err))
    );
   }

  downloadDocumentAps( nameDocument: any) {
    const urlDownload = `${AUTH_API_NP}aps-download/${nameDocument}`;
    return urlDownload;
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
