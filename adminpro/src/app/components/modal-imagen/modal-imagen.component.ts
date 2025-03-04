import { Component } from '@angular/core';
import Swal from 'sweetalert2';

import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styleUrls: ['./modal-imagen.component.css']
})
export class ModalImagenComponent {

  public imagenSubir: File | null = null;
  private hasInteracted = false;
  public imgTemp: any;

  constructor(public modalImagenService: ModalImagenService,
    private uploadService: FileUploadService

  ) { }

  cerrarModal() {
    this.imgTemp = null;
    this.modalImagenService.cerrarModal();
  }

  cambiarImagen(evento: Event) {
    const imagen = evento.target as HTMLInputElement;

    if (imagen.files && imagen.files.length > 0) {
      const imagenEnviar = imagen.files[0];
      this.imagenSubir = imagenEnviar;
      const reader = new FileReader();
      reader.onloadend = () => {
        this.imgTemp = reader.result;
      }
      reader.readAsDataURL(imagenEnviar);
    } else if (this.hasInteracted) {
      this.imgTemp = null;
      this.imagenSubir = null;
      console.log('El usuario cancelo este pedo.')
    }
  }

  onInputClick(event: Event) {
    this.hasInteracted = true;
  }

  subirImagen() {
    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;

    this.uploadService
      .actualizarFoto(this.imagenSubir as any, tipo, id as string)
      .then(data => {
        if (!data.ok) {
          Swal.fire('Error', data.msg, 'error');
          this.cerrarModal();
          return;
        }
        Swal.fire('Guardada', 'Imagen actualizad', 'success');
        this.modalImagenService.nuevaImagen.emit(data.msg);
        this.cerrarModal();
      }).catch((e) => {
        Swal.fire('Error', e.error.msg, 'error');
      });
  }
}