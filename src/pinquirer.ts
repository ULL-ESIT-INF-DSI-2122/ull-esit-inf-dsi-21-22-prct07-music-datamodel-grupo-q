// https://www.npmjs.com/package/inquirer#documentation

export class Cancion {
  public id: number;
  public cancion_: string;
  public escuchada: boolean = false;
  public constructor(id: number, cancion_: string, escuchada: boolean = false) {
      this.id = id;
      this.cancion_ = cancion_;
      this.escuchada = escuchada;
  }
  public printDetails() : void {
      console.log(`${this.id}\t${this.cancion_} ${this.escuchada? "\t(escuchada)": ""}`);
  }
}

type ItemCounts = {
  total: number,
  inescuchada: number
}
export class TodoCollection {
  private nextId: number = 1;
  private itemMap = new Map<number, Cancion>();
  constructor(public userName: string, Cancions: Cancion[] = []) {
      Cancions.forEach(item => this.itemMap.set(item.id, item));
  }
  addTodo(cancion_: string): number {
      while (this.getTodoById(this.nextId)) {
          this.nextId++;
      }
      this.itemMap.set(this.nextId, new Cancion(this.nextId, cancion_));
      return this.nextId;
  }
  getTodoById(id: number) : Cancion | undefined {
      return this.itemMap.get(id);
  }
  getCancions(includeescuchada: boolean): Cancion[] {
      return [...this.itemMap.values()]
          .filter(item => includeescuchada || !item.escuchada);
  }
  markescuchada(id: number, escuchada: boolean) {
      const Cancion = this.getTodoById(id);
      if (Cancion) {
          Cancion.escuchada = escuchada;
      }
  }
  removeescuchada() {
      this.itemMap.forEach(item => {
          if (item.escuchada) {
              this.itemMap.delete(item.id);
          }
      });
  }
  getItemCounts(): ItemCounts {
      return {
          total: this.itemMap.size,
          inescuchada: this.getCancions(false).length};
  }
}

import * as inquirer from 'inquirer';
let todos: Cancion[] = [
    new Cancion(1, "Buy Flowers"), new Cancion(2, "Get Shoes"),
    new Cancion(3, "Collect Tickets"), new Cancion(4, "Call Joe", true)];
let collection: TodoCollection = new TodoCollection("Adam", todos);
let showescuchadad = true;
function displayTodoList(): void {
    console.log(`${collection.userName}'s Todo List ` +
               `(${ collection.getItemCounts().inescuchada } items to do)`);
    collection.getCancions(showescuchadad).forEach(item => item.printDetails());
}
enum Commands {
    Add = "Add New cancion_",
    escuchada = "escuchada cancion_",
    Toggle = "Show/Hide escuchadad",
    Purge = "Remove escuchadad cancion_s",
    Quit = "Quit"
}
function promptAdd(): void {
    console.clear();
    inquirer.prompt({ type: "input", name: "add", message: "Enter cancion:"})
        .then(answers => {
            if (answers["add"] !== "") {
                collection.addTodo(answers["add"]);
            }
            promptUser();
        });
}
function promptescuchada(): void {
    console.clear();
    inquirer.prompt({
        type: "checkbox", name: "escuchada",
        message: "Mark cancion_s escuchada",
        choices: collection.getCancions(showescuchadad).map(item =>
            ({name: item.cancion_, value: item.id, checked: item.escuchada}))})
    .then(answers => {
        let escuchadadcancion_s = answers["escuchada"] as number[];
        collection.getCancions(true).forEach(item =>
            collection.markescuchada(item.id,
                escuchadadcancion_s.find(id => id === item.id) != undefined));
        promptUser();
    });
}
function promptUser(): void {
    console.clear();
    displayTodoList();
    inquirer.prompt({
            type: "list",
            name: "command",
            message: "Choose option",
            choices: Object.values(Commands),
    }).then(answers => {
        switch (answers["command"]) {
            case Commands.Toggle:
                showescuchadad = !showescuchadad;
                promptUser();
                break;
            case Commands.Add:
                promptAdd();
                break;
            case Commands.escuchada:
                if (collection.getItemCounts().inescuchada > 0) {
                    promptescuchada();
                } else {
                    promptUser();
                }
                break;
            case Commands.Purge:
                collection.removeescuchada();
                promptUser();
                break;
        }
    });
}
promptUser();