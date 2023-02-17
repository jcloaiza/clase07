import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

/** Servicios */
import { UsuarioService } from 'src/app/service/usuario.service';

/** Interfaces */
import { Mensaje } from 'src/app/interface/mensaje';
import { RespuestaApi } from 'src/app/interface/respuestaapi';
import { Usuario } from 'src/app/interface/usuario';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html'
})
export class RegistroComponent implements OnInit, OnDestroy {

  public cargando: boolean = false;

  /** Mensaje */
  public vermensaje: boolean = false;

  /** Propiedad mensaje */
  public mensaje: Mensaje = { Estado: false, Texto: '', Tipo: '' };

  /** Propiedad usuario */
  public usuario: Usuario = { Id: 0, Nombre: '', Apellido: '', Celular: '', Direccion: '', Correo: '', Clave: '' };

  /**SUbscripciones */
  private unsubscribe$ = new Subject<void>();

  /** Inicializado de la clase
  @param {Router} _router :Enrutamiento */
  constructor(private _servicio: UsuarioService, private _router: Router) {
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onRegresar() {
    this._router.navigate(['/login']);
  }

  onRegistrar() {


    this.vermensaje = false;

    if (this.usuario.Nombre?.trim() === '' ||
      this.usuario.Apellido?.trim() === '' ||
      this.usuario.Direccion?.trim() === '' ||
      this.usuario.Celular?.trim() === '' ||
      this.usuario.Correo?.trim() === '' ||
      this.usuario.Clave?.trim() === ''
    ) {
      this.vermensaje = true;
      this.mensaje = { Estado: false, Texto: 'Por favor diligenciar la información oblgatoria', Tipo: '400' }
      return;
    }

    this.cargando = true;
    this._servicio
      .registro(this.usuario)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((respuesta: RespuestaApi) => {

        this.vermensaje = true;
        this.mensaje = respuesta.Mensaje;
        if (respuesta.Mensaje.Estado) {
          this.usuario = { Id: 0, Nombre: '', Apellido: '', Celular: '', Direccion: '', Correo: '', Clave: '' };
        }
      })
      .add(() => {
        this.cargando = false;
      });


  }

}