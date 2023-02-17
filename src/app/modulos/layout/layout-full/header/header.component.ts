import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Autorizacion } from 'src/app/interface/autorizacion';
import { AuthService } from 'src/app/service/auth.service';
import { PeliculaNotification } from 'src/app/service/peliculas.notificacion';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {

  public session: Autorizacion = { Correo: '', Nombre: '' };

  public autenticado: boolean = false;

  /**SUbscripciones */
  private unsubscribe$ = new Subject<void>();


  public buscador: string = "";

  /** Inicializado de la clase
  @param {Router} _router :Enrutamiento */
  constructor(private _servicio: AuthService, public _notificacion: PeliculaNotification, private _router: Router) {

  }

  ngOnInit() {
    let session: Autorizacion = this._servicio.session;
    if (session !== null) {
      this.session = session;
      this.autenticado = true;
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onCerrarSesion() {
    this._servicio.cerrarSesion();
    this.session = { Correo: '', Nombre: '' };
    this.autenticado = false;
  }

  onIniciarSesion() {
    this._router.navigate(['/login'])
  }

  onBuscar() {

    if (this.buscador.length >= 1) {
      this._router.navigate(['/catalogos'])
      this._notificacion.BuscardorPelicula.emit(this.buscador);
    } else {
      this._notificacion.BuscardorPelicula.emit('');
    }
  }

  onMenu(url: string) {
    this._router.navigate([url])
  }

}
