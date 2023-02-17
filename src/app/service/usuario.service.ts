import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**Domain */
import { RespuestaApi } from '../interface/respuestaapi';
import { Usuario } from '../interface/usuario';


@Injectable({
    providedIn: 'root'
})
export class UsuarioService {

    /**propiedad url */
    private url: string = 'Usuario/';

    /*** Constructor*/
    constructor(private _httpClient: HttpClient) { }

    /** Método para crear
    @param {usuario} usuario : Entidad usuario */
    registro(usuario: Usuario): Observable<RespuestaApi> {
        let body = JSON.stringify(usuario);
        let url = `${this.url}Registro`;
        return this._httpClient.post<RespuestaApi>(url, body);
    }

    /** Método para listar todos */
    list(): Observable<RespuestaApi> {
        let url = `${this.url}Listar`;
        return this._httpClient.get<RespuestaApi>(url);
    }


}