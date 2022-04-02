import {Cancion} from "..";
import {Album} from "..";
import {Grupo} from "..";
import {Artista} from "..";

export class Genero {
    constructor(
      private nombre_: string,
      private grupos_: Grupo[], /* hay que hacer una interfaz generica para no usar union de tipos*/
      private artistas_: Artista[],
      private albumes_: Album[],
      private canciones_: Cancion[]) {}


    getNombre(): string {
        return this.nombre_;
    }
    getGrupos(): Grupo[] {
        return this.grupos_;
    }
    getArtistas(): Artista[] {
        return this.artistas_;
    }
    getAlbumes(): Album[] {
        return this.albumes_;
    }
    getCanciones(): Cancion[] {
        return this.canciones_;
    }
    setNombre(nombre: string): void {
        this.nombre_ = nombre;
    }
    setGrupos(grupos: Grupo[]): void {
        this.grupos_ = grupos;
    }
    setArtistas(artistas: Artista[]): void {
        this.artistas_ = artistas;
    }
    setAlbumes(albumes: Album[]): void {
        this.albumes_ = albumes;
    }
    setCanciones(canciones: Cancion[]): void {
        this.canciones_ = canciones;
    }
  }