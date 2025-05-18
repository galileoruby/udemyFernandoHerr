import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { MedicoGlobalModel } from 'src/models/medicoGlobal.model';
import { UsuarioGlobalModel } from 'src/models/usuarioGlobal.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {

  public usuarios: UsuarioGlobalModel[]=[];
  public medicos: MedicoGlobalModel[]=[];
  public hospitales: UsuarioGlobalModel[]=[];

  constructor(
    private activateRoute: ActivatedRoute,
    private busquedaService: BusquedasService,
    private router: Router
  ){
  }
  ngOnInit(): void {
     this.activateRoute.params.subscribe(({termino})=>this.busquedaGlobal(termino));
  }

  busquedaGlobal(termino: string){
    this.busquedaService.busquedaGlobal(termino)
    .subscribe((resp: any)=>{
      this.usuarios= resp.usuarios;
      this.medicos= resp.medicos;
      this.hospitales= resp.hospitales;
    })
  }

  abrirMedico(medico: MedicoGlobalModel){
    console.log(medico);     
    this.router.navigateByUrl(`medico/${medico.id}`)
  }
}