const inquirer = require("inquirer");
const conTable = require("console.table");
const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createConnection({
    host: 'localhost',
    PORT: 3001,
    user: 'root',
    password: process.env.MYSQL_PW,
    database: 'work_db'
});

const questions = [
    {
        type: "list",
        name: "options",
        message: "What would you like to do?",
        choices: [
            "View All Employess", 
            "Add Employee", 
            "Update Employee Role", 
            "Add Role", 
            "View All Departments", 
            "Add Department", 
            "Delete Department, Role, or Employee", 
            "Quit"]
    },
    {
        type: "input",
        name: "add-employee",
        message: "What is the name of the employee?"
    },
    {
        type: "input", 
        name: "first-name",
        message: "What is the employee's first name?"
    },
    {
        type: "input",
        name: "last-name",
        message: "What is the employee's last name?"
    },
    {
        type: "list",
        name: "add-employee-role",
        message: "What is the selected employee's role?",
        list: []
    },
    {
        type: "list",
        name: "employee-manager",
        message: "Who is the selected employee's manager?",
        choices: ["None", "John Smith", "Jane Doe"]
    }
    {
        type: "input",
        name: "add-dept",
        message: "What is the name of the department?"
    },
    {
        type: "input",
        name: "role",
        message: "What is the name of the role?"
    },
    {
        type: "input",
        name: "role-salary",
        message: "What is the salary of the role?"
    },
    {
        type: "list",
        name: "role-dept",
        message: "Which department does the role belong to?",
        choices: ["Sales", "Engineering", "Legal", "Finance", "Service"]
    },
    {
        type: "list",
        name: "update-employee",
        message: "Which employee's role do you want to update?",
        choices: [(data from table)]
    },
    {
        type: "list",
        name: "update-employee-role",
        message: "Which role do you want to assign the selected employee?",
        choices: [available roles]
    },
    {
        type: "list",
        name: "delete",
        message: "What would you like to delete?",
        choices: ["Department", "Role", "Employee"]
    },
    {
        type: "list",
        name: "delete-dept",
        message: "Which department would you like to delete?",
        choices: []
    },
    {
        type: "list",
        name: "delete-role",
        message: "Which role would you like to delete?",
        choices: [""]
    },
    {
        type: "list",
        name: "delete-employee",
        message: "Which employee would you like to delete?",
        choices: [""]
    }
]

// View all employes, view all departments should show table of info
