import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { map, Observable, tap, catchError, of } from 'rxjs';

import RegisterForm from '../interfaces/register-form.interface';
import { environment } from 'src/environments/environment';
import LoginForm from '../interfaces/login-form.interface';
import { Usuario } from 'src/models/usuario.model';

const base_Url = environment.base_url;

declare const google: any;
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor(private http: HttpClient) { }

  public usuario: Usuario = {} as Usuario;

  logout() {
    localStorage.removeItem('token');
    // this.ngZone.run(()=>{    });
    google.accounts.id.revoke('immerzung@gmail.com', () => { });
  }

  googleInit() {
    gapi.load('auth2', () => {
    })
  }

  validarToken(): Observable<boolean> {
    return this.http.get(`${base_Url}/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map((resp: any) => {
        localStorage.setItem('token', resp.token);

        const {
          nombre,
          email,
          google,
          img = '',
          rol,
          id
        } = resp.usuario;

        this.usuario = new Usuario(nombre, email, '', google, img, rol, id);
        return true

      }), map(resp => true),
      catchError(error => {
        console.log(error);
        return of(false)
      })
    );
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get idusuario(): string {
    return this.usuario.uid || '';
  }

  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${base_Url}/usuarios`, formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token);
        })
      );
  }

  actualizarPerfil(data: { email: string, nombre: string, role: string }) {

    data = {
      ...data,
      role: this.usuario.role ?? ''
    }

    return this.http.put(`${base_Url}/usuarios/${this.idusuario}`, data, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      tap((res: any) => {
        this.usuario.nombre = res.usuario.nombre;
      }));
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