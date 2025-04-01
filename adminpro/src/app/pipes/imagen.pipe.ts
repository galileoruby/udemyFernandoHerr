import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const api_url = environment.base_url;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {
  transform(img: string, tipo: 'usuarios' | 'medicos' | 'hospitales'): string {    
    let currentImg: string = `${api_url}/upload/usuarios/no-image`;

    if (!img) {
      return currentImg;
    } else if (img?.startsWith('https')) {
      return img;
    } else if (img) {
      return `${api_url}/upload/${tipo}/${img}`;
    }
    return currentImg;
  }

}