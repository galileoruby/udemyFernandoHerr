import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  public usuario:Usuario= {} as Usuario;
  
  // public imgUrl: string = '';
  // public email: string = '';

  constructor(private usuarioService: UsuarioService, private router: Router) {
    // this.imgUrl = usuarioService.usuario.imagenUrl as string ;
    // this.email= usuarioService.usuario.email;
    this.usuario= this.usuarioService.usuario;
  }

  logOut() {
    this.usuarioService.logout();
    this.router.navigateByUrl('/login');
  }
}