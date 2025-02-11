import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';


@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html'
})
export class IncrementadorComponent implements OnInit {
  public incrementadorForm: FormGroup;

  constructor(private fb: FormBuilder) {

    // this.numericInputControl.valueChanges
    //   .pipe(
    //     debounceTime(500),
    //     distinctUntilChanged(),
    //     map((value) => (value ?? '').toString()), // Asegura que el valor sea una cadena (maneja null)
    //     filter((value) => value.trim() !== ''), // Filtra valores vacíos
    //     filter((value) => !isNaN(Number(value))), // Asegura que el valor sea numérico
    //     map((value) => Number(value)), // Convierte el valor a número
    //     filter((value) => value >= 0 && value <= 100)

    //   ).subscribe((value) => {
    //     this.processedValue = Number(value);
    //     this.onValueProcessed(this.processedValue)

    //   });

    // inputDos: ['',] as unknown as string,

    this.incrementadorForm = this.fb.group({
      inputUno: ['']
    });

    this.incrementadorForm.get('inputUno')?.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        map((value) => (value ?? '').toString()), // Asegura que el valor sea una cadena (maneja null)
        filter((value) => value.trim() !== ''), // Filtra valores vacíos
        filter((value) => !isNaN(Number(value))), // Asegura que el valor sea numérico
        map((value) => Number(value)), // Convierte el valor a número
        filter((value) => value >= 0 && value <= 100)

      ).subscribe((value) => {
        this.processedValue = Number(value);
        this.onValueProcessed(this.processedValue)

      });

  }

  ngOnInit(): void {
    this.btnClass = `btn ${this.btnClass}`;
    this.incrementadorForm.patchValue({ inputUno: this.progreso });
  }

  //todo::: para decir a angular que esta propiedad puede recibir un valor desde el padre
  //solo incluir el decorador Input
  @Input() progreso: number = 50;
  numericInputControl = new FormControl('');
  processedValue: number | null = null;


  //genera un event emiter
  //todo:: es la forma de enviar un valor del hijo hacia padre, angular utiliza un emitter puede ser de cualquier tipo
  @Output() valorSalida: EventEmitter<number> = new EventEmitter();

  @Input() btnClass: string = "btn-primary";

  get getPorcentaje() {
    return `${this.progreso}%`;
  }

  cambiarValor(valor: number) {
    
console.log('form')
    if (this.progreso >= 100 && valor >= 0) {
      this.progreso = 100;
      this.incrementadorForm.patchValue({ inputUno: this.progreso });
      this.valorSalida.emit(100);
      return;
    }

    if (this.progreso <= 0 && valor < 0) {       
      this.incrementadorForm.patchValue({ inputUno: this.progreso });
      this.valorSalida.emit(0);
      this.progreso = 0;
      return;
    }

    this.progreso = this.progreso + valor;
    this.incrementadorForm.patchValue({ inputUno: this.progreso });
    this.valorSalida.emit(this.progreso)
  }

  blurEvent(event: any) {
    console.log('im on blur');
  }

  onChange(currentValor: number): void {

    if (currentValor >= 100) {
      this.progreso = 100
    } else if (currentValor <= 0) {
      this.progreso = 0
    } else {
      this.progreso = currentValor;
    }
    this.valorSalida.emit(currentValor);
  }


  onValueProcessed(value: number) {
    console.log('Processed value:', value);
    // this.progreso=value;

    // Aquí puedes manejar el valor procesado, como enviarlo a una API o actualizar un estado
  }

}