import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ActivationEnd, ActivatedRouteSnapshot, Data } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { filter, map } from "rxjs/operators";

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})

export class BreadcrumbsComponent implements OnDestroy {
  tituloPagina: string = "";
  public titulo$: Subscription;

  //todo:: parece ser que ActivatedRoute solo se acctiva sobre la primera visita 
  //todo:. esto es snapshot no se ajusta al ejercicio porque tiene hijos y es necesario navegar entre ellos.
  //private activaRuta: ActivatedRoute

  constructor(private router: Router ) {

    this.titulo$ = this.getExtraData()
      .subscribe(data => {
        this.tituloPagina = data.titulo;
        document.title = `AdminPro - ${data.titulo}`;

      })
  }
  ngOnDestroy(): void {
    this.titulo$.unsubscribe();
  }

  getExtraData(): Observable<Data> {
    return this.router.events
      .pipe(
        filter(event => event instanceof ActivationEnd),
        filter((event: ActivationEnd) => event.snapshot.firstChild === null),
        map((event: ActivationEnd) => event.snapshot.data)
      );
  }
}