import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SidebarService implements OnInit {
  menu: any[] = [
    {
      titulo: 'Dashboard-', icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Main', url: '/dashboard' },
        { titulo: 'ProgressBar', url: 'progress' },
        { titulo: 'Graficas', url: 'grafica1' },
        { titulo: 'Promesas', url: 'promesas' },
        { titulo: 'rxjs---', url: 'rxjs' },
      ]
    }
  ];

  constructor() { }
  ngOnInit(): void { }

}