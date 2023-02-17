import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap, map, tap } from 'rxjs/operators';

/** Interfaces */
import { Autorizacion } from '../interface/autorizacion';
import { RespuestaApi } from '../interface/respuestaapi';
import { Login } from '../interface/login';

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    /** Propiedad configuración */
    private configSession: string = 'Angular';

    /** Propiedad Autenticación */
    private _authenticated: boolean = false;

    /**propiedad url */
    private url: string = 'Autorizacion/';
 
    /** Constructor
    @param _http : Clase @angular http.
    @param _userService : servicio usuario*/
    constructor(private _http: HttpClient) {
    }

    set session(auth: Autorizacion) {
        localStorage.setItem(this.configSession, JSON.stringify(auth));
    }

    get session(): Autorizacion {
        if (localStorage.getItem(this.configSession) === 'undefined') {
            this.cerrarSesion();
        }

        const sessionJson = localStorage.getItem(this.configSession);
        const session: Autorizacion = sessionJson !== null ? JSON.parse(sessionJson) : null;
        return session;
    }

    get token(): string {
        const sessionJson = localStorage.getItem(this.configSession);
        const session: Autorizacion = sessionJson !== null ? JSON.parse(sessionJson) : null;
        return session.Token!;
    }

    /** Constructor
    *
    @param model : Entidad Autenticación  */
    login(model: Login): Observable<any> {

        // Throw error, if the user is already logged in
        if (this._authenticated) {
            return throwError('User is already logged in.');
        }

        const body = JSON.stringify(model);
        const url = `${this.url}Autenticacion`;

        return this._http.post<RespuestaApi>(url, body)
            .pipe(
                switchMap((response: RespuestaApi) => {

                    if (response.Mensaje.Estado) {

                        // Asigna información del token
                        this.session = response.Datos;

                        // Indica que usuario es autenticado
                        this._authenticated = true;
                    }
                    // Return a new observable with the response
                    return of(response);

                })
            );
    }

    /** Sign out */
    cerrarSesion(): Observable<any> {
        localStorage.removeItem(this.configSession);
        this._authenticated = false;
        return of(true);
    }


}
