import { Component } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  //aqui cambio la propiedad pq los valores de usuario pasan como referencia, 
  // significa que donde haya sido cambiado aqui pasara y replicara el cambio
  // public  imgUrl:string = '';
  // public nombreUsuario:string= '';
  public usuario: Usuario;
  public currentName: string = "";
  public toggleIn: boolean = false;

  public hoverState: boolean = false;
  public clickState: boolean = false;

  public menuItems: any[] = [];
  constructor(private usuarioService: UsuarioService, private sideBar: SidebarService) {
    this.usuario = usuarioService.usuario;
    this.menuItems = sideBar.menu;
  }

  toggleMenu(nombre: string) {
    this.toggleIn = !this.toggleIn;
    console.log('toggle:', this.toggleIn, 'nombre:', nombre);
    this.currentName = nombre;
  }
 
  hoverMenu(state: boolean) {
    console.log('state:', state)
    this.hoverState = state;
  }
  
  toggleClick() {    
    this.clickState = !this.clickState;
  } 
}