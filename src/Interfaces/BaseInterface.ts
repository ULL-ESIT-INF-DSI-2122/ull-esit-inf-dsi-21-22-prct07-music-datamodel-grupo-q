import { PlayList } from "../estructura/playlist";
import { Album } from "../estructura/album";
import {Cancion} from "../estructura/cancion";

export interface CommonOrdenable <T>{
  ordReproducciones(asc: boolean): T[];
  //compReproduciones(a: number, b: number): number;
}


export interface AlbumOrdenable{
  ordAlfabeticoNombre(asc: boolean): Album[];
  ordAño(asc: boolean): Album[];
} 

export interface CancionOrdenable{
  ordAlfabeticoTitulo(asc: boolean): Cancion[];
  ordSingles(): Cancion[];
}

export interface PlaylistOrdenable{
  ordAlfabeticoTitulo(asc: boolean): PlayList[];
}

