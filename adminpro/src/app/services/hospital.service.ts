import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map} from 'rxjs';

import { environment } from 'src/environments/environment';
import { HospitalColeccionModel } from 'src/models/hospitalColeccion.model';

import { HospitalBaseResponseModel } from 'src/models/hospitalModelResponse';
import { hospitalPostModelResponse } from 'src/models/hospitalPostModelResponse';
import { hospitalPutModelResponse } from 'src/models/hospitalPutModelResponse';

const base_Url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  constructor(
    private http: HttpClient) { }

  cargarHospitales(desde: number = 0) {
      const url = `${base_Url}/hospitales`;
      return this.http.get<HospitalBaseResponseModel>(url, this.headers)
        .pipe(
          map((resp: HospitalBaseResponseModel) => resp.hospitales)
        );
  }

  crearHospital(nombre: string) {
    const url = `${base_Url}/hospitales`;
    return this.http.post<hospitalPostModelResponse>(url, { nombre }, this.headers)
      .pipe(
        map((resp) => resp)
      );
  }

  actualizarHospital(id: string, nombre: string) {
    const url = `${base_Url}/hospitales/${id}`;
    return this.http.put<hospitalPutModelResponse>(url, { nombre }, this.headers)
      .pipe(
        map((resp) => resp)
      );
  }

  eliminarHospital(id: string) {
    const url = `${base_Url}/hospitales/${id}`;
    return this.http.delete<{ ok: boolean, msg: string }>(url, this.headers)
      .pipe(
        map((resp: any) => resp)
      );
  }

  buscarHospitales(predicado: string) {
    // .map(usr => new Usuario(usr.nombre, usr.email, usr.password, usr.google, usr.img, usr.rol, usr.id));
    const url = `${base_Url}/todo/coleccion/hospitales/${predicado}`;
    return this.http.get<HospitalColeccionModel>(url, this.headers)
      .pipe(
        map((resp: HospitalColeccionModel) => resp.query)
      );
  }
  
  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }
}