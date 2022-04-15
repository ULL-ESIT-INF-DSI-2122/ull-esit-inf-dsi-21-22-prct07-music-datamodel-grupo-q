import lowdb from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import { schemaPlayList } from "./schema";
import {CommonOrdenable} from "../Interfaces/BaseInterface";
import * as can from "./cancion";
import * as pla from "./playlist";

enum Att {Nombre, Autor, Canciones, Duracion, Generos};

export class Gestor extends pla.JsonPlayListCollection {
  private user: string;
  constructor() {
    super([]);
  }
  addPlayList(nuevo: boolean, existente: number = 0, n: string, a: string, c: string[], d: string, g: string[]) {
    if (nuevo) {
      this.coleccion.push(new pla.PlayList(n, a, c, d, g));
      this.database.get("playlists").push({nombre: n, autor: a, canciones: c, duracion: d, generos: g}).write();
    } else {
      c.push(this.coleccion[existente][1]);
      d = d + this.coleccion[existente][2];
      g.push(this.coleccion[existente][3]);
      this.coleccion.push(new pla.PlayList(n, a, c, d, g));
    }
  }
  deletePlayList(n: string, ususario: string) {
    if ((this.getPlayListByName(n).getAutor() != 'Sistema')&&(this.getPlayListByName(n).getAutor() == 'Usuario')) {
      this.database.get("playlists").remove({nombre: n}).write();
      this.coleccion = this.coleccion.filter(element => {element.getNombre() !== n;});
    }
  }
  deletePlayListVector(gs: string[]) {
    gs.forEach(e => {
      this.database.get("playlists").remove({nombre: e}).write();
      this.coleccion = this.coleccion.filter(buenas => {buenas.getNombre() !== e;});
    });
  }
  getPlayList(n: number): pla.PlayList {
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
  ordAlfabeticoTitulo(asc: boolean): pla.PlayList[] {
    this.displayMod = this.coleccion;
    if (asc) {
      this.displayMod.sort((a, b) => a.getNombre().localeCompare(b.getNombre()));
    } else {
      this.displayMod.sort((a, b) => b.getNombre().localeCompare(a.getNombre()));
    }
    return this.displayMod;
}
  getPlayListByName(n: string): pla.PlayList | undefined {
    return this.coleccion.find((element) => {
      element.getNombre() === n;
    });
  }
  /**
   * Usa un metodo generico para asignar un valor de un determinado
   * tipo en tiempo de ejecucion
   * @param n  nombre d ela playlist
   * @param a atributo a modificar
   * @param value valor a asignar
   */
  modifyPlaylist<T>(n: string, a: Att, value: T) {
    switch (a) {
      case Att.Nombre:
        this.database.get("playlists").find({nombre: n}).assign({nombre: value}).value();
        break;
      case Att.Autor:
        this.database.get("playlists").find({nombre: n}).assign({autor: value}).value();
        break;
      case Att.Canciones:
        this.database.get("playlists").find({nombre: n}).assign({canciones: value}).value();
        break;
      case Att.Generos:
        this.database.get("playlists").find({nombre: n}).assign({generos: value}).value();
        break;
      case Att.Duracion:
        this.database.get("playlists").find({nombre: n}).assign({duracion: value}).value();
        break;
      default:
        break;
    }
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
  updatePlaylistNum(asc: boolean, n: number) {
    if (asc) {
      this.coleccion[n][1].sort((a, b) => a.getDuracion().localeCompare(b.getDuracion()));
    } else {
      this.coleccion[n][1].sort((a, b) => b.getDuracion().localeCompare(a.getDuracion()));
    }
  }
}