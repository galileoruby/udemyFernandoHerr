/// <reference types="@angular/localize" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { InicioComponent } from './app/pages/inicio/inicio.component';
import { GotyComponent } from './app/pages/goty/goty.component';


// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.error(err));



bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
  {path:'inicio', component:InicioComponent},
  {path:'goty', component:GotyComponent},
  { path:'**', pathMatch:'full' , redirectTo: 'inicio'}
    ])
  ]
});