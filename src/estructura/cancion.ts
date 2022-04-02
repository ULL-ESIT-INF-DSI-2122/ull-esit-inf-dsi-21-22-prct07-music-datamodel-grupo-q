import {Genero} from "..";

export class Cancion {
    constructor(
      private nombre_: string,
      private autor_: string, /* o Artista*/
      private generos_: Genero[],
      private duracion_: string,
      private single_: boolean,
      private reproducciones_: number) {}

    getNombre(): string {
        return this.nombre_;
    }
    public getAutor(): string {
        return this.autor_;
    }
    getGeneros(): Genero[] {
        return this.generos_;
    }
    getDuracion(): string {
        return this.duracion_;
    }
    getSingle(): boolean {
        return this.single_;
    }
    getReproducciones(): number {
        return this.reproducciones_;
    }

    setNombre(nombre: string): void {
        this.nombre_ = nombre;
    }
    setAutor(autor: string): void {
        this.autor_ = autor;
    }
    setGeneros(genero: Genero[]): void {
        this.generos_ = genero;
    }
    setDuracion(duracion: string): void {
        this.duracion_ = duracion;
    }
    setSingle(single: boolean): void {
        this.single_ = single;
    }
    setReproducciones(reproducciones: number): void {
        this.reproducciones_ = reproducciones;
    }
  }