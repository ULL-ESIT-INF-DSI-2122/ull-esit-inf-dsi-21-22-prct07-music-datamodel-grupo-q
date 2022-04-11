import {Cancion} from "../estructura/cancion";

export interface CommonOrdenable <T>{
  ordRepros(asc: boolean): T[];
}

/*
export interface AlbumOrdenable{
  ordAlfabeticoNombre(asc: boolean): Album[];
  ordAño(asc: boolean): Album[];
} */

export interface CancionOrdenable{
  ordAlfabeticoTitulo(asc: boolean): Cancion[];
  ordSingles(s: boolean): Cancion[];
}