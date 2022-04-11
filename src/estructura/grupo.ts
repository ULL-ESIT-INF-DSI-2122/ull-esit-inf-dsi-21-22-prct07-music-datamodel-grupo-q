import lowdb from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import { schemaGrupo } from "./schema";

export class Grupo {
  constructor(
    private nombre_: string,
    private componentes_: string[], /* o Artista*/
    private añoCreacion_: number,
    private generos_: string[],
    private albumes_: string[],
    private oyentesMensuales_: number) { }

  getNombre(): string {
    return this.nombre_;
  }
  getComponentes(): string[] {
    return this.componentes_;
  }
  getAñoCreacion(): number {
    return this.añoCreacion_;
  }
  getGeneros(): string[] {
    return this.generos_;
  }
  getAlbumes(): string[] {
    return this.albumes_;
  }
  getOyentes(): number {
    return this.oyentesMensuales_;
  }

  setNombre(nombre: string): void {
    this.nombre_ = nombre;
  }
  setComponentes(componentes: string[]): void {
      this.componentes_ = componentes;
  }
  setAñoCreacion(añocreacion: number): void {
    this.añoCreacion_ = añocreacion;
  }
  setGeneros(generos: string[]): void {
      this.generos_ = generos;
  }
  setAlbumes(albumes: string[]): void {
      this.albumes_ = albumes;
  }
  setOyentes(oyentes: number): void {
      this.oyentesMensuales_ = oyentes;
  }
}

export class JsonGrupoCollection {
  private displayMod: Grupo[];
  private database:lowdb.LowdbSync<schemaGrupo>;
  constructor(public coleccion: Grupo[]) {
      this.database = lowdb(new FileSync("dataBase/db_grupos.json"));
      if (this.database.has("grupos").value()) {
          let dbItems = this.database.get("grupos").value();
          dbItems.forEach(item => this.coleccion.push(new Grupo(item.nombre, item.componentes, item.año, item.generos, item.albumes, item.oyentes)));
      } // Deberia hacer un else para crear la base o algo asi
      this.displayMod = this.coleccion;
  }
  addGrupo(n: string, c: string[], a: number, g: string[], alb: string[], o: number) {
      this.coleccion.push(new Grupo(n, c, a, g, alb, o));
      this.database.get("grupos").push({nombre: n, componentes: c, año: a, generos: g, albumes: alb, oyentes: o}).write();
  }
  deleteGrupo(n: string) {
      this.database.get("grupos").remove({nombre: n}).write();
      this.coleccion = this.coleccion.filter(element => {return element.getNombre() !== n});
    }
    deleteGrupoVector(gs: string[]) {
      gs.forEach(e => {
        this.database.get("grupos").remove({nombre: e}).write();
        this.coleccion = this.coleccion.filter(buenas => {return buenas.getNombre() !== e});
      });
    }
    getGrupo(n: number): Grupo {
        return this.coleccion[n];
    }
    includesGrupo(n: string): boolean {
      let isIn: boolean = false;
      this.coleccion.forEach(element => {
        if (element.getNombre() === n) {
          isIn = true;
        }
      });
      return isIn;
  }
  getGrupoByName(n: string): Grupo | undefined {
    return this.coleccion.find((element) => {
      element.getNombre() === n;
    });
  }
}