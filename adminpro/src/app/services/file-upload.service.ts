import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  async actualizarFoto(archivo: File, tipo: 'usuarios' | 'medicos' | 'hospitales', id: string) {

    // const _e = {
    //   error: {
    //     msg: 'Error intencioanl'
    //   }
    // }
    // throw _e;

    try {

      const url = `${base_url}/upload/${tipo}/${id}`;
      const formData = new FormData();

      formData.append('imagen', archivo);

      const respuesta = await fetch(url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      })

      const data = await respuesta.json();
      
      return data;

    } catch (error) {
      console.log(error);
      return error;
    }
  }
}