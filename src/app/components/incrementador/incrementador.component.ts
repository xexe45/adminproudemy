import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef
} from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: []
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgress') txtProgress: ElementRef;

  @Input() progreso: number = 50; // se puede poner un nombre para manejarlo desde afuera
  @Input() leyenda: string = 'Leyenda';

  @Output() cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
    // console.log('leyenda: ', this.leyenda);
    // console.log('Progreso: ', this.progreso);
  }

  onChanges(newValue: number) {
    // const elementHTML: any = document.getElementsByName('progreso')[0];
    // console.log(this.txtProgress);
    if ( newValue >= 100 ) {
      this.progreso = 100;
    } else if ( newValue <= 0 ) {
      this.progreso = 0;
    } else {
      this.progreso = newValue;
    }
    // elementHTML.value = Number(this.progreso);
    this.txtProgress.nativeElement.value = this.progreso;
    this.cambioValor.emit(this.progreso);
    this.txtProgress.nativeElement.focus();
  }

  cambiarValor(valor: number) {
    if (this.progreso >= 100 && valor > 0) {
      this.progreso = 100;
      return;
    }

    if (this.progreso <= 0 && valor < 0) {
      this.progreso = 0;
      return;
    }
    this.progreso += valor;
    this.cambioValor.emit(this.progreso);
  }
}
