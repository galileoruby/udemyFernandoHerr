import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap, catchError, of } from 'rxjs';

import { environment } from 'src/environments/environment';
import { MedicoColeccionBusquedaBaseResponseModel, MedicoColeccionBusquedaResponseModel } from 'src/models/medicoBusqueda.model';

const base_Url = environment.base_url;

export interface UsuarioResponse {
  nombre: string;
  email: string;
  img: string;
  id: string;
  role:string;
  google: boolean;
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
  buscar(tipo: 'medicos', termino?: string): Observable<MedicoColeccionBusquedaBaseResponseModel>;
  buscar(tipo: 'hospitales', termino?: string): Observable<Hospital[]>;

  buscar(tipo: 'usuarios' | 'medicos' | 'hospitales', termino: string = ''): Observable<any> {
    const url = `${base_Url}/todo/coleccion/${tipo}/${termino}`;
    console.log('busqueda');
    return this.http.get<RespuestaBusqueda<UsuarioResponse | MedicoColeccionBusquedaResponseModel | Hospital>>(url, this.headers)
      .pipe(
        map((resp: RespuestaBusqueda<UsuarioResponse | MedicoColeccionBusquedaResponseModel | Hospital>) => resp.query)
      );
  }
}