import {Genero} from "..";
import {Cancion} from "../estructura/cancion";

export class Album {
    constructor(
      private nombre_: string,
      private autor_: string, /* o Artista*/
      private añoPublicacion_: number,
      private generos_: Genero[],
      private canciones_: Cancion[]) {}


    getNombre(): string {
        return this.nombre_;
    }
    getAutor(): string {
        return this.autor_;
    }
    getAño(): number {
        return this.añoPublicacion_;
    }
    getGeneros(): Genero[] {
        return this.generos_;
    }
    getCanciones(): Cancion[] {
        return this.canciones_;
    }

    setNombre(nombre: string): void {
        this.nombre_ = nombre;
    }
    setAutor(autor: string): void {
        this.autor_ = autor;
    }
    setAño(año: number): void {
        this.añoPublicacion_ = año;
    }
    setGeneros(genero: Genero[]): void {
        this.generos_ = genero;
    }
    setCanciones(canciones: Cancion[]): void {
        this.canciones_ = canciones;
    }
  }

