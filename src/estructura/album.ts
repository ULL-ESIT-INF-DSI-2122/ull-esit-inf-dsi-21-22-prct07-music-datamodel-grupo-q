import lowdb from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import { schemaAlbum } from "./schema";
import {AlbumOrdenable, CommonOrdenable} from "../Interfaces/BaseInterface";

export class Album {
  constructor(
    private nombre_: string,
    private autor_: string, /* o Artista*/
    private añoPublicacion_: number,
    private generos_: string[],
    private canciones_: string[]) {}

  getNombre(): string {
      return this.nombre_;
  }
  getAutor(): string {
      return this.autor_;
  }
  getAño(): number {
      return this.añoPublicacion_;
  }
  getGeneros(): string[] {
      return this.generos_;
  }
  getCanciones(): string[] {
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
  setGeneros(genero: string[]): void {
      this.generos_ = genero;
  }
  setCanciones(canciones: string[]): void {
      this.canciones_ = canciones;
  }
  printData() {
    console.log(this.nombre_);
    console.log('Autor: ', this.autor_);
    console.log('Año: ', this.añoPublicacion_);
    console.log('Generos:');
    this.generos_.forEach((g) => {
      console.log('   ', g);
    });
    console.log('Canciones:');
    this.canciones_.forEach((c) => {
      console.log('   ', c);
    });
  }
}

export class JsonAlbumCollection implements CommonOrdenable<Album>, AlbumOrdenable {
    private displayMod: Album[];
    private database:lowdb.LowdbSync<schemaAlbum>;
    constructor(public coleccion: Album[]) {
      this.database = lowdb(new FileSync("dataBase/db_albumes.json"));
      if (this.database.has("albumes").value()) {
        let dbItems = this.database.get("albumes").value();
        dbItems.forEach(item => this.coleccion.push(new Album(item.nombre, item.autor, item.año, item.generos, item.canciones)));
      } // Deberia hacer un else para crear la base o algo asi
      this.displayMod = this.coleccion;
    }
    addAlbum(n: string, aut: string, a: number, g: string[], c: string[]) {
      this.coleccion.push(new Album(n, aut, a, g, c));
      this.database.get("albumes").push({nombre: n, autor: aut, año: a, generos: g, canciones: c}).write();
      this.displayMod = this.coleccion;
    }
    deleteAlbum(n: string) {
      this.database.get("albumes").remove({nombre: n}).write();
      this.coleccion = this.coleccion.filter(element => {element.getNombre() !== n;});
      this.displayMod = this.coleccion;
    }
    deleteAlbumVector(as: string[]) {
      as.forEach(e => {
        this.database.get("albumes").remove({nombre: e}).write();
        this.coleccion = this.coleccion.filter(buenas => {buenas.getNombre() !== e;});
      });
      this.displayMod = this.coleccion;
    }
    getAlbum(n: number): Album {
      return this.coleccion[n];
    }
    includesAlbum(n: string): boolean {
      let isIn: boolean = false;
      this.coleccion.forEach(element => {
        if (element.getNombre() === n) {
          isIn = true;
        }
      });
      return isIn;
    }
    getAlbumByName(n: string): Album | undefined {
      return this.coleccion.find((element) => {
        element.getNombre() === n;
      });
    }
    ordAlfabeticoTitulo(asc: boolean): Album[] {
        this.displayMod = this.coleccion;
        if (asc) {
          this.displayMod.sort((a, b) => a.getNombre().localeCompare(b.getNombre()));
        } else {
          this.displayMod.sort((a, b) => b.getNombre().localeCompare(a.getNombre()));
        }
        return this.displayMod;
    }
    ordAño(asc: boolean): Album[] {
        this.displayMod = this.coleccion;
        if (asc) {
          this.displayMod.sort((a, b) => a.getAño() - b.getAño());
        } else {
          this.displayMod.sort((a, b) => b.getAño() - a.getAño());
        }
        return this.displayMod;
    }
    displayOrdenedGeneros() {
      console.log('──────────────────────────');
      this.displayMod.forEach((album)=> {
        album.printData();
        console.log('──────────────────────────');
      });
    }
}
