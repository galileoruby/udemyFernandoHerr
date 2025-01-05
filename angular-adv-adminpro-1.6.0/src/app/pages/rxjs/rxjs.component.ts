import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription, interval, of, throwError } from 'rxjs';
import { retry, take, map, mergeMap, filter } from "rxjs/operators";


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements  OnDestroy {

  public intervalSubs: Subscription;

  constructor() {

    // this.retornaObservable()
    //   .pipe(
    //     retry(1)
    //   )
    //   .subscribe(
    //     valor => console.log('subs:', valor),
    //     e => {
    //       console.warn('algun error aqui', e);          
    //     },
    //     () => console.info('obs terminado')
    //   );


    this.intervalSubs = this
      .retornaIntervalo()
      .subscribe(console.log);
  }

  retornaIntervalo(): Observable<number> {
    const internal$ = interval(1500)
      .pipe(
        // take(13),
        map(valor => valor + 1),
        filter(valor => valor % 2 === 0),
        // mergeMap(valor => {
        //   if (valor === 3) {
        //     return throwError(() => new Error('Error: El valor es igual a 3'));
        //   }
        //   return of(valor);
        // })
      );
    return internal$;
  }


  retornaObservable(): Observable<number> {
    let i = -1;
    const observable$ = new Observable<number>(observer => {

      let intentos = 0;
      const interval = setInterval(() => {
        i++;
        observer.next(i)

        if (i === 10) {
          clearInterval(interval);
          observer.complete();
        }

        if (i === 5) {

          intentos++
          observer.error('tiempo excedido en intentos: ' + intentos.toString());
        }

      }, 1300);
    });

    return observable$;

  }


  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }
}