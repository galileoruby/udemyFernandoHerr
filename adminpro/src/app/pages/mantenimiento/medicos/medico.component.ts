import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { HospitalService } from 'src/app/services/hospital.service';
import { MedicoService } from 'src/app/services/medico.service';

import { HospitalResponseModel } from 'src/models/hospitalModelResponse';
import { MedicoColeccionResponseModel, MedicoSingleModel } from 'src/models/medicoColeccion.model';
import { MedicoPutModelBaseResponse } from 'src/models/medicoPutModelResponse';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
})
export class MedicoComponent implements OnInit {
  public medicoForm!: FormGroup;
  public hospitales: HospitalResponseModel[] = [];

  public hospitalSeleccionado!: HospitalResponseModel;
  public medicoSeleccionado!: MedicoColeccionResponseModel;
  private stringMedico: string = 'nuevo';

  constructor(private fb: FormBuilder,
    private hostpitalService: HospitalService,
    private medicoService: MedicoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
    .subscribe(({id})=>this.cargarMedicoId(id));

    this.medicoForm = this.fb.group({
      nombre: [, Validators.required],
      hospital: ['', Validators.required]
    });

    this.cargarHospitales(0);
    this.medicoForm.get('hospital')?.valueChanges.subscribe(hospitalId => {
    this.hospitalSeleccionado = this.hospitales.find(xx => xx.id === hospitalId)!;           
    });
  }

  cargarMedicoId(id:string){
    if (id===this.stringMedico){
      return ;
    }

    this.medicoService.obtenerMedicoPorId(id)
    .subscribe({
      next: ( response:MedicoSingleModel ) => {
        if (response.ok) {
          this.medicoSeleccionado = response.medico;
                
          const {nombre} = response.medico;
          console.log('ssss');

          let hospitalId  = response.medico.hospital?._id;
          
          if (!hospitalId){
            hospitalId= ''
          }
            
          this.medicoForm.setValue({nombre, hospital: hospitalId});
          
        } else {
          console.error('No se pudo cargar el médico');
        }
      },
      error: (err) => {
        console.error('Error al cargar médico:', err);
      }
    });
  }

  cargarHospitales(desde: number = 0) {
    this.hostpitalService.cargarHospitales(desde)
      .subscribe((res: HospitalResponseModel[]) => {
        this.hospitales = res;                       
        const idx =this.medicoForm.get('hospital')?.value;
        if (idx){
          this.hospitalSeleccionado = this.hospitales.find(xx => xx.id === idx)!;
        }
      });
  }

  guardarMedico(): void {    
    if (this.medicoSeleccionado){      
      const data = {
        ...this.medicoForm.value,
        id: this.medicoSeleccionado.id
      };

      this.medicoService.guardarMedico(data).subscribe(
        resp=>{
          Swal.fire({
            title: "¡Actualizado!",
            text: `medico actualizado ${resp.medico.nombre}`,
            icon: "success"
          });
          
          this.router.navigateByUrl(`/medico/${resp.medico.id}`);
        }
      )

    }else{            
      this.medicoService.crearMedico(this.medicoForm.value).subscribe(
        resp => {
          Swal.fire({
            title: "¡Creado!",
            text: `Medico Creado ${resp.medico.nombre}`,
            icon: "success"
          });          
          this.router.navigateByUrl(`/medico/${resp.medico.id}`);
        });
      
    }
  }
}