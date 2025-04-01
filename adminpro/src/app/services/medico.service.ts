import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap, catchError, of } from 'rxjs';

import { environment } from 'src/environments/environment';
import { MedicoColeccionModel, MedicoColeccionResponseModel, MedicoSingleModel } from 'src/models/medicoColeccion.model';
import { BusquedasService } from './busquedas.service';
import { MedicoPutModelResponse } from 'src/models/medicoPutModelResponse';

const base_Url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  constructor(private http: HttpClient,
    private busquedaService: BusquedasService
  ) { }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  cargarMedicos() {
    const url = `${base_Url}/medicos`;
    return this.http.get<MedicoColeccionModel>(url, this.headers)
      .pipe(
        map((resp: MedicoColeccionModel) => resp.medicos)
      );
  }

  buscarMedicos(sQuery: string) {
    const url = `${base_Url}/medicos`;
    return this.busquedaService.buscar('medicos', sQuery);
  }

  guardarMedico(medico:MedicoColeccionResponseModel){
     const url = `${base_Url}/medicos/${medico.id}`;
        return this.http.put<MedicoPutModelResponse>(url, medico, this.headers)
          .pipe(
            map((resp) => resp)
          );
  }

  crearMedico(medico:{nombre:string, hospital:string}){
     const url = `${base_Url}/medicos`;
        return this.http.post<MedicoPutModelResponse>(url, medico, this.headers)
          .pipe(
            map((resp) => resp)
          );
  }

  obtenerMedicoPorId(id:string): Observable<MedicoSingleModel>  {
    const url = `${base_Url}/medicos/${id}`;
    return this.http.get<MedicoSingleModel>(url, this.headers);
  }

  eliminarMedico(id: string) {
    const url = `${base_Url}/medicos/${id}`;
    return this.http.delete<{ ok: boolean, msg: string }>(url, this.headers)
      .pipe(
        map((resp: any) => resp)
      );
  }
}