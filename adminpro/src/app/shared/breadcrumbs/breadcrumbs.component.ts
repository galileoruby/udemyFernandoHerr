import { Component, OnDestroy } from '@angular/core';
import {  Router, ActivationEnd } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { filter, map } from "rxjs/operators";

interface BreadcrumbData {
  titulo: string;
}

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})

export class BreadcrumbsComponent implements OnDestroy {
  tituloPagina: string = "";
  public titulo$!: Subscription;

  //todo:: parece ser que ActivatedRoute solo se acctiva sobre la primera visita 
  //todo:. esto es snapshot no se ajusta al ejercicio porque tiene hijos y es necesario navegar entre ellos.
  //private activaRuta: ActivatedRoute

  constructor(private router: Router ) {
    this.titulo$ = this.getExtraData()
      .subscribe(data => {        
        document.title = `AdminPro - ${data.titulo}`;
        this.tituloPagina= data.titulo;        
      })
  }

  ngOnDestroy(): void {
    this.titulo$.unsubscribe();
  }

  getExtraData(): Observable<BreadcrumbData> {
    return this.router.events
      .pipe(
        // Filtra solo eventos de tipo ActivationEnd
        filter((event): event is ActivationEnd => event instanceof ActivationEnd),
          // Filtra solo los ActivationEnd que no tienen hijos
          filter((event: ActivationEnd)=> event.snapshot.firstChild == null),
          map((event:ActivationEnd) => event.snapshot.data as BreadcrumbData)      
      );
  }
}