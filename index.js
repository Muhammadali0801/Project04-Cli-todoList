#! /usr/bin/env node
import inquirer from "inquirer";
let todos = [];
async function craeteTodo(todos) {
    do {
        let question = await inquirer.prompt({
            type: "list",
            message: "Select an operation",
            name: "select",
            choices: ["Add", "Update", "View", "Delete", "Exit"],
        });
        if (question.select === "Exit") {
            console.log("Exiting the program...");
            break;
        }
        if (question.select === "Add") {
            let addList = await inquirer.prompt({
                type: "input",
                message: "Add items in the list",
                name: "addTodo",
            });
            todos.push(addList.addTodo);
            todos.forEach((todo) => console.log(todo));
        }
        if (question.select === "Update") {
            let updateTodo = await inquirer.prompt({
                type: "list",
                message: "Select item to update",
                name: "selectedTodo",
                choices: todos,
            });
            let newTodo = await inquirer.prompt({
                type: "input",
                message: "Enter new value",
                name: "newValue",
            });
            todos = todos.map((todo) => todo === updateTodo.selectedTodo ? newTodo.newValue : todo);
            todos.forEach((upTodo) => console.log(upTodo));
        }
        if (question.select === "View") {
            console.log("*** TO DO LIST ***");
            todos.forEach((todoview) => console.log(todoview));
            console.log("*****************");
        }
        if (question.select === "Delete") {
            let deleteTodo = await inquirer.prompt({
                type: "list",
                message: "Select item to delete",
                name: "deletedTodo",
                choices: todos,
            });
            todos = todos.filter((todo) => todo !== deleteTodo.deletedTodo);
            todos.forEach((todoDelete) => console.log(todoDelete));
        }
    } while (true);
}
craeteTodo(todos);
