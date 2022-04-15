import lowdb from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import { schemaPlayList } from "./schema";
import {CommonOrdenable} from "../Interfaces/BaseInterface";

export class PlayList {
    constructor(
      private nombre_: string,
      private autor_: string,
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
    getAutor(): string {
      return this.autor_;
    }

    setNombre(nombre: string): void {
        this.nombre_ = nombre;
    }
    setAutor(autor:string): void {
        this.autor_ = autor;
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

  export class Gestor implements CommonOrdenable<PlayList>{
    private displayMod: PlayList[];
    private database:lowdb.LowdbSync<schemaPlayList>;
    constructor(public coleccion: PlayList[]) {
        this.database = lowdb(new FileSync("dataBase/db_playlists.json"));
        if (this.database.has("playlists").value()) {
            let dbItems = this.database.get("playlists").value();
            dbItems.forEach(item => this.coleccion.push(new PlayList(item.nombre, item.autor, item.canciones, item.duracion, item.generos)));
        } // Deberia hacer un else para crear la base o algo asi
        this.displayMod = this.coleccion;
    }
    
    addPlayList(nuevo: boolean, existente: number = 0, n: string, a: string, c: string[], d: string, g: string[]) {
      if (nuevo) {
        this.coleccion.push(new PlayList(n, a, c, d, g));
        this.database.get("playlists").push({nombre: n, canciones: c, duracion: d, generos: g}).write();
      } else {
        c.push(this.coleccion[existente][1]);
        d = d + this.coleccion[existente][2];
        g.push(this.coleccion[existente][3]);
        this.coleccion.push(new PlayList(n, a, c, d, g));
      }
    }
    deletePlayList(n: string, ususario: string) {
      if((this.getPlayListByName(n).getAutor() != 'Sistema')&&(this.getPlayListByName(n).getAutor() == 'Usuario'))
        this.database.get("playlists").remove({nombre: n}).write();
        this.coleccion = this.coleccion.filter(element => {element.getNombre() !== n;});
      }
      deletePlayListVector(gs: string[]) {
        gs.forEach(e => {
          this.database.get("playlists").remove({nombre: e}).write();
          this.coleccion = this.coleccion.filter(buenas => {buenas.getNombre() !== e;});
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
    ordAlfabeticoTitulo(asc: boolean): PlayList[] {
      this.displayMod = this.coleccion;
      if (asc) {
        this.displayMod.sort((a, b) => a.getNombre().localeCompare(b.getNombre()));
      } else {
        this.displayMod.sort((a, b) => b.getNombre().localeCompare(a.getNombre()));
      }
      return this.displayMod;
  }
    getPlayListByName(n: string): PlayList | undefined {
      return this.coleccion.find((element) => {
        element.getNombre() === n;
      });
    }
    updateAlfPlaylistCan(asc: boolean, n: number) {
      if (asc) {
        this.coleccion[n][1].sort((a, b) => a.getNombre().localeCompare(b.getNombre()));
      } else {
        this.coleccion[n][1].sort((a, b) => b.getNombre().localeCompare(a.getNombre()));
      }
    }
    updateAlfPlaylistAut(asc: boolean, n: number) {
      if (asc) {
        this.coleccion[n][1].sort((a, b) => a.getAutor().localeCompare(b.getAutor()));
      } else {
        this.coleccion[n][1].sort((a, b) => b.getAutor().localeCompare(a.getAutor()));
      }
    }
    updateAlfPlaylistGenero(asc: boolean, n: number) {
      if (asc) {
        this.coleccion[n][1].sort((a, b) => a.getGeneros().localeCompare(b.getGeneros()));
      } else {
        this.coleccion[n][1].sort((a, b) => b.getGeneros().localeCompare(a.getGeneros()));
      }
    }
    updatePlaylistAño(asc: boolean, n: number) {
      if (asc) {
        this.coleccion[n][1].sort((a, b) => a.getAño() - b.getAño());
      } else {
        this.coleccion[n][1].sort((a, b) => b.getAño() - a.getAño());
      }
    }
    updatePlaylistDur(asc: boolean, n: number) {
      if (asc) {
        this.coleccion[n][1].sort((a, b) => a.getDuracion().localeCompare(b.getDuracion()));
      } else {
        this.coleccion[n][1].sort((a, b) => b.getDuracion().localeCompare(a.getDuracion()));
      }
    }

    ordReproduccionesPlaylist(asc: boolean, n: number) {
      if (asc) {
        this.coleccion[n][1].sort((a, b) => a.getReproducciones() - b.getReproducciones());
      } else {
        this.coleccion[n][1].sort((a, b) => b.getReproducciones() - a.getReproducciones());
      }
    }
}