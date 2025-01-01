import { NgModule  } from '@angular/core';
import {RouterModule} from '@angular/router'

import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';


//todo::Una cosa es importar rutas con const rutas: Routes 
//todo: otra cosa es importar el componente , considerar esto

@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent

  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent

  ],
  imports: [
    CommonModule,
    SharedModule,
    //todo:: sino importamos  el contenedor e los hijos mandara un error de <router-outlet> </router-outlet> invalido
    //todo:: o importar Router module
    // AppRoutingModule
    RouterModule
  ]
})
export class PagesModule { }