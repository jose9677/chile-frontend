import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
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
export class ServiceCopagoService {

  private errorMessage = '';

  private listServicesCopago: any[];

  constructor(
    private http: HttpClient,
    private modalService: ModalsService
  ) {

    this.listServicesCopago = [];
   }

   addServices( codeService: any, idTypeService: any, nameTypeService: any, idService: any, nameService: any, amountServices: any) {
    this.listServicesCopago.push({"codeService": codeService ,"nameTypeService": nameTypeService, "idTypeService": idTypeService, "nameService": nameService, "idService": idService, "amountServices": amountServices})

   }

   getSetvices() {

    return this.listServicesCopago

   }

   getDataUser( rutNeighbor: any): Observable<any | void> {
    return this.http.get<any>( AUTH_API_NP + 'provider-user/' + rutNeighbor, httpOptions).pipe(map((result: any) => {
      return result
    }),
    catchError((err) => this.handlerError(err))
    );
   }

   getServicesCategories() {
    return this.http.get<any>( AUTH_API_NP + 'services-categories', httpOptions).pipe(map((result: any) => {
      return result
    }),
    catchError((err) => this.handlerError(err))
    );
   }


   updateServices(index: any) {

    this.listServicesCopago.splice(index, 1);

   }

   resetDataServices() {
    this.listServicesCopago = [];
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


