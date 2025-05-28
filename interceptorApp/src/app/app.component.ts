import { Component, OnInit } from '@angular/core';
import { UsuariosService } from './services/usuarios.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'interceptorApp';


  constructor(public usuarioService: UsuariosService) {

    this.obtenerUsuario();

  }

  public obtenerUsuario() {
    this.usuarioService.obtenerUsuarios().
      subscribe({
        next: (dat) => { console.log(dat) },
        error: (err) => { console.log('patuiqo:', err) },
        complete: () => { console.log('finalizado') }
      }


      )
  }

  ngOnInit(): void {


  }
}
