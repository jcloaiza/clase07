import { Route } from '@angular/router';

/** Componenet */
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';

export const AuthRoutes: Route[] = [
    {
        path: 'login', component: LoginComponent,
    },
    {
        path: 'registro', component: RegistroComponent,
    }
];
