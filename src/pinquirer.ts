export class TodoItem {
  public id: number;
  public task: string;
  public complete: boolean = false;
  public constructor(id: number, task: string, complete: boolean = false) {
      this.id = id;
      this.task = task;
      this.complete = complete;
  }
  public printDetails() : void {
      console.log(`${this.id}\t${this.task} ${this.complete? "\t(complete)": ""}`);
  }
}

type ItemCounts = {
  total: number,
  incomplete: number
}
export class TodoCollection {
  private nextId: number = 1;
  private itemMap = new Map<number, TodoItem>();
  constructor(public userName: string, todoItems: TodoItem[] = []) {
      todoItems.forEach(item => this.itemMap.set(item.id, item));
  }
  addTodo(task: string): number {
      while (this.getTodoById(this.nextId)) {
          this.nextId++;
      }
      this.itemMap.set(this.nextId, new TodoItem(this.nextId, task));
      return this.nextId;
  }
  getTodoById(id: number) : TodoItem {
      return this.itemMap.get(id);
  }
  getTodoItems(includeComplete: boolean): TodoItem[] {
      return [...this.itemMap.values()]
          .filter(item => includeComplete || !item.complete);
  }
  markComplete(id: number, complete: boolean) {
      const todoItem = this.getTodoById(id);
      if (todoItem) {
          todoItem.complete = complete;
      }
  }
  removeComplete() {
      this.itemMap.forEach(item => {
          if (item.complete) {
              this.itemMap.delete(item.id);
          }
      })
  }
  getItemCounts(): ItemCounts {
      return {
          total: this.itemMap.size,
          incomplete: this.getTodoItems(false).length
      };
  }
}

import * as inquirer from 'inquirer';
let todos: TodoItem[] = [
    new TodoItem(1, "Buy Flowers"), new TodoItem(2, "Get Shoes"),
    new TodoItem(3, "Collect Tickets"), new TodoItem(4, "Call Joe", true)];
let collection: TodoCollection = new TodoCollection("Adam", todos);
let showCompleted = true;
function displayTodoList(): void {
    console.log(`${collection.userName}'s Todo List `
        + `(${ collection.getItemCounts().incomplete } items to do)`);
    collection.getTodoItems(showCompleted).forEach(item => item.printDetails());
}
enum Commands {
    Add = "Add New Task",
    Complete = "Complete Task",
    Toggle = "Show/Hide Completed",
    Purge = "Remove Completed Tasks",
    Quit = "Quit"
}
function promptAdd(): void {
    console.clear();
    inquirer.prompt({ type: "input", name: "add", message: "Enter task:"})
        .then(answers => {if (answers["add"] !== "") {
            collection.addTodo(answers["add"]);
        }
        promptUser();
    })
}
function promptComplete(): void {
    console.clear();
    inquirer.prompt({
        type: "checkbox", name: "complete",
        message: "Mark Tasks Complete",
        choices: collection.getTodoItems(showCompleted).map(item =>
            ({name: item.task, value: item.id, checked: item.complete}))
    }).then(answers => {
        let completedTasks = answers["complete"] as number[];
        collection.getTodoItems(true).forEach(item =>
            collection.markComplete(item.id,
                completedTasks.find(id => id === item.id) != undefined));
        promptUser();
    })
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
                showCompleted = !showCompleted;
                promptUser();
                break;
            case Commands.Add:
                promptAdd();
                break;
            case Commands.Complete:
                if (collection.getItemCounts().incomplete > 0) {
                    promptComplete();
                } else {
                    promptUser();
                }
                break;
            case Commands.Purge:
                collection.removeComplete();
                promptUser();
                break;
        }
    });
}
promptUser();