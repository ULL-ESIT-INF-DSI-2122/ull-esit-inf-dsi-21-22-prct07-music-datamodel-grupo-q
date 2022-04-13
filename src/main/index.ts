import * as inquirer from 'inquirer';
import { Genero } from '../estructura/genero';
import * as can from './cancionInq';
import * as gru from './grupoInq';
let scanf = require('scanf');


// Mas adelante buscare la manera de que PromptUser reciba
// los datos sin ser una variable global

// const grupoCol: gru.JsonGrupoCollection = new gru.JsonGrupoCollection([]);
// const col: can.JsonCancionCollection = new can.JsonCancionCollection([]);
// const col: can.JsonCancionCollection = new can.JsonCancionCollection([]);
// const col: can.JsonCancionCollection = new can.JsonCancionCollection([]);

export function mainPrompt(): void {
  let quit: boolean = false;
  enum Comandos{
    can = "Canciones",
    gru = "Grupos",
    alb = "Albumes",
    gen = "Generos",
    pla = "Playlists",
    Quit = "Quit"
  }
  console.clear();
  inquirer.prompt({
          type: "list",
          name: "command",
          message: "Seleccione los datos que desea visualizar",
          choices: Object.values(Comandos),
  }).then((answers) => {
    switch (answers["command"]) {
        case Comandos.can:
            can.promptUser();
            break;
        case Comandos.gru:
            gru.promptUser();
            break;
        case Comandos.alb:
            break;
        case Comandos.gen:
          break;
        case Comandos.pla:
          break;
        case Comandos.Quit:
          quit = true;
          console.log('Hasta pronto.');
          break;
    }
  });
}

mainPrompt();