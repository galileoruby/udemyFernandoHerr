import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/models/usuario.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html'
})
export class PerfilComponent implements OnInit {

  public perfilForm: FormGroup;
  public usuario: Usuario;
  public imagenSubir: File | null = null;
  public imgTemp: any;

  private hasInteracted = false;

  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private uploadService: FileUploadService
  ) {

    this.usuario = usuarioService.usuario;
    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required] as unknown as string,
      email: [this.usuario.email, [Validators.required, Validators.email]]
    });
  }


  onInputClick(event: Event) {
    this.hasInteracted = true;
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

  ngOnInit(): void { }

  actualizarPerfil() {
    this.usuarioService.actualizarPerfil(this.perfilForm.value)
      .subscribe(({
        next: (v) => {
          const { nombre, email } = this.perfilForm.value;
          this.usuario.nombre = nombre;
          this.usuario.email = email;

          Swal.fire('Guardar', 'Guardado exitosamente', 'info');
        },
        error: (e) => {
          Swal.fire('Error', e.error.msg, 'error');
        },
        complete: () => { }
      }));
  }

  subirImagen() {
    this.uploadService
      .actualizarFoto(this.imagenSubir as any, "usuarios", this.usuario.uid as string)
      .then(data => {
        if (!data.ok) {
          Swal.fire('Error',  data.msg, 'error');
          return;
        }       
        this.usuario.img = data.nombreArchivo;
        Swal.fire('Guardada', 'Imagen actualizad', 'success');
      }).catch((e) => {
        Swal.fire('Error', e.error.msg, 'error');
      })
  }
}