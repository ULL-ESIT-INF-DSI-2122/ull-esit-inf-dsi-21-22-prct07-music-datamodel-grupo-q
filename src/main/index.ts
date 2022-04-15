import * as inquirer from 'inquirer';
let scanf = require('scanf');

// Pantallas de cada uno de los datos almacenados
import * as can from './cancionInq';
import * as gru from './grupoInq';
import * as gen from './generoInq';
import * as alb from './albumInq';

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
          alb.promptUser();
          break;
        case Comandos.gen:
          gen.promptUser();
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