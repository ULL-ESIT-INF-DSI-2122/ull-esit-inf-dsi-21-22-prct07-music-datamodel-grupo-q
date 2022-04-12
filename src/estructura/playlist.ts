import lowdb from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import { schemaPlayList } from "./schema";
import {PlaylistOrdenable, CommonOrdenable} from "../Interfaces/BaseInterface";

export class PlayList {
    constructor(
      private nombre_: string,
      private canciones_: string[],
      private duracion_: string,
      private generos_: string[]) {}

    getNombre(): string {
        return this.nombre_;
    }
    getCanciones(): string[] {
        return this.canciones_;
    }
    getDuracion(): string {
        return this.duracion_;
    }
    getGeneros(): string[] {
        return this.generos_;
    }

    setNombre(nombre: string): void {
        this.nombre_ = nombre;
    }
    setCanciones(canciones: string[]): void {
        this.canciones_ = canciones;
    }
    setDuracion(duracion: string): void {
        this.duracion_ = duracion;
    }
    setGeneros(genero: string[]): void {
        this.generos_ = genero;
    }
  }

  export class JsonPlayListCollection implements CommonOrdenable<PlayList>{
    private displayMod: PlayList[];
    private database:lowdb.LowdbSync<schemaPlayList>; 
    constructor(public coleccion: PlayList[]) {
        this.database = lowdb(new FileSync("dataBase/db_playlists.json"));
        if (this.database.has("playlists").value()) {
            let dbItems = this.database.get("playlists").value();
            dbItems.forEach(item => this.coleccion.push(new PlayList(item.nombre, item.canciones, item.duracion, item.generos)));
        } // Deberia hacer un else para crear la base o algo asi
        this.displayMod = this.coleccion;
    }
    addPlayList(n: string, c: string[], d: string, g: string[]) {
        this.coleccion.push(new PlayList(n, c, d, g));
        this.database.get("playlists").push({nombre: n, canciones: c, duracion: d, generos: g}).write();
    }
    deletePlayList(n: string) {
        this.database.get("playlists").remove({nombre: n}).write();
        this.coleccion = this.coleccion.filter(element => { element.getNombre() !== n});
      }
      deletePlayListVector(gs: string[]) {
        gs.forEach(e => {
          this.database.get("playlists").remove({nombre: e}).write();
          this.coleccion = this.coleccion.filter(buenas => { buenas.getNombre() !== e});
        });
      }
      getPlayList(n: number): PlayList {
          return this.coleccion[n];
      }
      includesPlayList(n: string): boolean {
        let isIn: boolean = false;
        this.coleccion.forEach(element => {
          if (element.getNombre() === n) {
            isIn = true;
          }
        });
        return isIn;
    }
    getPlayListByName(n: string): PlayList | undefined {
      return this.coleccion.find((element) => {
        element.getNombre() === n;
      });
    }
    ordReproducciones(asc: boolean): PlayList[] {
      return [];
    }
}