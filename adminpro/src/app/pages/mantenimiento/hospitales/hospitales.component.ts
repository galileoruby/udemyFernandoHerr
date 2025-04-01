import { Component, OnDestroy, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { delay, map, Subscription, fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap ,filter,tap  } from 'rxjs/operators';

import Swal from 'sweetalert2';
import { HospitalService } from 'src/app/services/hospital.service';
import { HospitalResponseModel } from 'src/models/hospitalModelResponse';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import {  HospitalColeccionResponseModel } from 'src/models/hospitalColeccion.model';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html'

})
export class HospitalesComponent implements OnInit, OnDestroy, AfterViewInit {
  public hospitales: HospitalResponseModel[] = [];
  public cargando: boolean = true;
  public $imgSubs!: Subscription;

  @ViewChild('txtBusqueda', { static: true }) txtBusqueda!: ElementRef;

  constructor(
    private hospitalService: HospitalService,
    private modalImageService: ModalImagenService
  ) {}

  ngAfterViewInit(): void {
    fromEvent(this.txtBusqueda.nativeElement, 'keyup')
      .pipe(
        debounceTime(1200),
        map((event: any) => event.target.value as string),
        tap(value => {
          if (value.trim().length === 0) {
            // Si el valor es nulo o vacío, realiza una acción adicional
            // this.hospitales = []; // Limpia la lista de hospitales
            this.cargarHospitales();
            console.log('El valor de búsqueda está vacío'); // Opcional: muestra un mensaje
          }
        }),
        filter(value => value.trim().length > 0),
        distinctUntilChanged(),
        switchMap(((value:string) => this.hospitalService.buscarHospitales(value)))
      ).subscribe((resultados:HospitalColeccionResponseModel[]) => {        
        this.hospitales=resultados;
        });
  }

  ngOnDestroy(): void {
    this.$imgSubs.unsubscribe();    
  }

  ngOnInit(): void {
    this.cargarHospitales();
    this.$imgSubs = this.modalImageService.nuevaImagen
      .pipe(delay(150))
      .subscribe(res => {
        this.cargarHospitales();
      });
  }

  cargarHospitales(): void {
    this.cargando = true;
    this.hospitalService.cargarHospitales()
      .subscribe((hospitales) => {
        this.cargando = false;
        this.hospitales = hospitales;
      })
  }

  guardarCambios(hospital: HospitalResponseModel) {
    this.hospitalService.actualizarHospital(hospital.id, hospital.nombre)
      .subscribe(resp => {
        Swal.fire({
          title: "¡Actualizado!",
          text: `El hospital ha sido actualizado ${resp.hospital.nombre}`,
          icon: "success"
        });
      });
  }

  eliminarHospital(hospital: HospitalResponseModel) {
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
        this.hospitalService.eliminarHospital(hospital.id)
          .subscribe(res => {
            this.cargarHospitales();
            // Swal.fire({
            //   title: "¡Actualizado!",
            //   text: `Hospital eliminado`,
            //   icon: "success"
            // });
          });
      }
    });
  }

  async crearHospital() {
    const { value: nombreHospital } = await Swal.fire<string>({
      title: "Nuevo Hospital",
      input: "text",
      inputLabel: "Nombre del hospital",
      inputPlaceholder: "Introduce nombre del Hospital",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
    });
    if (nombreHospital && nombreHospital.trim().length > 0) {
      // Swal.fire(`Entered email: ${nombreHospital}`);

      this.hospitalService.crearHospital(nombreHospital)
        .subscribe((resp: any) => {
          // this.cargarHospitales();
          this.hospitales.push(resp.hospital)
        });
    }
  }

  abriModal(hospital: HospitalResponseModel) {
    this.modalImageService.abrirModal('hospitales', hospital.id, hospital.img);
  }

  buscar(termino: string) {  }
}