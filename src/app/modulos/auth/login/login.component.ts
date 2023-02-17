import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Login } from 'src/app/interface/login';
import { Mensaje } from 'src/app/interface/mensaje';
import { RespuestaApi } from 'src/app/interface/respuestaapi';

/** Service */
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, OnDestroy {

  /** Propiedad spinner */
  public cargando: boolean = false;

  /** Mensaje */
  public vermensaje: boolean = false;

  /** Propiedad mensaje */
  public mensaje: Mensaje = { Estado: false, Texto: '', Tipo: '' };

  /** Propiedad login */
  public login: Login = { Correo: '', Clave: '' }

  /**SUbscripciones */
  private unsubscribe$ = new Subject<void>();

  /** Inicializado de la clase
  @param {Router} _router :Enrutamiento */
  constructor(private _servicio: AuthService, private _router: Router) {


  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  /** Acción ingrear */
  onIngresar(): void {

    // Sign in
    this.cargando = true;
    this.vermensaje = false;
    this._servicio.login(this.login)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((response: RespuestaApi) => {

        if (!response.Mensaje.Estado) {
          this.vermensaje = true;
          this.mensaje = response.Mensaje;
          this.login = { Correo: '', Clave: '' };
        } else {
          this._router.navigate(['/home']);
        }
      }).add(() => {
        this.cargando = false;
      });
  }


  onCrear() {
    this._router.navigate(['/registro']);
  }

}
