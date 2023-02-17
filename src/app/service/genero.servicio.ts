import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**Domain */
import { RespuestaApi } from '../interface/respuestaapi';
import { Genero } from '../interface/genero';


@Injectable({
    providedIn: 'root'
})
export class GeneroServicio {

    /**propiedad url */
    private url: string = 'Genero/';

    /*** Constructor*/
    constructor(private _httpClient: HttpClient) { }


    guardar(genero: Genero): Observable<RespuestaApi> {
        let body = JSON.stringify(genero);
        let url = `${this.url}Guardar`;
        return this._httpClient.post<RespuestaApi>(url, body);
    }

    consultar(id: number): Observable<RespuestaApi> {
        let url = `${this.url}Consultar?id=${id}`;
        return this._httpClient.get<RespuestaApi>(url);
    }

    editar(genero: Genero): Observable<RespuestaApi> {
        let body = JSON.stringify(genero);
        let url = `${this.url}Editar`;
        return this._httpClient.post<RespuestaApi>(url, body);
    }

    /** Método para listar todos */
    listar(): Observable<RespuestaApi> {
        let url = `${this.url}Listar`;
        return this._httpClient.get<RespuestaApi>(url);
    }


}