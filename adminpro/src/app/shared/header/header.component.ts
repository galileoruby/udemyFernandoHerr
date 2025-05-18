import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/models/usuario.model';

declare let $: any; //*****IMPORTANTE DECLARAR variable $
 
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  public usuario:Usuario= {} as Usuario;
  
  ngAfterViewInit(): void {
    //NOTA: esta funcion esta en el archivo "custom.js"
    $(".search-box a, .search-box .app-search .srh-btn").on('click', function () {
      $(".app-search").toggle(200);
    });
  }

  constructor(private usuarioService: UsuarioService, private router: Router) {
    // this.imgUrl = usuarioService.usuario.imagenUrl as string ;
    // this.email= usuarioService.usuario.email;
    this.usuario= this.usuarioService.usuario;
  }

  logOut() {
    this.usuarioService.logout();
    this.router.navigateByUrl('/login');
  }

  buscar(sQuery: string){
    console.log(sQuery);

    if (sQuery.trim() !=""){
      this.router.navigateByUrl(`/buscar/${sQuery}`);
    }
  }
}