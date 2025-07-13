import { NgModule } from '@angular/core';
import { provideRouter, RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { GotyComponent } from './pages/goty/goty.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';

const routes: Routes = [
  {path:'inicio', component:InicioComponent},
  {path:'goty', component:GotyComponent},
  { path:'**', pathMatch:'full' , redirectTo: 'inicio'}
];


bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
  {path:'inicio', component:InicioComponent},
  {path:'goty', component:GotyComponent},
  { path:'**', pathMatch:'full' , redirectTo: 'inicio'}
    ])
  ]
});

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
