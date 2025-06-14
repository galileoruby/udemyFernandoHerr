import { Component, OnInit } from '@angular/core';
import { MedicosService } from './medicos.service';

@Component({
  selector: 'app-medicos',
  template: `
    <p>
      medicos works!
    </p>
  `,
  styles: []
})
export class MedicosComponent implements OnInit {

  public medicos: any[] = [];
  public mensajeError: string;

  constructor(public _medicoService: MedicosService) {
    this.mensajeError = '';
  }

  ngOnInit() {
    const obs = this._medicoService.getMedicos();
    if (obs) {
      obs.subscribe(medicos => this.medicos = medicos);
    }
  }

  agregarMedico() {
    const medico = { nombre: 'Médico Juan Carlos' };

    const obs = this._medicoService.agregarMedico(medico);
    if (obs) {
      obs.subscribe({
        next: (medicoDb) => { this.medicos.push(medicoDb) },
        error: (error) => this.mensajeError = error,
        complete: () => console.log('completed')
      });
    }
  }

  borrarMedico(id: string) {
    const confirmar = confirm('Estas seguro que desea borrar este médico');
    if (confirmar) {
      this._medicoService.borrarMedico(id);
    }
  }
}
