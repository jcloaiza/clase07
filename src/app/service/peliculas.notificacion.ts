import { EventEmitter, Injectable, Output } from '@angular/core';
import { Pelicula } from '../interface/pelicula';

/** Domain */


@Injectable({
    providedIn: 'root'
})
export class PeliculaNotification {

    /** Eventos */
    @Output() BuscardorPelicula: EventEmitter<string> = new EventEmitter();

    constructor() {
    }

}