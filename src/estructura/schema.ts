import {Genero} from "./genero";
import {Cancion} from "./cancion";

export type schemaCancion = {
    canciones: {nombre: string, autor: string, generos: string[], duracion: string, single: boolean, reproducciones: number}[]
};

export type schemaGenero = {
    generos: {nombre: string, grupos: string[], artistas: string[], albumes: string[], canciones: string[]}[]
};

export type schemaGrupo = {
    grupos: {nombre: string, componentes: string[], año: number, generos: string[], albumes: string[], oyentes: number}[]
};

export type schemaAlbum = {
    albumes: {nombre: string, autor: string, año: number, generos: string[], canciones: string[]}[]
};