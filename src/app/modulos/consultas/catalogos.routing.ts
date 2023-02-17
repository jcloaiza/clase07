import { Route } from '@angular/router';

/** Componenet */
import { CatalogosComponent } from './catalogos/catalogos.component';
import { ReservasComponent } from './reservas/reservas.component';

export const CatalogosRutas: Route[] = [
    {
        path: 'catalogos', component: CatalogosComponent,
    },
    {
        path: 'reservas', component: ReservasComponent,
    },
];
