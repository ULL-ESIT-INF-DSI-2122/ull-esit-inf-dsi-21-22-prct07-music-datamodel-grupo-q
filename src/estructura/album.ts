import lowdb from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import { schemaAlbum } from "./schema";

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
}

export class JsonAlbumCollection {
    private displayMod: Album[];
    private database:lowdb.LowdbSync<schemaAlbum>; 
    constructor(public coleccion: Album[]) {
        this.database = lowdb(new FileSync("db_albumes.json"));
        if (this.database.has("albumes").value()) {
            let dbItems = this.database.get("albumes").value();
            dbItems.forEach(item => this.coleccion.push(new Album(item.nombre, item.autor, item.año, item.generos, item.canciones)));
        } // Deberia hacer un else para crear la base o algo asi
        this.displayMod = this.coleccion;
    }
    addAlbum(n: string, aut: string, a: number, g: string[], c: string[]) {
        this.coleccion.push(new Album(n, aut, a, g, c));
        this.database.get("albumes").push({nombre: n, autor: aut, año: a, generos: g, canciones: c}).write();
    }
    deleteAlbum(n: string) {
        this.database.get("albumes").remove({nombre: n}).write();
        this.coleccion = this.coleccion.filter(element => {return element.getNombre() !== n});
      }
      deleteAlbumVector(as: string[]) {
        as.forEach(e => {
          this.database.get("albumes").remove({nombre: e}).write();
          this.coleccion = this.coleccion.filter(buenas => {return buenas.getNombre() !== e});
        });
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
}
