import { NgModule  } from '@angular/core';
import {RouterModule} from '@angular/router'
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';

import { ComponentsModule } from '../components/components.module';
import { PerfilComponent } from './pages/perfil/perfil.component';


//todo::Una cosa es importar rutas con const rutas: Routes 
//todo: otra cosa es importar el componente , considerar esto

@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    PerfilComponent,
    
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
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    ComponentsModule
  ]
})
export class PagesModule { }