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
    printData() {
      console.log(this.nombre_, (this.single_)?' Single': '');
      console.log('Autor: ', this.autor_);
      console.log('Genero: ', this.autor_);
      console.log('D: ', this.duracion_, ' R: ', this.reproducciones_);
    }
    convertJSON(): (number | string | boolean | Genero[])[] {
      // this.generos_[0].getNombre()
      return [this.nombre_, this.autor_, this.generos_, this.duracion_, this.single_, this.reproducciones_];
    }
  }

export class JsonCancionCollection {
    private database:lowdb.LowdbSync<schemaCancion>;
    constructor(public coleccion:Cancion[]) {
        this.database = lowdb(new FileSync("data.json"));
        if (this.database.has("canciones").value()) {
            let dbItems = this.database.get("canciones").value();
            dbItems.forEach(item => this.coleccion.push(new Cancion(item.nombre, item.autor, item.generos, item.duracion, item.single, item.reproducciones)));
        } // Deberia hacer un else para crear la base o algo asi
    }
    addCancion(n: string, a: string, g: Genero[], d: string, s: boolean, r: number) {
        this.coleccion.push(new Cancion(n, a, g, d, s, r));
        this.database.get("canciones").push({nombre: n, autor: a, generos: g, duracion: d, single: s, reproducciones: r}).write();
    }
    deleteCancion(n: string): boolean {
      if (this.coleccion.find((element) => {
        element.getNombre() === n;
      }) != undefined) {
        this.coleccion = this.coleccion.filter((element) => {
          element.getNombre() !== n;
        });
        this.database.get("canciones").remove({nombre: n}).commit();
        return true;
      } else {
        return false;
      }
    }
    getCancion(n: number): Cancion {
        return this.coleccion[n];
    }
    getCancionByName(n: string): Cancion | undefined {
      return this.coleccion.find((element) => {
        element.getNombre() === n;
      });
    }
    displayCanciones() {
      console.log('──────────────────────────');
      this.coleccion.forEach((cancion)=> {
        cancion.printData();
        console.log('──────────────────────────');
      });
    }
}
