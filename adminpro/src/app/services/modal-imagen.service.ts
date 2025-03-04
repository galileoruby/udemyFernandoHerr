import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  private _ocultarModal: boolean = true;
  public tipo!: 'usuarios' | 'medicos' | 'hospitales';
  public id!: string;
  public imgActual: string | undefined = '';

  public nuevaImagen: EventEmitter<string> = new EventEmitter<string>;

  get ocultarModal() {
    return this._ocultarModal;
  }

  constructor() { }

  abrirModal(tipo: 'usuarios' | 'medicos' | 'hospitales',
    id: string,
    imgActual: string = 'no-image'
  ) {
    this.tipo = tipo;
    this.id = id;

    this._ocultarModal = false;

    if (imgActual?.includes('https')) {
      this.imgActual = imgActual;
    } else {
      this.imgActual = `${base_url}/upload/${tipo}/${imgActual}`
    }

  }

  cerrarModal() {
    this._ocultarModal = true;
  }

}