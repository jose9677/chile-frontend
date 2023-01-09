import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

import { TokenService } from './token.service';

const TOKEN_HEADER_KEY = 'Authorization';


@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  constructor(
    private token: TokenService,
    public router: Router,
    ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let authReq = req;

    const accesToken = this.token.getToken();
    if (accesToken != null) {
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, `Bearer ${accesToken}`) });

    }
    // manejar error
    return next.handle(authReq).pipe(
      // retry(3),
      // delay(3000),
      catchError( this.error )
    );
  }

  error(error: HttpErrorResponse){ //envia error al user service
    // window.sessionStorage.clear();

    console.warn(error);

    // alert(error.error.error); // captura error

    return throwError(error.error)
  }
}
