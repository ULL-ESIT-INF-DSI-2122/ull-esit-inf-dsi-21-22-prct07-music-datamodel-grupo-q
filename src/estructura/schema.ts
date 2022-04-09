import {Genero} from "./genero";
import {Cancion} from "./cancion";

export type schemaCancion = {
    canciones: {nombre: string, autor: string, generos: string[], duracion: string, single: boolean, reproducciones: number}[]
};

export type schemaGenero = {
    generos: {nombre: string, grupos: string[], artistas: string[], albumes: string[], canciones: string[]}[]
};
