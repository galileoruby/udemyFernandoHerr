
import { Routes } from '@angular/router';
import { HospitalComponent } from 'src/app/intermedio2/hospital/hospital.component';


export const Rutas: Routes = [
    { path: 'hospital', component: HospitalComponent },
    { path: 'medico/:id', component: HospitalComponent }
];