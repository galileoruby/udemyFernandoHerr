import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { GraficoBarraHorizontalComponent } from './grafico-barra-horizontal/grafico-barra-horizontal.component';

// import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    // NavbarComponent,
    // GraficoBarraHorizontalComponent
  ],
  exports:[
    // NavbarComponent,
    // GraficoBarraHorizontalComponent
  ],
  imports: [
    //ng if , ng for , componente propio de angular para usar esas directivfas
    CommonModule,
    // NgbNavModule,
    RouterModule
  ]
})
export class ComponentsModule { }
