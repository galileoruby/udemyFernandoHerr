import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { authGuard } from '../auth/login/guards/auth.guard';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimiento/usuarios/usuarios.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { HospitalesComponent } from './mantenimiento/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimiento/medicos/medicos.component';
import { MedicoComponent } from './mantenimiento/medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { adminGuard } from '../auth/login/guards/admin.guard';

const routes: Routes = [
    {
        path: '', component: PagesComponent,
        canActivate:[authGuard],
        children: [
            { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Settings::App' } },
            { path: 'buscar/:termino', component: BusquedaComponent ,data:{titulo:'Busqueda global::App'} },
            { path: 'dashboard', component: DashboardComponent ,data:{titulo:'dashboard::App'} },
            { path: 'grafica1', component: Grafica1Component ,data:{titulo:'graficos::App'} },
            { path: 'perfil', component: PerfilComponent ,data:{titulo:'perfiles de acero::App'} },
            { path: 'progress', component: ProgressComponent ,data:{titulo:'progreso::App'} },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
            
            //mantenimiento
            { path: 'hospitales', component: HospitalesComponent, data:{titulo:'Hospitales::App'} },
            { path: 'medicos', component: MedicosComponent, data:{titulo:'Medicos::App'} },
            { path: 'medico/:id', component: MedicoComponent, data:{titulo:'Medico para modificar::App'} },

            //rutas de admin
            //enviar en un arreglo los guards a implementar
            { path: 'usuarios', canActivate:[adminGuard], component: UsuariosComponent, data:{titulo:'Usuarios::App'} },
        ]
    },

    //{ path: 'path/:routeParam', component: MyComponent },
    //{ path: 'staticPath', component: ... },
    //{ path: '**', component: ... },
    //{ path: 'oldPath', redirectTo: '/staticPath' },
    //{ path: ..., component: ..., data: { message: 'Custom' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }