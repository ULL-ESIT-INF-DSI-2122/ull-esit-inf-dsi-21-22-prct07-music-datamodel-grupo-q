"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.TodoCollection = exports.TodoItem = void 0;
var TodoItem = /** @class */ (function () {
    function TodoItem(id, task, complete) {
        if (complete === void 0) { complete = false; }
        this.complete = false;
        this.id = id;
        this.task = task;
        this.complete = complete;
    }
    TodoItem.prototype.printDetails = function () {
        console.log("".concat(this.id, "\t").concat(this.task, " ").concat(this.complete
            ? "\t(complete)" : ""));
    };
    return TodoItem;
}());
exports.TodoItem = TodoItem;
var TodoCollection = /** @class */ (function () {
    function TodoCollection(userName, todoItems) {
        var _this = this;
        if (todoItems === void 0) { todoItems = []; }
        this.userName = userName;
        this.nextId = 1;
        this.itemMap = new Map();
        todoItems.forEach(function (item) { return _this.itemMap.set(item.id, item); });
    }
    TodoCollection.prototype.addTodo = function (task) {
        while (this.getTodoById(this.nextId)) {
            this.nextId++;
        }
        this.itemMap.set(this.nextId, new TodoItem(this.nextId, task));
        return this.nextId;
    };
    TodoCollection.prototype.getTodoById = function (id) {
        return this.itemMap.get(id);
    };
    TodoCollection.prototype.getTodoItems = function (includeComplete) {
        return __spreadArray([], __read(this.itemMap.values()), false).filter(function (item) { return includeComplete || !item.complete; });
    };
    TodoCollection.prototype.markComplete = function (id, complete) {
        var todoItem = this.getTodoById(id);
        if (todoItem) {
            todoItem.complete = complete;
        }
    };
    TodoCollection.prototype.removeComplete = function () {
        var _this = this;
        this.itemMap.forEach(function (item) {
            if (item.complete) {
                _this.itemMap["delete"](item.id);
            }
        });
    };
    TodoCollection.prototype.getItemCounts = function () {
        return {
            total: this.itemMap.size,
            incomplete: this.getTodoItems(false).length
        };
    };
    return TodoCollection;
}());
exports.TodoCollection = TodoCollection;
var inquirer = require("inquirer");
var todos = [
    new TodoItem(1, "Buy Flowers"), new TodoItem(2, "Get Shoes"),
    new TodoItem(3, "Collect Tickets"), new TodoItem(4, "Call Joe", true)
];
var collection = new TodoCollection("Adam", todos);
var showCompleted = true;
function displayTodoList() {
    console.log("".concat(collection.userName, "'s Todo List ")
        + "(".concat(collection.getItemCounts().incomplete, " items to do)"));
    collection.getTodoItems(showCompleted).forEach(function (item) { return item.printDetails(); });
}
var Commands;
(function (Commands) {
    Commands["Add"] = "Add New Task";
    Commands["Complete"] = "Complete Task";
    Commands["Toggle"] = "Show/Hide Completed";
    Commands["Purge"] = "Remove Completed Tasks";
    Commands["Quit"] = "Quit";
})(Commands || (Commands = {}));
function promptAdd() {
    console.clear();
    inquirer.prompt({ type: "input", name: "add", message: "Enter task:" })
        .then(function (answers) {
        if (answers["add"] !== "") {
            collection.addTodo(answers["add"]);
        }
        promptUser();
    });
}
function promptComplete() {
    console.clear();
    inquirer.prompt({ type: "checkbox", name: "complete",
        message: "Mark Tasks Complete",
        choices: collection.getTodoItems(showCompleted).map(function (item) {
            return ({ name: item.task, value: item.id, checked: item.complete });
        })
    }).then(function (answers) {
        var completedTasks = answers["complete"];
        collection.getTodoItems(true).forEach(function (item) {
            return collection.markComplete(item.id, completedTasks.find(function (id) { return id === item.id; }) != undefined);
        });
        promptUser();
    });
}
function promptUser() {
    console.clear();
    displayTodoList();
    inquirer.prompt({
        type: "list",
        name: "command",
        message: "Choose option",
        choices: Object.values(Commands)
    }).then(function (answers) {
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
                }
                else {
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
