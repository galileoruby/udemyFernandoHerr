import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';


//como hago que este servicio se transforme en un interceptor tengo que implementar
//importar de HttpInterceptor
@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {


  constructor() {

  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {



    const headers = new HttpHeaders({
      'x-api-key': 'reqres-free-v1',
      'x-galleta': 'gashetas tia rosa pandero'
    });


    const requestClone = req.clone({
      headers
    });


    console.log('interceptor;', req);
    return next.handle(requestClone).pipe(
      catchError(this.manejaError)
    )
  }

  manejaError(error: HttpErrorResponse) {

    return throwError(() => new Error('algo salioi8 feo' + error.message))
  }
}
