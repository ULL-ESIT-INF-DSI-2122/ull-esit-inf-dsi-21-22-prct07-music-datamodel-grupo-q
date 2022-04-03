import {Genero} from "..";
import {Artista} from "..";
import {Album} from "..";

export class Grupo {
  constructor(
    private nombre_: string,
    private componentes_: Artista[], /* o Artista*/
    private añoCreacion_: number,
    private generos_: Genero[],
    private albumes_: Album[],
    private oyentesMensuales_: number) { }

  getNombre(): string {
    return this.nombre_;
  }
  getComponentes(): Artista[] {
    return this.componentes_;
  }
  getAñoCreacion(): number {
    return this.añoCreacion_;
  }
  getGeneros(): Genero[] {
    return this.generos_;
  }
  getAlbumes(): Album[] {
    return this.albumes_;
  }
  getOyentes(): number {
    return this.oyentesMensuales_;
  }

  setNombre(nombre: string): void {
    this.nombre_ = nombre;
  }
  setComponentes(componentes: Artista[]): void {
      this.componentes_ = componentes;
  }
  setAñoCreacion(añocreacion: number): void {
    this.añoCreacion_ = añocreacion;
  }
  setGeneros(generos: Genero[]): void {
      this.generos_ = generos;
  }
  setAlbumes(albumes: Album[]): void {
      this.albumes_ = albumes;
  }
  setOyentes(oyentes: number): void {
      this.oyentesMensuales_ = oyentes;
  }
}