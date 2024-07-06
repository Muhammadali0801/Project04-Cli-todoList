#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let todos = [];
async function craeteTodo() {
    // Welcoming message
    console.log(chalk.green("Welcome to the TODO List Manager!"));
    do {
        let question = await inquirer.prompt({
            type: "list",
            message: "Select an operation",
            name: "select",
            choices: ["Add", "Update", "View", "Delete", "Exit"],
        });
        if (question.select === "Exit") {
            // Ending message
            console.log(chalk.blue("Thank you for using the TODO List Manager. Goodbye!"));
            break;
        }
        if (question.select === "Add") {
            let addList = await inquirer.prompt({
                type: "input",
                message: "Add items in the list",
                name: "addTodo",
                validate: function (input) {
                    if (input.trim() === "") {
                        return chalk.red("You must enter a task!");
                    }
                    return true;
                },
            });
            todos.push(addList.addTodo);
            console.log(chalk.yellow("Current TODO List:"));
            todos.forEach((todo) => console.log(chalk.yellow(todo)));
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
                validate: function (input) {
                    if (input.trim() === "") {
                        return chalk.red("You must enter a new value!");
                    }
                    return true;
                },
            });
            todos = todos.map((todo) => todo === updateTodo.selectedTodo ? newTodo.newValue : todo);
            console.log(chalk.yellow("Updated TODO List:"));
            todos.forEach((upTodo) => console.log(chalk.yellow(upTodo)));
        }
        if (question.select === "View") {
            console.log(chalk.magenta("*** TO DO LIST ***"));
            todos.forEach((todoview) => console.log(chalk.magenta(todoview)));
            console.log(chalk.magenta("*****************"));
        }
        if (question.select === "Delete") {
            let deleteTodo = await inquirer.prompt({
                type: "list",
                message: "Select item to delete",
                name: "deletedTodo",
                choices: todos,
            });
            todos = todos.filter((todo) => todo !== deleteTodo.deletedTodo);
            console.log(chalk.red("TODO List after deletion:"));
            todos.forEach((todoDelete) => console.log(chalk.red(todoDelete)));
        }
    } while (true);
}
craeteTodo();
