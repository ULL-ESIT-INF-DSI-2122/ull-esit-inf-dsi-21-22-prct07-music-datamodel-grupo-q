import {Genero} from "./genero";
import {Cancion} from "./cancion";
import {Album} from "./album";
import {Grupo} from "./grupo";

export class Artista {
    private oyentesMensuales_: number;
    constructor(
      private nombre_: string,
      private grupos_: Grupo[],
      private generos_: Genero[],
      private albumes_: Album[],
      private canciones_: Cancion[]) {
        let oyentesInd: number = 0;
        let oyentesGrup: number = 0;
        this.canciones_.forEach((cancion) => {
          this.grupos_.forEach((grupo) => {
            if (cancion.getAutor() == grupo.getNombre()) {
                oyentesInd = oyentesInd + cancion.getReproducciones();
            }
            });
        });
        this.grupos_.forEach((grupo) => {
            oyentesGrup = oyentesGrup + grupo.getOyentes();
        });
        this.oyentesMensuales_ = oyentesInd + oyentesGrup;
      }

    getNombre(): string {
        return this.nombre_;
    }
    getGrupos(): Grupo[] {
        return this.grupos_;
    }
    getGeneros(): Genero[] {
        return this.generos_;
    }
    getAlbumes(): Album[] {
        return this.albumes_;
    }
    getCanciones(): Cancion[] {
        return this.canciones_;
    }
    getOyentes(): number {
        return this.oyentesMensuales_;
    }

    setNombre(nombre: string): void {
        this.nombre_ = nombre;
    }
    setGrupos(grupos: Grupo[]): void {
        this.grupos_ = grupos;
    }
    setGeneros(generos: Genero[]): void {
        this.generos_ = generos;
    }
    setAlbumes(albumes: Album[]): void {
        this.albumes_ = albumes;
    }
    setCanciones(canciones: Cancion[]): void {
        this.canciones_ = canciones;
    }
    setOyentes(oyentes: number): void {
        this.oyentesMensuales_ = oyentes;
    }
  }