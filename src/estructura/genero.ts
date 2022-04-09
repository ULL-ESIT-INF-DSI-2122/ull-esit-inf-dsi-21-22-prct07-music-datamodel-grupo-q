import lowdb from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import { schemaGenero } from "./schema";

export class Genero {
    constructor(
      private nombre_: string,
      private grupos_: string[], /* hay que hacer una interfaz generica para no usar union de tipos*/
      private artistas_: string[],
      private albumes_: string[],
      private canciones_: string[]) {}


    getNombre(): string {
        return this.nombre_;
    }
    getGrupos(): string[] {
        return this.grupos_;
    }
    getArtistas(): string[] {
        return this.artistas_;
    }
    getAlbumes(): string[] {
        return this.albumes_;
    }
    getCanciones(): string[] {
        return this.canciones_;
    }
    setNombre(nombre: string): void {
        this.nombre_ = nombre;
    }
    setGrupos(grupos: string[]): void {
        this.grupos_ = grupos;
    }
    setArtistas(artistas: string[]): void {
        this.artistas_ = artistas;
    }
    setAlbumes(albumes: string[]): void {
        this.albumes_ = albumes;
    }
    setCanciones(canciones: string[]): void {
        this.canciones_ = canciones;
    }
  }

export class JsonGeneroCollection {
    private displayMod: Genero[];
    private database:lowdb.LowdbSync<schemaGenero>; 
    constructor(public coleccion: Genero[]) {
        this.database = lowdb(new FileSync("db_generos.json"));
        if (this.database.has("generos").value()) {
            let dbItems = this.database.get("generos").value();
            dbItems.forEach(item => this.coleccion.push(new Genero(item.nombre, item.grupos, item.artistas, item.albumes, item.canciones)));
        } // Deberia hacer un else para crear la base o algo asi
        this.displayMod = this.coleccion;
    }
    addCancion(n: string, g: string[], art: string[], alb: string[], c: string[]) {
        this.coleccion.push(new Genero(n, g, art, alb, c));
        this.database.get("generos").push({nombre: n, grupos: g, artistas: g, albumes: alb, canciones: c}).write();
    }
    deleteCancion(n: string) {
        this.database.get("generos").remove({nombre: n}).write();
        this.coleccion = this.coleccion.filter(element => {return element.getNombre() !== n});
      }
      deleteCancionesVector(gs: string[]) {
        gs.forEach(e => {
          this.database.get("generos").remove({nombre: e}).write();
          this.coleccion = this.coleccion.filter(buenas => {return buenas.getNombre() !== e});
        });
      }
      getCancion(n: number): Genero {
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
    getCancionByName(n: string): Genero | undefined {
      return this.coleccion.find((element) => {
        element.getNombre() === n;
      });
    }
}