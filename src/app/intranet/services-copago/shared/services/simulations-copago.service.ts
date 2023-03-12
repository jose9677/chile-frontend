import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';
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
export class SimulationsCopagoService {

  private errorMessage = '';

  constructor(
    private http: HttpClient,
    private modalService: ModalsService
  ) { }

  addSimulation( rutUser: any, dataSimulation: any) {
    return this.http.post<any>( AUTH_API_NP + "add-simulation/" + rutUser, dataSimulation, httpOptions).pipe((map((result: any) => {
      return result
    })),
    catchError((err) => this.handlerError(err)))
  }

  addServicesSimulation(dataService: any) {
    return this.http.post<any>( AUTH_API_NP + "add-simulations-services", dataService, httpOptions ).pipe((map((result:any) => {
      return result;
    })),
    catchError((err) => this.handlerError(err))
    );
  }

  getRutSimulation(rutUser: any) {
    return this.http.get<any>( AUTH_API_NP + "details-certificate/" + rutUser, httpOptions ).pipe((map((result:any) => {
      return result;
    })),
    catchError((err) => this.handlerError(err))
    );
  }

  PDFCertificates(id: any) {
    return this.http.get<any>( AUTH_API_NP + "guard-card/" + id, httpOptions ).pipe((map((result:any) => {
      return result;
    })),
    catchError((err) => this.handlerError(err))
    );
  }

  getDataSimulation(idSimulation: any) {
    return this.http.get<any>( AUTH_API_NP + "details-copago/" + idSimulation, httpOptions ).pipe((map((result:any) => {
      return result;
    })),
    catchError((err) => this.handlerError(err))
    );
  }

  calcCopago(idSimulation: any) {
    return this.http.put<any>( AUTH_API_NP + "calc-copago/" + idSimulation, httpOptions ).pipe((map((result:any) => {
      return result;
    })),
    catchError((err) => this.handlerError(err))
    );
  }

  generateSimulation( idSimulation: any ) {
    return this.http.put<any>( AUTH_API_NP + "generate-simulation/" + idSimulation, httpOptions ).pipe((map((result:any) => {
      return result;
    })),
    catchError((err) => this.handlerError(err))
    );
  }

  cancelSimulation( idSimulation: any, idMotive: any) {
    return this.http.put<any>( AUTH_API_NP + "cancel-simulation/" + idSimulation + "/" + idMotive, httpOptions ).pipe((map((result:any) => {
      return result;
    })),
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
