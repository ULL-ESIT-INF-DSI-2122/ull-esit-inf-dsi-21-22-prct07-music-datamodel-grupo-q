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

function promptDelete() {
  enum CDel {
    Borrar = "Borrar una cancion exisitente",
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
            // if (col.getCancionByName(n) != undefined) {
              col.deleteCancion(n);
              console.log(n, " se elimino correctamente.");
            // } else {
            //  console.log('Error. ', n, ' no se encontro en Guardados.');
            // }
            sleep(3000);
            scanf('%s');
            promptUser();
            break;
          case CDel.Quit:
            promptUser();
            break;
        }
      });
}

function promptDeleteExisting() { // col.coleccion.map(e => e.getNombre())
  console.clear();
  inquirer.prompt({
       type: "checkbox", name: "DelCanEx",
       message: "Seleccione las canciones que quiera borrar: ",
                    choices: col.coleccion.map(e => e.getNombre())})
      .then(answers => {
        let borradas = answers["DelCanEx"] as string[];
        col.deleteCancionesVector(borradas);
        promptUser();
      });
}

function promptMod() {
  enum CMod {
    Mod = "Modificar",
    Quit = "Salir"
  }
  console.clear();
  inquirer.prompt({ type: "list", name: "ModCancion", message: "Modificar Canciones:",
                    choices: Object.values(CMod)})
      .then(answers => {
        switch (answers["ModCancion"]) {
          case CMod.Mod:

            process.stdout.write('Nombre> ');
            const n: string = scanf('%s');
            if (col.includesCancion(n)) {
              process.stdout.write('Autor> ');
              const a: string = scanf('%s');
              process.stdout.write('Duracion> ');
              const d: string = scanf('%s');
              process.stdout.write('Single?> ');
              const s: boolean = (scanf('%d') > 0)? true: false;
              process.stdout.write('Reproducciones> ');
              const r: number = scanf('%d');
              col.deleteCancion(n);
              col.addCancion(n, a, [], d, s, r);
            } else {
              console.log(n, ' no esta guardada.');
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

function promptOrdenCancion() {
  enum OrdenCancion {
    Single = "Mostrar / Ocultar Singles",
    Repr = "Por numero de reproducciones"
  }
    console.clear();
    inquirer.prompt({
        type: "list", name: "OrdenCan",
        message: "Seleccione las canciones que quiera borrar: ",
        choices: Object.values(OrdenCancion)})
        .then(answers => {
          switch (answers["OrdenCan"]) {
            case OrdenCancion.Single:
              col.ordSingles();
              promptList();
              break;
            case OrdenCancion.Repr:
              col.ordRepros(true);
              promptList();
              break;
            default:
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
  col.displayMode();
  inquirer.prompt({
    type: "list",
    name: "comand",
    message: "Teclee para continuar",
    choices: Object.values(CList),
  }).then(answers => {
    switch (answers["comand"]) {
      case CList.Ordenar:
        promptOrdenCancion();
        break;
      case CList.Quit:
        promptUser();
        break;
    }
  });
}

function promptUser(): void {

  enum Comandos{
    Add = "Añadir cancion",
    List = "Listar canciones",
    Delete = "Borrer cancion",
    Mod = 'Modificar cancion',
    escuchada = "Marcar como escuchada",
    Toggle = "Show/Hide escuchadas",
    Purge = "Borrar Canciones",
    Quit = "Quit"
  }
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
            promptDeleteExisting();
              break;
          case Comandos.List:
            promptList();
            break;
          case Comandos.Mod:
            promptMod();
            break;
          case Comandos.Purge:
              promptUser();
              break;
      }
  });
}

promptUser();