import { ActorLista } from "./actor-lista";
import { GeneroLista } from "./genero-lista";

export interface Pelicula {
    Id: number;
    Nombre: string;
    Duracion: number;
    Sinopsis: string;
    Imagen:any;
    Actor?:ActorLista[];
    Genero?:GeneroLista[];
} 