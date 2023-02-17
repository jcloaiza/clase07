import { Route } from '@angular/router';

/** Componenetes */
import { PeliculaComponent } from './pelicula/pelicula.component';
import { GeneroComponent } from './genero/genero.component';
import { ActorComponent } from './actor/actor.component';
import { GeneroListaComponent } from './genero/genero-lista.component';

export const MaestroRutas: Route[] = [
    {
        path: 'actor', component: ActorComponent,
    },
    {
        path: 'generos', component: GeneroListaComponent,
    },
    {
        path: 'genero/:id', component: GeneroComponent,
    },
    {
        path: 'genero', component: GeneroComponent,
    },
    {
        path: 'pelicula', component: PeliculaComponent,
    },
];
