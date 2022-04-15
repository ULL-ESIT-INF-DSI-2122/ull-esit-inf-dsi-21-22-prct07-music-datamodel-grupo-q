import * as inquirer from 'inquirer';
let scanf = require('scanf');
import {mainPrompt} from './index';
import {Gestor} from '../estructura/gestor';

const gestor: Gestor = new Gestor();

let asc: boolean = false; // Determina si se ordena ascendente o descendentemente

export function promptDelete() { // col.coleccion.map(e => e.getNombre())
  console.clear();
  inquirer.prompt({
       type: "checkbox", name: "Del",
       message: "Seleccione las canciones que quiera borrar: ",
       choices: gestor.coleccion.map(e => e.getNombre())})
      .then(answers => {
        let borradas = answers["Del"] as string[];
        gestor.deletePlayListVector(borradas);
        promptUser();
      });
}

export function promptMod() {
  enum CMod {
    Mod = "Modificar",
    Quit = "Salir"
  }
  console.clear();
  inquirer.prompt({ type: "list", name: "Mod", message: "Modificar Playlist:",
                    choices: Object.values(CMod)})
      .then(answers => {
        switch (answers["Mod"]) {
          case CMod.Mod:

            process.stdout.write('Nombre> ');
            const n: string = scanf('%s');
            if (gestor.includesPlayList(n)) {
              process.stdout.write('Autor> ');
              const a: string = scanf('%s');
              process.stdout.write('Generos separados por ","> ');
              const b: string = scanf('%s');
              const g: string[] = b.split(',');
              process.stdout.write('Canciones separadas por ","> ');
              const e: string = scanf('%s');
              const c: string[] = e.split(',');
              gestor.deletePlayList(n, "sistema");
              // Hay que calcular la duracion segun sus canciones
              // plaCol.addPlayList(n, a, d, g, c);
            } else {
              console.log(n, ' no esta guardada.');
              console.log('Pulse cualquier tecla para continuar.');
              scanf('%s');
            }
            promptUser();
            break;
          case CMod.Quit:
            promptUser();
            break;
        }
      });
}

export function promptAdd() {
  enum CAdd {
    Nueva = "Añadir un Album nuevo",
    Quit = "Salir"
  }
  console.clear();
  inquirer.prompt({ type: "list", name: "AddAlbum", message: "Añadir Album:",
                    choices: Object.values(CAdd)})
      .then(answers => {
        switch (answers["AddAlbum"]) {
          case CAdd.Nueva:
            process.stdout.write('Nombre> ');
            const n: string = scanf('%s');
            if (!gestor.includesPlayList(n)) {
              process.stdout.write('Autor> ');
              const a: string = scanf('%s');
              process.stdout.write('Año de publicacion> ');
              const d: number = scanf('%d');
              process.stdout.write('Generos separados por ","> ');
              const b: string = scanf('%s');
              const g: string[] = b.split(',');
              process.stdout.write('Canciones separadas por ","> ');
              const e: string = scanf('%s');
              const c: string[] = e.split(',');
              // plaCol.addPlayList(n, a, d, g, c);
            } else {
              console.log(n, ' ya esta registrada.');
              console.log('Pulse cualquier tecla para continuar.');
              scanf('%s');
            }
            promptUser();
            break;
          case CAdd.Quit:
            promptUser();
            break;
        }
      });
}

export function promptOrd() {
  enum COrd{
    Nom = "Nombre",
    Dur = "Duracion",
    Quit = "Salir"
  }
  console.clear();
  inquirer.prompt({
    type: "list",
    name: "comand",
    message: "Teclee para continuar",
    choices: Object.values(COrd),
  }).then(answers => {
    asc = !asc;
    switch (answers["comand"]) {
      case COrd.Nom:
        promptList();
        gestor.ordAlfabeticoTitulo(asc);
        break;
        case COrd.Dur:
          gestor.ordDuracion(asc);
        promptList();
        break;
      case COrd.Quit:
        promptUser();
        break;
    }
  });
}

export function promptList() {
  enum CList{
    Ordenar = "Ordenar",
    Quit = "Salir"
  }
  console.clear();
  gestor.displayOrdenedPlayList();
  inquirer.prompt({
    type: "list",
    name: "comand",
    message: "Teclee para continuar",
    choices: Object.values(CList),
  }).then(answers => {
    switch (answers["comand"]) {
      case CList.Ordenar:
        promptOrd();
        break;
      case CList.Quit:
        promptUser();
        break;
    }
  });
}

export function promptUser(): void {

  enum Comandos{
    Add = "Añadir Playlist",
    List = "Listar Playlists",
    Delete = "Borrer Playlist",
    Mod = 'Modificar Playlist',
    Quit = "Quit"
  }
  console.clear();
  inquirer.prompt({
          type: "list",
          name: "command",
          message: "Elija una opcion:",
          choices: Object.values(Comandos),
  }).then((answers) => {
    switch (answers["command"]) {
      case Comandos.List:
        promptList();
        break;
      case Comandos.Add:
        promptAdd();
        break;
      case Comandos.Delete:
        promptDelete();
          break;
      case Comandos.List:
        promptList();
        break;
      case Comandos.Mod:
        promptMod();
        break;
      case Comandos.Quit:
        mainPrompt();
        break;
    }
  });
}