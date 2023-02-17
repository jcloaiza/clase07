import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Pelicula } from 'src/app/interface/pelicula';
import { CatalogoServicio } from 'src/app/service/catalogo.service';
import { PeliculaNotification } from 'src/app/service/peliculas.notificacion';


@Component({
  selector: 'app-catalogos',
  templateUrl: './catalogos.component.html'
})
export class CatalogosComponent implements OnInit, OnDestroy {

  public peliculas: Pelicula[] = [];

  public catalogo: Pelicula[] = [];

  /**SUbscripciones */
  private unsubscribe$ = new Subject<void>();

  /** Inicializado de la clase
  @param {Router} _router :Enrutamiento */
  constructor(public _service: CatalogoServicio, public _notificacion: PeliculaNotification) {

    this._notificacion.BuscardorPelicula
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((filtro: string) => {
        if (filtro === '') {
          this.peliculas = [];
        } else {
          this.buscar(filtro);
        }
      });
  }

  ngOnInit() {
    this.listarCatalogo();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  listarCatalogo() {
    this._service.listar()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: any) => {
        this.catalogo = data;
      });
  }


  buscar(filtro: string) {
    this.peliculas = this.filterItem(this.catalogo, filtro);
  }

  public filterItem(data: Pelicula[], query: string) {
    return data.filter(function (item) {
      return item.Nombre.toLowerCase().indexOf(query.toLowerCase()) > -1;
    })
  }

}
