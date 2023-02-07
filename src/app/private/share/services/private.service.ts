import { Injectable, Pipe } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { catchError, map, Observable, throwError, Subject, pipe } from 'rxjs';
import { tap } from 'rxjs/operators';


import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { LoggedService } from 'src/app/shared/services/logged.service';
import { TokenService } from 'src/app/shared/services/token.service';
import { ModalsService } from 'src/app/shared/services/modals.service';
import { ModalComponent } from 'src/app/public/auth/shared/modals/modal/modal.component';

const AUTH_API = environment.urlApi;
const AUTH_API_NP = environment.urlApiNp;
const TOKEN_KEY = 'access_token';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class PrivateService {


  private errorMessage = '';
  public rutUser:any
  private _refresh$ = new Subject<void>();

  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenService: TokenService,
    public loggedService: LoggedService,
    private modalService: ModalsService
    ) { }

    get refresh$(){
      return this._refresh$;
    }

    roles(): Observable<any>{
      return this.http.get<any>( AUTH_API_NP + 'details-roles', httpOptions).pipe(map((result:any) => {

        return result

      }),
      catchError((err)=> this.handlerError(err))
      );
    }
    ActivarRol(id: any): Observable<any>{
      let url = AUTH_API_NP + 'active-rol/'+ id;
      return this.http.put(url, null).pipe(map((result:any) => {

      }),
      tap(() => {
        this._refresh$.next();
      }),
      catchError((err)=> this.handlerError(err))
      )
      
    }

    desactivarRol(rol: any): Observable<any>{
      let url = AUTH_API_NP + 'desactive-rol/'+ rol;
      return this.http.put(url, null).pipe(map((result:any) => {

        console.log('Rol desactivado', result);

      }),
      tap(() => {
        this._refresh$.next();
      }),
      catchError((err)=> this.handlerError(err))
      )
      
    }

  register(dataUser: any): Observable<any>{
    return this.http.post( AUTH_API + 'registerEmployee', dataUser, httpOptions).pipe(map((result:any) => {

      console.log('Register_User-Res->', result);

    }),
    tap(() => {
      this._refresh$.next();
    }),
    catchError((err)=> this.handlerError(err))
    );
  }

  actualizarUser(dataUser: any, rut:any): Observable<any>{
    let url = AUTH_API_NP + 'update-employee/'+rut;
    return this.http.put(url, dataUser).pipe(map((result:any) => {

      console.log('user Actualizado', result);

    }),
    tap(() => {
      this._refresh$.next();
    }),
    catchError((err)=> this.handlerError(err))
    );

  }

  datosUser(rutUser:any): Observable<any>{
    let url = AUTH_API_NP + 'search-user/'+ rutUser;
    return this.http.get<any>(url, httpOptions).pipe(map((result:any) => {

      console.log(result)

      return result

    }),
    catchError((err)=> this.handlerError(err))
    );
  }

  verAsistentes(rut:any): Observable<any>{
    let url=AUTH_API_NP + 'assistant-list/'+ rut
    return this.http.get<any>(url, httpOptions).pipe(map((result:any) => {

      return result

    }),
    catchError((err)=> this.handlerError(err))
    );
  }


  verUsuarios(): Observable<any>{
    return this.http.get<any>( AUTH_API_NP + 'details-assistants-and-supervisors', httpOptions).pipe(map((result:any) => {

      return result

    }),
    catchError((err)=> this.handlerError(err))
    );
  }

  verTodosLosUsuarios(): Observable<any>{
    return this.http.get<any>( AUTH_API_NP + 'details-user', httpOptions).pipe(map((result:any) => {

      return result

    }),
    catchError((err)=> this.handlerError(err))
    );
  }

  supervisor(): Observable<any>{
    return this.http.get<any>( AUTH_API_NP + 'detailsSupervisor', httpOptions).pipe(map((result:any) => {

      return result

    }),
    catchError((err)=> this.handlerError(err))
    );
  }

  ActivarUser (rutUser: any): Observable<any>{
    let url = AUTH_API_NP + 'active-user/'+ rutUser;
    return this.http.put(url, null).pipe(map((result:any) => {

      console.log('user Activado', result);

    }),
    tap(() => {
      this._refresh$.next();
    }),
    catchError((err)=> this.handlerError(err))
    )
    
  }


  desactivarUser(rutUser: any): Observable<any>{
    let url = AUTH_API_NP + 'desactive-user/'+ rutUser;
    return this.http.put(url, null).pipe(map((result:any) => {

      console.log('user desactivado', result);

    }),
    tap(() => {
      this._refresh$.next();
    }),
    catchError((err)=> this.handlerError(err))
    )    
  }

  uploadFiles(fileData: File, rutUser: any): Observable<any>{
    console.log(fileData);

    const formfileData = new FormData();


    formfileData.append('profile_pic', fileData);

    console.log(FormData);

    return this.http.post( AUTH_API_NP + 'profile-pic/' + rutUser , formfileData).pipe(map((result:any) => {

      return result

    }),
    tap(() => {
      this._refresh$.next();
    }),
    catchError((err)=> this.handlerError(err))
    );
  }


  addSupervisor(rutUser: any, dataUser: any): Observable<any>{
    return this.http.post( AUTH_API_NP + 'add-supervisor/' + rutUser , dataUser, httpOptions).pipe(map((result:any) => {

      return result;

    }),
    tap(() => {
      this._refresh$.next();
    }),
    catchError((err)=> this.handlerError(err))
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
    console.log(this.errorMessage);

    return throwError(this.errorMessage)
  }
}

