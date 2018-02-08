import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {
  watcher: Subscription;

  constructor() {

    this.watcher = this.observador()
    .subscribe(
      numero => console.log('Subs', numero),
      error => console.error('Error en el obs', error),
      () => console.log('El observador terminó')
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.watcher.unsubscribe();
    console.log('La página se va a cerrar');
  }

  observador(): Observable<any> {
    return new Observable( observer => {
     let contador = 0;
      const intervalo = setInterval(() => {
        contador += 1;
        const salida = {
          valor: contador,
        };
        observer.next(salida);
        /*
        if ( contador === 3 ) {
          clearInterval(intervalo);
          observer.complete();
        }

        if ( contador === 2 ) {
          // clearInterval(intervalo);
          observer.error('Auxilio');
        }
        */
      }, 500);
    })
    .retry(2)
    .map( (resp: any) => {
      return resp.valor;
    })
    .filter( (valor, index)  => {
      if ( valor % 2 === 1 ) {
        // impar
        return true;
      } else {
        // par
        return false;
      }
    });
  }

}
