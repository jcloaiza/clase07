import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**Domain */

@Injectable({
    providedIn: 'root'
})
export class CatalogoServicio {

    /**propiedad url */
    private url: string = './assets/json/';

    /*** Constructor*/
    constructor(private _httpClient: HttpClient) { }

    /** Método para consultar animales*/
    listar(): Observable<any> {
        const url = `${this.url}calalogo.json`;
        return this._httpClient.get<any>(url);
    }

}
