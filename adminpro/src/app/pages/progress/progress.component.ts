import { Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent {


  progreso1: number = 25;
  progreso2: number = 35;

  get porcentajeUno() {
    return `${this.progreso1}%`;
  }

  get porcentajeDos() {
    return `${this.progreso2}%`;
  }


  cambioValorHijo(nuevoValor: number) {
    console.log('cambio valor hioj', nuevoValor)

  }

}
