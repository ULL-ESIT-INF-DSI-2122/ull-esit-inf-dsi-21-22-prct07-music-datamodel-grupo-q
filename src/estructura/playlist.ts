import {Genero} from "./genero";
import {Cancion} from "./cancion";

export class PlayList {
    constructor(
      private nombre_: string,
      private canciones_: Cancion[],
      private duracion_: string,
      private generos_: Genero[]) {}

    getNombre(): string {
        return this.nombre_;
    }
    getCanciones(): Cancion[] {
        return this.canciones_;
    }
    getDuracion(): string {
        return this.duracion_;
    }
    getGeneros(): Genero[] {
        return this.generos_;
    }

    setNombre(nombre: string): void {
        this.nombre_ = nombre;
    }
    setCanciones(canciones: Cancion[]): void {
        this.canciones_ = canciones;
    }
    setDuracion(duracion: string): void {
        this.duracion_ = duracion;
    }
    setGeneros(genero: Genero[]): void {
        this.generos_ = genero;
    }
  }