import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap, catchError, of } from 'rxjs';

import { environment } from 'src/environments/environment';

const base_Url = environment.base_url;

export interface UsuarioResponse {
  nombre: string;
  email: string;
  img: string;
  id: string;
  role:string;
  google: boolean;

}

interface Medico {
  id: string;
  nombre: string;
  especialidad: string;
  // Otras propiedades...
}

interface Hospital {
  id: string;
  nombre: string;
  direccion: string;
  // Otras propiedades...
}

interface RespuestaBusqueda<T> {
  ok: boolean;
  query: T[];
}

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  buscar(tipo: 'usuarios', termino?: string): Observable<UsuarioResponse[]>;
  buscar(tipo: 'medicos', termino?: string): Observable<Medico[]>;
  buscar(tipo: 'hospitales', termino?: string): Observable<Hospital[]>;

  buscar(tipo: 'usuarios' | 'medicos' | 'hospitales', termino: string = '') {
    const url = `${base_Url}/todo/coleccion/${tipo}/${termino}`;
    console.log('busqueda');
    return this.http.get<RespuestaBusqueda<UsuarioResponse | Medico | Hospital>>(url, this.headers)
      .pipe(
        map((resp: RespuestaBusqueda<UsuarioResponse | Medico | Hospital>) => resp.query)
      );
  }
}