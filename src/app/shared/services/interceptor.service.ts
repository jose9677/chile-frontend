import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, finalize, Observable, throwError } from 'rxjs';
import { SpinnerService } from './spinner.service';

import { TokenService } from './token.service';

const TOKEN_HEADER_KEY = 'Authorization';


@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(
    private token: TokenService,
    private spinnerService: SpinnerService,
    public router: Router,
    ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.spinnerService.show();

    let authReq = req;

    const accesToken = this.token.getToken();
    if (accesToken != null) {
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, `Bearer ${accesToken}`) });

    }
    // manejar error
    return next.handle(authReq).pipe(

      finalize(() => this.spinnerService.hide()),
      // retry(3),
      // delay(3000),
      catchError( this.error )
    );
  }

  error(error: HttpErrorResponse){ //envia error al user service
    // window.sessionStorage.clear();

    console.warn(error);

    // alert(error.error.error); // captura error

    return throwError(error)
  }



}
