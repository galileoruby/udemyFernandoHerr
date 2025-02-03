import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'  
})
export class HeaderComponent {
  constructor(private usuarioService: UsuarioService,private router: Router ){}

  logOut(){
    this.usuarioService.logout();
    this.router.navigateByUrl('/login');
  }
}