import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { delay, map, Subscription, fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, filter, tap } from 'rxjs/operators';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { MedicoColeccionBusquedaBaseResponseModel } from 'src/models/medicoBusqueda.model';
import { MedicoColeccionResponseModel } from 'src/models/medicoColeccion.model';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: `./medicos.component.html`,
  styleUrls: ['./medicos.component.css']
})

export class MedicosComponent implements OnInit, OnDestroy {


  public medicos: MedicoColeccionResponseModel[] = [];
  public cargando: boolean = true;
  @ViewChild('txtBusqueda', { static: true }) txtBusqueda!: ElementRef;
  public $imgSubs!: Subscription;

  constructor(
    private medicoService: MedicoService,
    private modalImageService: ModalImagenService
  ) {}

  ngOnDestroy(): void {
    this.$imgSubs.unsubscribe();
  }

  ngAfterViewInit(): void {
    fromEvent(this.txtBusqueda.nativeElement, 'keyup')
      .pipe(
        debounceTime(2500),
        map((event: any) => event.target.value as string),
        tap(value => {
          if (value.trim().length === 0) {
            // Si el valor es nulo o vacío, realiza una acción adicional
            // this.hospitales = []; // Limpia la lista de hospitales
            this.cargarMedicos();
            console.log('El valor de búsqueda está vacío'); // Opcional: muestra un mensaje
          }
        }),
        filter(value => value.trim().length > 0),
        distinctUntilChanged(),
        switchMap(((value: string) => 
          this.medicoService.buscarMedicos(value)))
        //corregir esto cuanto antes
      ).subscribe((resultados: any) => {
        console.log(resultados);
        this.medicos = resultados;
      });
  }

  ngOnInit(): void {

    this.cargarMedicos();

    this.$imgSubs = this.modalImageService.nuevaImagen
      .pipe(delay(150))
      .subscribe(res => {
        this.cargarMedicos();
      });
  }

  cargarMedicos() {
    this.cargando = true;
    this.medicoService.cargarMedicos().subscribe(
      resp => {
        this.medicos = resp;
        this.cargando = false;
      }
    )
  }

  abriModal(medico: MedicoColeccionResponseModel) {
    this.modalImageService.abrirModal('medicos', medico.id, medico.img);
  }

  guardarCambios(medico: MedicoColeccionResponseModel) {
      this.medicoService.guardarMedico(medico)
        .subscribe(resp => {
          Swal.fire({
            title: "¡Actualizado!",
            text: `El hospital ha sido actualizado ${medico.nombre}`,
            icon: "success"
          });
        });
    }


  eliminarMedico(id: string) {
    Swal.fire({
      title: "¿Estas seguro de borrar este registro?",
      text: "Este cambio no se puede revertir",
      icon: "warning",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si Borrar!",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicoService.eliminarMedico(id)
          .subscribe(res => {
            this.cargarMedicos();
          });
      }
    });
  }

}