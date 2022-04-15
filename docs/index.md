---
title: "Práctica 7 - Digitalizando la colección de música de los abuelos"
---

# Introducción

En esta práctica grupal se pretente crear un diseño de un sistema de información que permita almacenar una biblioteca de música. Para ello usaremos los módulos *Inquirer *Lowdb*, los cuales nos permitirán gestionar la línea de comandos de forma intercativa y tener información almacenada de forma persistente.

# Estructura 

A continuación se explicará la estructura y diseño de las clases e interfaces necesarias para el desarrollo de los elementos de la colección de música.

## Elementos de la colección

Para la representación de los diversos elementos se ha creado un clase para cada uno de estos con sus atributos correspondientes. Estas clases solo tienen métodos *getter* y setter*, además de uno para mostrar los todos lo atributos. Los constructores de las clases son los siguientes:

```
export class PlayList {
    constructor(
      private nombre_: string,
      private autor_: string,
      private canciones_: string[],
      private duracion_: string,
      private generos_: string[]) {}

export class Album {
    constructor(
      private nombre_: string,
      private autor_: string,
      private añoPublicacion_: number,
      private generos_: string[],
      private canciones_: string[]) {}

export class Genero {
  constructor(
    private nombre_: string,
    private grupos_: string[],
    private artistas_: string[],
    private albumes_: string[],
    private canciones_: string[]) {}

export class Grupo {
  constructor(
    private nombre_: string,
    private componentes_: string[], /* o Artista*/
    private añoCreacion_: number,
    private generos_: string[],
    private albumes_: string[],
    private oyentesMensuales_: number) {}

export class PlayList {
    constructor(
      private nombre_: string,
      private autor_: string,
      private canciones_: string[],
      private duracion_: string,
      private generos_: string[]) {}

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
```

Como se puede ver, el constructor de la clase `Artista` es diferente a los demás ya que para obtener el número de *oyentes* debemos calcular la suma entre sus canciones individules y en grupo. Por lo tanto calcula esta valor a partir de dos colecciones, una de canciones y otra de grupos de las culaes podemos obtener los valores necesarios. El propósito de esta colecciones y su funcionamiento se exoplicarán a continuación.

## Lowdb y funcionamiento básico

A la hora de usar *lowdb* para la persistencia de los datos, dado que funciona con archivos de extensión *.json*, debemos encontrar una manera de adaptar las clases para poder introducir y obtener datos de los archivos .json. Para ello se han creado unos tipos de datos que simulan la estructura de cada una de las clases, con los que se podrá adaptar los elementos de la clase para poder crear y leer elementos .json haciendo uso de *lowdb*:

```
export type schemaCancion = {
    canciones: {nombre: string, autor: string, generos: string[], duracion: string, single: boolean, reproducciones: number}[]
};

export type schemaGenero = {
    generos: {nombre: string, grupos: string[], artistas: string[], albumes: string[], canciones: string[]}[]
};

export type schemaGrupo = {
    grupos: {nombre: string, componentes: string[], año: number, generos: string[], albumes: string[], oyentes: number}[]
};

export type schemaAlbum = {
    albumes: {nombre: string, autor: string, año: number, generos: string[], canciones: string[]}[]
};

export type schemaArtista = {
    artistas: {nombre: string, grupos: string[], generos: string[], albumes: string[], canciones: string[]}[]
};

export type schemaPlayList = {
    playlists: {nombre: string, canciones: string[], duracion: string, generos: string[]}[]
};
```

De esta manera ya se pueden crear y leer de las clases en formato .json. No obstante necesitamos una clase que nos permita administrar la modificación de los datos dentro de los archivos .json y la persistencia de datos. Por ello cada uno uno de los elementos de la colección musical tendrá una clase que administre una colección de dicho elemento y se encargará de aplicar la persistencia de datos. Además con ella se realizará la gestión de cada elemento exceptuando las playlists. Por ejemplo veamos la clase `JsonCancionCollection`, que se tratará de una colección de canciones:

```
export class JsonCancionCollection implements CommonOrdenable<Cancion>, CancionOrdenable {
    private displayMod: Cancion[];
    private database:lowdb.LowdbSync<schemaCancion>;
    constructor(public coleccion: Cancion[]) {
        this.database = lowdb(new FileSync("dataBase/db_canciones.json"));
        if (this.database.has("canciones").value()) {
            let dbItems = this.database.get("canciones").value();
            dbItems.forEach(item => this.coleccion.push(new Cancion(item.nombre, item.autor, item.generos, item.duracion, item.single, item.reproducciones)));
          } // Deberia hacer un else para crear la base o algo asi
          this.displayMod = this.coleccion;
    }
    displayCanciones() {
    console.log('──────────────────────────');
    this.coleccion.forEach((cancion)=> {
      cancion.printData();
      console.log('──────────────────────────');
    });
  }
  displayMode() {
    console.log('──────────────────────────');
    this.displayMod.forEach((cancion)=> {
      cancion.printData();
      console.log('──────────────────────────');
    });
  }
}
```

Como se puede ver, la clase tendrá un atributo *lowdb*, el cual será de tipo del adaptador para dicho elemento. Al instanciar la colección, se obtienen los datos del fichero ,son haciendo uso del atributo mencionado anteriormente y al uso del adaptador para la clase. Tras esto, ya que el adaptador y la clase comparten la misma estructura, se pueden crear objetos de `Canciones` en el caso de las canciones y las alamcenados en el atributo de tipo array `collection`. De esta forma habremos obtenido todos los datos del fichero .json y lo habremos alamcenados en un a colección que nos permitirá manejarlos y realizar consultas. Las demás colecciones creadas son muy parecidas y tienen practicamente las mismas funcionalidades.

Los métodos `add` y `delete` permiten añadir y borrar elementos de la base de datos. Actuan primero sobre el fichero .json y eliminan el elemento coincidente de este o añada uno nuevo dependiendo del método. Luego realiza lo mismo sobre el atributo `collection`. Así se consigue que las modificaciones a la base de datos se realicen de manera persistente, ya que cuando se vaya a instanciar de nuevo una colección los elementos eliminados no estarán y los añadidos con anterioridad sí. También hay métodos para comprobar la existencia de un elemento o la obtención de este a partir del nombre:

```
addCancion(n: string, a: string, g: string[], d: string, s: boolean, r: number) {
        this.coleccion.push(new Cancion(n, a, g, d, s, r));
        this.database.get("canciones").push({nombre: n, autor: a, generos: g, duracion: d, single: s, reproducciones: r}).write();
    }
    deleteCancion(n: string) {
      this.database.get("canciones").remove({nombre: n}).write();
      this.coleccion = this.coleccion.filter(element => {element.getNombre() !== n});
    }
    deleteCancionesVector(cs: string[]) {
      cs.forEach(e => {
        this.database.get("canciones").remove({nombre: e}).write();
        this.coleccion = this.coleccion.filter(buenas => {buenas.getNombre() !== e});
      });
    }
    getCancion(n: number): Cancion {
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
  getCancionByName(n: string): Cancion | undefined {
    return this.coleccion.find((element) => {
      element.getNombre() === n;
    });
  }
```

Para la visualización de la información del elementos, se implementado una serie de interfaces con el objetivo de realizar las funcionalidades de ordenación de elementos. La interfaz `CommonOrdenable` se implementa para todas las colecciones deonde se puedan obtener reproducciones y las demás son específicas para una colección:

```
export interface CommonOrdenable <T>{
  ordAlfabeticoTitulo(asc: boolean): T[];
}

// Referentes a albumes
export interface AlbumOrdenable{
  ordAño(asc: boolean): Album[];
}

// Referentes a Canciones
export interface CancionOrdenable{
  ordReproducciones(asc: boolean): Cancion[];
  ordSingles(s: boolean): Cancion[];
}
```
La implementación de las interfacces dentro de la clase `JsonCancionCollection` es la siguiente:

```
  ordSingles(s: boolean): Cancion[] {
    if (s) {
      this.displayMod = [];
      this.coleccion.forEach((e) => {
        if (e.getSingle() == true) {
          this.displayMod.push(e);
        }
      });
    } else {
      this.displayMod = this.coleccion;
    }
    return this.displayMod;
  }
  ordRepros(asc: boolean): Cancion[] {
    this.displayMod = this.coleccion;
    if (asc) {
      this.displayMod.sort((a, b) => a.getReproducciones() - b.getReproducciones());
    } else {
      this.displayMod.sort((a, b) => b.getReproducciones() - a.getReproducciones());
    }
    return this.displayMod;
  }
  ordAlfabeticoTitulo(asc: boolean): Cancion[] {
    this.displayMod = this.coleccion;
    if (asc) {
      this.displayMod.sort((a, b) => a.getNombre().localeCompare(b.getNombre()));
    } else {
      this.displayMod.sort((a, b) => b.getNombre().localeCompare(a.getNombre()));
    }
    return this.displayMod;
  }
```

# Gestión e inquirer