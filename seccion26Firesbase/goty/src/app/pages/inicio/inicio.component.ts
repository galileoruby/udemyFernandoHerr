import { Component } from '@angular/core';
import { GraficoBarraHorizontalComponent } from 'src/app/components/grafico-barra-horizontal/grafico-barra-horizontal.component';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  standalone : true,
  imports:[ GraficoBarraHorizontalComponent]
})
export class InicioComponent {

}
