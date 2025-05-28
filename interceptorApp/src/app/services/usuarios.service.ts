import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) {

  }

  obtenerUsuarios() {

    const params = new HttpParams().set('page', 2);


    return this.http.get('https://reqres.inx/api/users', { params }).pipe(
      map((resp: any) => resp['data'])       

    );
  }



}
