import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { map, Observable, tap, catchError, of } from 'rxjs';

import RegisterForm from '../interfaces/register-form.interface';
import { environment } from 'src/environments/environment';
import LoginForm from '../interfaces/login-form.interface';
import { Usuario } from 'src/models/usuario.model';
import { CargarUsuarios } from '../interfaces/cargar-usuarios.interface';

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
    // google.accounts.id.revoke('immerzung@gmail.com', () => { });

    //todo:. borrar menu
    localStorage.removeItem('menu');
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  get role() : 'ADMIN_ROLE' | 'USER_ROLE' | undefined{
    return this.usuario.rol  ?? 'USER_ROLE';
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
        // localStorage.setItem('token', resp.token);
        // localStorage.setItem('menu', resp.menu);

        this.guardarLocalStorage(resp.token,resp.menu);

        const {
          nombre,
          email,
          google,
          img = '',
          rol,
          id
        } = resp.usuario;

        this.usuario = new Usuario(nombre, email, '', google, img, rol, id);
        return true;
      }), map(resp => true),
      catchError(error => {
        console.log(error);
        return of(false);
      })
    );
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get idusuario(): string {
    return this.usuario.id || '';
  }

  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${base_Url}/usuarios`, formData)
      .pipe(
        tap((resp: any) => {
          // localStorage.setItem('token', resp.token);
          // localStorage.setItem('menu', resp.menu);
          this.guardarLocalStorage(resp.token,resp.menu);
        })

      );
  }
  
  actualizarPerfil(data: { email: string, nombre: string, rol: string }) {
    data = {
      ...data,
      rol: this.usuario.rol!
    }

    return this.http.put(`${base_Url}/usuarios/${this.idusuario}`, data,
      this.headers
    ).pipe(
      tap((res: any) => {
        this.usuario.nombre = res.usuario.nombre;
      }));
  }

  login(formData: LoginForm) {
    return this.http.post(`${base_Url}/login`, formData)
      .pipe(
        tap((resp: any) => {
          // localStorage.setItem('token', resp.token);
          // localStorage.setItem('menu', resp.menu);
          this.guardarLocalStorage(resp.token,resp.menu);
        })
      );
  }

  loginGoogle(token: string) {
    return this.http.post(`${base_Url}/login/google`, { token })
      .pipe(
        tap((resp: any) => {
          // localStorage.setItem('token', resp.token);
          // localStorage.setItem('menu', resp.menu);
          this.guardarLocalStorage(resp.token,resp.menu);
        })
      );
  }

  cargarUsuarios(desde: number = 0) {

    const url = `${base_Url}/usuarios?desde=${desde}`;
    return this.http.get<CargarUsuarios>(url, this.headers)
      .pipe(

        map(resp => {
          console.log('ssss');
          const usuarios = resp.usuarios
            .map(usr => new Usuario(usr.nombre, usr.email, usr.password, usr.google, usr.img, usr.rol, usr.id));

          return {
            total: resp.total,
            usuarios
          };
        })
      )
  }

  eliminarUsuario(usuario:Usuario){
    const url = `${base_Url}/usuarios/${usuario.id}`;
    return this.http.delete(url, this.headers);

  }

  guardarUsuario(usuario: Usuario) {
    return this.http.put(`${base_Url}/usuarios/${usuario.id}`, usuario,
      this.headers
    ).pipe(
      tap((res: any) => {
        this.usuario.nombre = res.usuario.nombre;
      }));
  }

  guardarLocalStorage(token:string, menu: any){
    localStorage.setItem('token', token);
    localStorage.setItem('menu',JSON.stringify(menu));
  }
}