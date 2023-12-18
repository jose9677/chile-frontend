import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { ModalComponent } from 'src/app/public/auth/shared/modals/modal/modal.component';
import { ModalsService } from 'src/app/shared/services/modals.service';
import { environment } from 'src/environments/environment';
import { random } from 'underscore';

const AUTH_API = environment.urlApi;
const AUTH_API_NP = environment.urlApiNp;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class ApsManagementService {

  private errorMessage = '';


  constructor(
    private http: HttpClient,
    private modalService: ModalsService
  ) { }

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
    );
   }

  //  downloadDocumentAps(nameDocument: string): Observable<any | void> {
  //   return this.http.get<any>(AUTH_API_NP + 'aps-download/' + nameDocument, httpOptions).pipe(map((result: any) => {

  //     return AUTH_API_NP + 'aps-download/' + nameDocument;

  //   }),
  //   catchError((err) => this.handlerError(err))
  //   );
  //  }

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
