import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/** ENrutamiento */
import { RouterModule } from '@angular/router';
import { MaestroRutas } from './maestros.rouring';

/** Componenetes */
import { PeliculaComponent } from './pelicula/pelicula.component';
import { GeneroComponent } from './genero/genero.component';
import { ActorComponent } from './actor/actor.component';
import { GeneroListaComponent } from './genero/genero-lista.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PeliculaComponent,
    GeneroComponent,
    ActorComponent,
    GeneroListaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(MaestroRutas),
  ]
})
export class MaestrosModule { }
