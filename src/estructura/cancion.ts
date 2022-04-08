import lowdb from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import {Genero} from "./genero";
import { schemaCancion } from "./schema";
import { schemaGenero } from "./schema";
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

export class JsonCancionCollection {
    private database:lowdb.LowdbSync<schemaCancion>;
    constructor(public coleccion:Cancion[]) {
        this.database = lowdb(new FileSync("data.json"));
        if (this.database.has("canciones").value()) {
            let dbItems = this.database.get("canciones").value();
            dbItems.forEach(item => this.coleccion.push(new Cancion(item.nombre, item.autor, item.generos, item.duracion, item.single, item.reproducciones)));
        }
    }
    addCancion(n: string, a: string, g: Genero[], d: string, s: boolean, r: number) {
        this.coleccion.push(new Cancion(n, a, g, d, s, r));
        this.database.get("canciones").push({nombre: n, autor: a, generos: g, duracion: d, single: s, reproducciones: r}).write();
    }
    deleteCancion(n: string) {
        this.database.get("canciones").remove({nombre: n}).write();
    }
    getCancion(n: number): Cancion {
        return this.coleccion[n];
    }
}
