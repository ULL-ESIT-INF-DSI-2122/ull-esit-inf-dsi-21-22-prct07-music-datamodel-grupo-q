import {Genero} from "./genero";
import {Cancion} from "./cancion";

export type schemaCancion = {
    canciones: {nombre: string, autor: string, generos: Genero[], duracion: string, single: boolean, reproducciones: number}[]
};

export type schemaGenero = {
    generos: {nombre: string}[]
};
