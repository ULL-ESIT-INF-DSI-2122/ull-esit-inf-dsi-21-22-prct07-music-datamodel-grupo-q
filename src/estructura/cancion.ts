import lowdb from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import { schemaCancion } from "./schema";
import {CancionOrdenable, CommonOrdenable} from "../Interfaces/BaseInterface";

/**
 * Clase que representa una canción
 */
export class Cancion {
    constructor(
      private nombre_: string,
      private autor_: string, /* o Artista*/
      private generos_: string[],
      private duracion_: string,
      private single_: boolean,
      private reproducciones_: number) {}

    getNombre(): string {
      return this.nombre_;
    }
    getAutor(): string {
        return this.autor_;
    }
    getGeneros(): string[] {
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
    setGeneros(genero: string[]): void {
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
    convertJSON(): (number | string | boolean | string[])[] {
      // this.generos_[0].getNombre()
      return [this.nombre_, this.autor_, this.generos_, this.duracion_, this.single_, this.reproducciones_];
    }
  }

export class JsonCancionCollection implements CommonOrdenable<Cancion>, CancionOrdenable {
    private displayMod: Cancion[];
    private database:lowdb.LowdbSync<schemaCancion>;
    constructor(public coleccion: Cancion[]) {
        this.database = lowdb(new FileSync("dataBase/db_canciones.json"));
        if (this.database.has("canciones").value()) {
            let dbItems = this.database.get("canciones").value();
            dbItems.forEach(item => this.coleccion.push(new Cancion(item.nombre, item.autor, item.generos, item.duracion, item.single, item.reproducciones)));
          } // Deberia hacer un else para crear la base
          this.displayMod = this.coleccion;
    }
    addCancion(n: string, a: string, g: string[], d: string, s: boolean, r: number) {
        this.coleccion.push(new Cancion(n, a, g, d, s, r));
        this.database.get("canciones").push({nombre: n, autor: a, generos: g, duracion: d, single: s, reproducciones: r}).write();
    }
    deleteCancion(n: string) {
      this.database.get("canciones").remove({nombre: n}).write();
      this.coleccion = this.coleccion.filter(element => {
        element.getNombre() !== n;
      });
    }
    deleteCancionesVector(cs: string[]) {
      cs.forEach(e => {
        this.database.get("canciones").remove({nombre: e}).write();
        this.coleccion = this.coleccion.filter(buenas => {
          buenas.getNombre() !== e;
        });
      });
    }
    getCancion(n: number): Cancion {
        return this.coleccion[n];
    }
    includesCancion(n: string): boolean {
      let isIn: boolean = false;
      this.coleccion.forEach(element => {
        if (element.getNombre() === n) {
          isIn = true;
        }
      });
      return isIn;
  }
  getCancionByName(n: string): Cancion | undefined {
    return this.coleccion.find(e => e.getNombre() === n);
  }

  // Interfaces
  ordSingles(s: boolean): Cancion[] {
    if (s) {
      this.displayMod = [];
      this.coleccion.forEach((e) => {
        if (e.getSingle() == true) {
          this.displayMod.push(e);
        }
      });
    } else {
      this.displayMod = this.coleccion;
    }
    return this.displayMod;
  }
  ordReproducciones(asc: boolean): Cancion[] {
    this.displayMod = this.coleccion;
    if (asc) {
      this.displayMod.sort((a, b) => a.getReproducciones() - b.getReproducciones());
    } else {
      this.displayMod.sort((a, b) => b.getReproducciones() - a.getReproducciones());
    }
    return this.displayMod;
  }
  ordAlfabeticoTitulo(asc: boolean): Cancion[] {
    this.displayMod = this.coleccion;
    if (asc) {
      this.displayMod.sort((a, b) => a.getNombre().localeCompare(b.getNombre()));
    } else {
      this.displayMod.sort((a, b) => b.getNombre().localeCompare(a.getNombre()));
    }
    return this.displayMod;
  }
  displayCanciones() {
    console.log('──────────────────────────');
    this.coleccion.forEach((cancion)=> {
      cancion.printData();
      console.log('──────────────────────────');
    });
  }
  displayMode() {
    console.log('──────────────────────────');
    this.displayMod.forEach((cancion)=> {
      cancion.printData();
      console.log('──────────────────────────');
    });
  }
}
