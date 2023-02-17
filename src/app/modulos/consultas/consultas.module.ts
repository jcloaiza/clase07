import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogosComponent } from './catalogos/catalogos.component';
import { ReservasComponent } from './reservas/reservas.component';
import { RouterModule } from '@angular/router';
import { CatalogosRutas } from './catalogos.routing';
import { PeliculaComponent } from './pelicula/pelicula.component';



@NgModule({
  declarations: [
    CatalogosComponent,
    ReservasComponent,
    PeliculaComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(CatalogosRutas),
  ]
})
export class ConsultasModule { }
