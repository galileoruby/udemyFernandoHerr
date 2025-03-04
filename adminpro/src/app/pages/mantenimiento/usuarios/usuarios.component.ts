import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay, map, Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { BusquedasService, UsuarioResponse } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';

import { Usuario } from 'src/models/usuario.model';
import { CargarUsuarios } from 'src/app/interfaces/cargar-usuarios.interface';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})

export class UsuariosComponent implements OnInit, OnDestroy {

  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public desde: number = 0;
  public cargando: boolean = true;
  public usuarioCurrent!: Usuario;
  public $imgSubs!: Subscription;

  constructor(private usuarioService: UsuarioService,
    private busquedaservice: BusquedasService,
    private modalImagenService: ModalImagenService
  ) {
    this.usuarioCurrent = this.usuarioService.usuario;
  }

  ngOnDestroy(): void {
    this.$imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.cargarUsuario();

    this.$imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(150))
      .subscribe(res => {
        this.cargarUsuario();
      });
  }


  cargarUsuario() {
    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.desde)
      .subscribe((resp: CargarUsuarios) => {

        this.totalUsuarios = resp.total;
        this.usuarios = resp.usuarios;
        this.usuariosTemp = resp.usuarios;

        this.cargando = false;
      });
  }

  cambiarPagina(pagina: number) {
    this.desde += pagina;

    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde > this.totalUsuarios) {
      this.desde -= pagina;
    }
    this.cargarUsuario();
  }

  buscar(termino: string) {

    if (termino.length === 0) {
      this.usuarios = this.usuariosTemp;
      return;
    }

    this.busquedaservice.buscar('usuarios', termino)
      .pipe(
        map(response => response.map(usuarioApi => this.transformaApiusuario(usuarioApi))
        ))
      .subscribe(resp => {
        this.usuarios = resp
      });
  }


  private transformaApiusuario(usuarioApi: UsuarioResponse): Usuario {
    return new Usuario(usuarioApi.nombre, usuarioApi.email, '', usuarioApi.google, usuarioApi.img, usuarioApi.role, usuarioApi.id);
  }

  eliminarUsuario(usuario: Usuario) {
    if (usuario.id == this.usuarioService.idusuario) {
      Swal.fire({
        title: "Accion no completada",
        text: `No puede borrar eseusuario`,
        icon: "question"
      });
      return;
    }

    Swal.fire({
      title: "¿Estas seguro?",
      text: `Usuario a borrar ${usuario.nombre}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Borarlo!"
    }).then((result) => {
      if (result.isConfirmed) {

        this.usuarioService.eliminarUsuario(usuario).subscribe((res) => {

          this.cargarUsuario();
          Swal.fire({
            title: "Borrado!",
            text: `El usuario ${usuario.nombre}  borraado`,
            icon: "success"
          });
        })
      }
    });

  }

  cambiarRol(currentUsuario: Usuario): void {
    this.usuarioService.guardarUsuario(currentUsuario)
      .subscribe(resp => {
        console.log(resp)
      });
  }

  abrirModal(usuario: Usuario) {
    console.log(usuario);
    this.modalImagenService.abrirModal('usuarios', usuario.id!, usuario.img);
  }
}