import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Pelicula } from 'src/app/interface/pelicula';


@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html'
})
export class PeliculaComponent implements OnInit, OnDestroy {


  @Input() pelicula: Pelicula = { Duracion: 0, Id: 0, Imagen: null, Nombre: '', Sinopsis: '', Actor: [], Genero: [] }

  /**SUbscripciones */
  private unsubscribe$ = new Subject<void>();

  /** Inicializado de la clase
  @param {Router} _router :Enrutamiento */
  constructor() {

  }

  ngOnInit() {

  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }


}