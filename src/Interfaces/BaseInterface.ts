import { PlayList } from "../estructura/playlist";
import { Album } from "../estructura/album";
import {Cancion} from "../estructura/cancion";

export interface CommonOrdenable <T>{
  ordReproducciones(asc: boolean): T[];
  // compReproduciones(a: number, b: number): number;
}

// Referentes a albumes
export interface AlbumOrdenable{
  ordAlfabeticoNombre(asc: boolean): Album[];
  ordAño(asc: boolean): Album[];
}

// Referentes a Canciones
export interface CancionOrdenable{
  ordAlfabeticoTitulo(asc: boolean): Cancion[];
  ordSingles(s: boolean): Cancion[];
}

// Referentes a Playlists
export interface PlaylistOrdenable{
  ordAlfabeticoTitulo(asc: boolean): PlayList[];
}

