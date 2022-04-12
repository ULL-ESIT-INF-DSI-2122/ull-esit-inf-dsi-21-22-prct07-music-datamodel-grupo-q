import lowdb from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import { schemaArtista } from "./schema";
import { Cancion } from "./cancion";
import { JsonCancionCollection } from "./cancion";
import { JsonGrupoCollection } from "./grupo";

export class Artista {
    private oyentesMensuales_: number;
    constructor(
      private nombre_: string,
      private grupos_: string[],
      private generos_: string[],
      private albumes_: string[],
      private canciones_: string[]) {
        let oyentesInd: number = 0;
        let oyentesGrup: number = 0;
        let col_canciones = new JsonCancionCollection([]);
        let col_grupos = new JsonGrupoCollection([]);
        this.canciones_.forEach((cancion) => {
            if (col_canciones.includesCancion(cancion)) {
                this.grupos_.forEach((grupo) => {
                    if (col_grupos.includesGrupo(grupo)) {
                        if (col_canciones.getCancionByName(cancion).getAutor() == col_grupos.getGrupoByName(grupo).getNombre()) {
                            oyentesInd = oyentesInd + col_canciones.getCancionByName(cancion).getReproducciones();
                        }
                    }
                });
            }
        });
        this.grupos_.forEach((grupo) => {
            if (col_grupos.includesGrupo(grupo)) {
                oyentesGrup = oyentesGrup + col_grupos.getGrupoByName(grupo).getOyentes();
            }
        });
        this.oyentesMensuales_ = oyentesInd + oyentesGrup;
      }

    getNombre(): string {
        return this.nombre_;
    }
    getGrupos(): string[] {
        return this.grupos_;
    }
    getGeneros(): string[] {
        return this.generos_;
    }
    getAlbumes(): string[] {
        return this.albumes_;
    }
    getCanciones(): string[] {
        return this.canciones_;
    }
    getOyentes(): number {
        return this.oyentesMensuales_;
    }

    setNombre(nombre: string): void {
        this.nombre_ = nombre;
    }
    setGrupos(grupos: string[]): void {
        this.grupos_ = grupos;
    }
    setGeneros(generos: string[]): void {
        this.generos_ = generos;
    }
    setAlbumes(albumes: string[]): void {
        this.albumes_ = albumes;
    }
    setCanciones(canciones: string[]): void {
        this.canciones_ = canciones;
    }
    setOyentes(oyentes: number): void {
        this.oyentesMensuales_ = oyentes;
    }
  }

  export class JsonArtistaCollection {
    private displayMod: Artista[];
    private database:lowdb.LowdbSync<schemaArtista>; 
    constructor(public coleccion: Artista[]) {
        this.database = lowdb(new FileSync("dataBase/db_artistas.json"));
        if (this.database.has("artistas").value()) {
            let dbItems = this.database.get("artistas").value();
            dbItems.forEach(item => this.coleccion.push(new Artista(item.nombre, item.grupos, item.generos, item.albumes, item.canciones)));
        } // Deberia hacer un else para crear la base o algo asi
        this.displayMod = this.coleccion;
    }
    addArtista(n: string, g: string[], gen: string[], alb: string[], c: string[]) {
        this.coleccion.push(new Artista(n, g, gen, alb, c));
        this.database.get("artistas").push({nombre: n, grupos: g, generos: g, albumes: alb, canciones: c}).write();
    }
    deleteArtista(n: string) {
        this.database.get("artistas").remove({nombre: n}).write();
        this.coleccion = this.coleccion.filter(element => { element.getNombre() !== n});
      }
      deleteArtistaVector(gs: string[]) {
        gs.forEach(e => {
          this.database.get("artistas").remove({nombre: e}).write();
          this.coleccion = this.coleccion.filter(buenas => { buenas.getNombre() !== e});
        });
      }
      getArtista(n: number): Artista {
          return this.coleccion[n];
      }
      includesArtista(n: string): boolean {
        let isIn: boolean = false;
        this.coleccion.forEach(element => {
          if (element.getNombre() === n) {
            isIn = true;
          }
        });
        return isIn;
    }
    getArtistaByName(n: string): Artista | undefined {
      return this.coleccion.find((element) => {
        element.getNombre() === n;
      });
    }
}