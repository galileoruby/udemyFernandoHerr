import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { PagesRoutingModule } from './pages/pages.routing';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: '**', component: NopagefoundComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes),
    PagesRoutingModule
  ],

  //falto incluir el exports aquiiiii!
  exports: [RouterModule]
})
export class AppRoutingModule { }