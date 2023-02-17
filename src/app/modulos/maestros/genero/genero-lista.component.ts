import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

//Sección service
import { GeneroServicio } from 'src/app/service/genero.servicio';

//Sección Interface
import { GeneroLista } from 'src/app/interface/genero-lista';
import { Mensaje } from 'src/app/interface/mensaje';
import { RespuestaApi } from 'src/app/interface/respuestaapi';

@Component({
  selector: 'app-genero-lista',
  templateUrl: './genero-lista.component.html'
})
export class GeneroListaComponent implements OnInit, OnDestroy {

  /**Propiedad cargando */
  public cargando: boolean = false;

  /**Propiedad familias para filtro*/
  public generos: GeneroLista[] = [];

  /**Propiedad mensaje */
  public mensaje: Mensaje = { Estado: false, Texto: '', Tipo: '' }

  /**Propiedades Filtro*/
  public filtro: string = '';

  /**SUbscripciones */
  private unsubscribe$ = new Subject<void>();


  constructor(private _servicio: GeneroServicio, private _router: Router) {
    this.listar();
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  listar() {
    this.cargando = true;
    this._servicio.listar()
      .subscribe((datos: RespuestaApi) => {
        this.generos = datos.Datos;
      }).add(() => {
        this.cargando = false;
      });
  }

  onEditar(genero: GeneroLista) {
    this._router.navigate(['/genero', genero.Id]);
  }

  onNuevo() {
    this._router.navigate(['/genero']);
  }

}
