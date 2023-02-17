import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Genero } from 'src/app/interface/genero';
import { RespuestaApi } from 'src/app/interface/respuestaapi';

//Sección service
import { GeneroServicio } from 'src/app/service/genero.servicio';

//Sección Interface

@Component({
  selector: 'app-genero',
  templateUrl: './genero.component.html',
})
export class GeneroComponent implements OnInit {

  public accion: string = "Nuevo";

  public genero: Genero = { Id: 0, Nombre: '' }

  /**SUbscripciones */
  private unsubscribe$ = new Subject<void>();

  constructor(private _servicio: GeneroServicio, private _router: Router,
    private _routerActive: ActivatedRoute) {

  }

  ngOnInit() {
    this.init();
  }

  /**Método inicial*/
  init(): void {

    this._routerActive.params
      .subscribe((param) => {
        if (Object.keys(param || {}).length > 0) {

          this._servicio
            .consultar(param['id'])
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((response: RespuestaApi) => {
              if (response.Mensaje.Estado) {
                this.genero = response.Datos;
                this.accion = "Editar"
              } else {
                this.onRegresar();
              }
            })
            .add(() => {

            });

        } else {
          //Nuevo
        }
      });
  }


  onGuardar() {
    //Valida la acción a realizar
    if (this.accion === "Nuevo") {
      this._servicio
        .guardar(this.genero)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((respusta: RespuestaApi) => {

          if (respusta.Mensaje.Estado) {
            this.genero = respusta.Datos;
            this.accion = "Editar";
          }

          //Mensaje
    
        }).add(() => {

        });
    } else if (this.accion === "Editar") {
      this._servicio
      .editar(this.genero)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((respusta: RespuestaApi) => {

        //Mensaje
  
      }).add(() => {

      });
    }
  }

  onRegresar() {
    this._router.navigate(['/generos']);
  }


}
