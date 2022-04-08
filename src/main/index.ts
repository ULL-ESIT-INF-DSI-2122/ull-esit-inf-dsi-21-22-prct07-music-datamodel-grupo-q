import * as inquirer from 'inquirer';
import { Genero } from '../estructura/genero';
import * as can from '../estructura/cancion';
import { Cancion } from '..';
let scanf = require('scanf');

// Funcion sleep para que las pantallas no salten automaticas
function sleep(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

// Mas adelante buscare la manera de que PromptUser reciba
// los datos sin ser una variable global
const col: can.JsonCancionCollection = new can.JsonCancionCollection([]);

enum Comandos{
  Add = "Añadir cancion",
  List = "Listar canciones",
  Delete = "Borrer cancion",
  escuchada = "Marcar como escuchada",
  Toggle = "Show/Hide escuchadas",
  Purge = "Borrar Canciones",
  Quit = "Quit"
}

function promptDelete() {
  enum CDel {
    Borrar = "Borrar una cancion",
    Quit = "Salir"
  }
  console.clear();
  inquirer.prompt({ type: "list", name: "DelCan", message: "Añadir Canciones:",
                    choices: Object.values(CDel)})
      .then(answers => {
        switch (answers["DelCan"]) {
          case CDel.Borrar:
            process.stdout.write('Nombre> ');
            const n: string = scanf('%s');
            if (col.deleteCancion(n)) {
              console.log(n, " se elimino correctamente.");
            } else {
              console.log('Error. ', n, ' no se encontro en Guardados.');
            }
            // sleep(3);
            promptUser();
            break;
          case CDel.Quit:
            promptUser();
            break;
        }
      });
}


function promptAdd() {
  enum CAdd {
    Nueva = "Añadir una cancion nueva",
    Existente = "Añadir una cancion existente",
    Quit = "Salir"
  }
  console.clear();
  inquirer.prompt({ type: "list", name: "AddCancion", message: "Añadir Canciones:",
                    choices: Object.values(CAdd)})
      .then(answers => {
        switch (answers["AddCancion"]) {
          case CAdd.Nueva:
            process.stdout.write('Nombre> ');
            const n: string = scanf('%s');
            process.stdout.write('Autor> ');
            const a: string = scanf('%s');
            process.stdout.write('Duracion> ');
            const d: string = scanf('%s');
            process.stdout.write('Single?> ');
            const s: boolean = (scanf('%d') > 0)? true: false;
            process.stdout.write('Reproducciones> ');
            const r: number = scanf('%d');
            // const c: Cancion = new Cancion(n, a, [], d, s, r);
            col.addCancion(n, a, [], d, s, r);
            promptUser();
            break;
          case CAdd.Existente:
            promptUser();
            break;
          case CAdd.Quit:
            promptUser();
            break;
        }
      });
}

function promptList() {
  enum CList{
    Ordenar = "Ordenar",
    Quit = "Salir"
  }
  console.clear();
  col.displayCanciones();
  inquirer.prompt({
    type: "list",
    name: "comand",
    message: "Teclee para continuar",
    choices: Object.values(CList),
  }).then(answers => {
    switch (answers["comand"]) {
      case CList.Ordenar:
        console.log('Ordeno las listas');
        promptList();
        break;
      case CList.Quit:
        promptUser();
        break;
    }
  });
}

function promptUser(): void {
  let showEscuchadas: boolean = false;
  console.clear();
  inquirer.prompt({
          type: "list",
          name: "command",
          message: "Choose option",
          choices: Object.values(Comandos),
  }).then((answers) => {
      switch (answers["command"]) {
          case Comandos.Toggle:
              showEscuchadas = !showEscuchadas;
              promptUser();
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
          /* case Comandos.escuchada:
              if (collection.getItemCounts().inescuchada > 0) {
                  promptescuchada();
              } else {
                  promptUser();
              }
              break; */
          case Comandos.Purge:
              promptUser();
              break;
      }
  });
}

promptUser();