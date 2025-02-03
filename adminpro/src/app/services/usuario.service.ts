import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { map, Observable, tap, catchError ,of} from 'rxjs';

import RegisterForm from '../interfaces/register-form.interface';
import { environment } from 'src/environments/environment';
import LoginForm from '../interfaces/login-form.interface';

const base_Url = environment.base_url;

declare const google: any;
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor(private http: HttpClient
   ) { }

  logout(){
    localStorage.removeItem('token');
    // this.ngZone.run(()=>{    });
    google.accounts.id.revoke('immerzung@gmail.com', ()=>{    });
  }

  googleInit(){
    gapi.load('auth2', ()=>{

    })
  }

  validarToken():Observable<boolean> {
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${base_Url}/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      }),map(resp=>true),
      catchError(error=> of(false))
    );
  }

  crearUsuario(formData: RegisterForm) {    
    return this.http.post(`${base_Url}/usuarios`, formData)
      .pipe(
        tap((resp: any) => {          
          localStorage.setItem('token', resp.token);
        })
      );
  }

  login(formData: LoginForm) {    
    return this.http.post(`${base_Url}/login`, formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token);
        })
      );
  }

  loginGoogle(token: string) {
    return this.http.post(`${base_Url}/login/google`, { token })
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token);
        })
      );
  }
}