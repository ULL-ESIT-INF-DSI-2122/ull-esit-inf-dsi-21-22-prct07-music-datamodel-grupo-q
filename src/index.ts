export class Grupo {
  constructor(
    private nombre_: string,
    private componentes_: Artista[], /* o Artista*/
    private añoCreacion_: number,
    private generos_: Genero[],
    private albumes_: Album[],
    private oyentesMensuales_: number) {}
}

export class Artista {
  constructor(
    private nombre_: string,
    private grupos_: Grupo[], /* o Artista*/
    private generos_: Genero[],
    private albumes_: Album[],
    private canciones_: Cancion[],
    private oyentesMensuales_: number /* suma de los oyentes en sus grupos mas las de sus canciones propias */) {}
}

export class Genero {
  constructor(
    private nombre_: string,
    private gruposOArtistas_: (Grupo | Artista)[], /* hay que hacer una interfaz generica para no usar union de tipos*/
    private albumes_: Album[],
    private canciones_: Cancion[]) {}
}

export class Cancion {
  constructor(
    private nombre_: string,
    private autor_: string, /* o Artista*/
    private duracion_: string,
    private single_: boolean,
    private reproducciones_: number) {}
}

export class Album {
  constructor(
    private nombre_: string,
    private autor_: string, /* o Artista*/
    private añoPublicacion_: number,
    private generos_: Genero[],
    private reproducciones_: number) {}
}

export class PlayList {
  constructor(
    private nombre_: string,
    private autor_: string, /* o Artista*/
    private canciones_: Cancion[],
    private generos_: Genero[],
    private duracion_: string) {}
}