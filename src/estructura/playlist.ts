import lowdb from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import { schemaPlayList } from "./schema";
import {CommonOrdenable} from "../Interfaces/BaseInterface";
import * as can from "./cancion";

export class PlayList {
  private dbCanciones: can.JsonCancionCollection = new can.JsonCancionCollection([]);
  constructor(
    private nombre_: string,
    private autor_: string,
    private canciones_: string[],
    private duracion_: string,
    private generos_: string[]) {
      this.duracion_ = this.obtainDuracionFromCancion();
    }

  obtainDuracionFromCancion(): string {
    let mins: number = 0;
    let secs: number = 0;
    let v: string[] = [];
    this.canciones_.forEach(c => {
      v = this.dbCanciones.getCancionByName(c).getDuracion().split(':');
      mins += parseInt(v[0]);
      secs += parseInt(v[1]);
    });
    mins += Math.floor(secs/60);
    secs %= 60;
    return mins + ':' + ((secs < 10)? "0" + secs:secs);
  }
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
  printData() {
    console.log(this.nombre_);
    console.log('Autor: ', this.autor_);
    console.log('Canciones:');
    this.canciones_.forEach((c) => {
      console.log('   ', c);
    });
    console.log('Duracion: ', this.duracion_);
    console.log('Generos:');
    this.generos_.forEach((g) => {
      console.log('   ', g);
    });
  }
}

  export class JsonPlayListCollection implements CommonOrdenable<PlayList> {
    protected displayMod: PlayList[];
    protected database:lowdb.LowdbSync<schemaPlayList>;
    constructor(public coleccion: PlayList[]) {
      this.database = lowdb(new FileSync("dataBase/db_playlists.json"));
      if (this.database.has("playlists").value()) {
          let dbItems = this.database.get("playlists").value();
          dbItems.forEach(item => this.coleccion.push(new PlayList(item.nombre, item.autor, item.canciones, item.duracion, item.generos)));
      } // Deberia hacer un else para crear la base o algo asi
      this.displayMod = this.coleccion;
    }
    /*
    addPlayList(n: string, a: string, c: string[], d: string, g: string[]) {
        this.coleccion.push(new PlayList(n, a, c, d, g));
        this.database.get("playlists").push({nombre: n, autor: a, canciones: c, duracion: d, generos: g}).write();
    }
    deletePlayList(n: string) {
      this.database.get("playlists").remove({nombre: n}).write();
      this.coleccion = this.coleccion.filter(element => {element.getNombre() !== n;});
    }
    deletePlayListVector(gs: string[]) {
      gs.forEach(e => {
        this.database.get("playlists").remove({nombre: e}).write();
        this.coleccion = this.coleccion.filter(buenas => {buenas.getNombre() !== e;});
      });
    }
    */
    getPlayList(n: number): PlayList {
        return this.coleccion[n];
    }
    getPlayListByName(n: string): PlayList | undefined {
      return this.coleccion.find(e => e.getNombre() === n);
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
    ordDuracion(asc: boolean): PlayList[] {
      this.displayMod = this.coleccion;
      if (asc) {
        this.displayMod.sort((a, b) => a.getDuracion().localeCompare(b.getDuracion()));
      } else {
        this.displayMod.sort((a, b) => b.getDuracion().localeCompare(a.getDuracion()));
      }
      return this.displayMod;
    }
    ordReproduccionesPlaylist(asc: boolean, n: number) {
      if (asc) {
        this.coleccion[n][1].sort((a, b) => a.getReproducciones() - b.getReproducciones());
      } else {
        this.coleccion[n][1].sort((a, b) => b.getReproducciones() - a.getReproducciones());
      }
    }
    displayOrdenedPlayList() {
      console.log('──────────────────────────');
      this.displayMod.forEach((album)=> {
        album.printData();
        console.log('──────────────────────────');
      });
    }
}
