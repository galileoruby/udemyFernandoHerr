import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      titulo: 'Dashboard', icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Main', url: '/dashboard' },
        { titulo: 'ProgressBar', url: 'progress' },
        { titulo: 'Perfil', url: 'perfil' },
        // { titulo: 'Promesas', url: 'promesas' },
        // { titulo: 'rxjs---', url: 'rxjs' },
      ]
    },
    {
      titulo: 'Mantenimiento', 
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        { titulo: 'Usuarios', url: '/usuarios' },
        { titulo: 'Hospital', url: '/hospital' },
        { titulo: 'Medicos', url: '/medicos' }        
      ]
    }
  ];

  constructor() { }
}