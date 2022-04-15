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
        let colCanciones = new JsonCancionCollection([]);
        let colGrupos = new JsonGrupoCollection([]);
        this.canciones_.forEach((cancion) => {
            if (colCanciones.includesCancion(cancion)) {
                this.grupos_.forEach((grupo) => {
                    if (colGrupos.includesGrupo(grupo)) {
                        if (colCanciones.getCancionByName(cancion).getAutor() == colGrupos.getGrupoByName(grupo).getNombre()) {
                            oyentesInd = oyentesInd + colCanciones.getCancionByName(cancion).getReproducciones();
                        }
                    }
                });
            }
        });
        this.grupos_.forEach((grupo) => {
            if (colGrupos.includesGrupo(grupo)) {
                oyentesGrup = oyentesGrup + colGrupos.getGrupoByName(grupo).getOyentes();
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
    printData() {
      console.log(this.nombre_);
      console.log('Grupos:');
      this.grupos_.forEach((g) => {
        console.log('   ', g);
      });
      console.log('Generos:');
      this.generos_.forEach((g) => {
        console.log('   ', g);
      });
      console.log('Albumes:');
      this.albumes_.forEach((a) => {
        console.log('   ', a);
      });
      console.log('Canciones:');
      this.canciones_.forEach((c) => {
        console.log('   ', c);
      });
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
        this.coleccion = this.coleccion.filter(element => {element.getNombre() !== n;});
      }
      deleteArtistaVector(gs: string[]) {
        gs.forEach(e => {
          this.database.get("artistas").remove({nombre: e}).write();
          this.coleccion = this.coleccion.filter(buenas => {buenas.getNombre() !== e;});
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
    displayOrdenedArtistas() {
      console.log('──────────────────────────');
      this.displayMod.forEach((artista)=> {
        artista.printData();
        console.log('──────────────────────────');
      });
    }
}