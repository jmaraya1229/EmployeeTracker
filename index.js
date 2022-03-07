const connection = require ("./config/connection");
const inquirer = require("inquirer");
const conTable = require("console.table");

connection.connect((error) => {
    if (error) throw error;
    promptQ(); 
});

const promptQ = () => {
    inquirer.prompt([
        {
        type: "list",
        name: "options",
        message: "What would you like to do?",
        choices: [
            "View All Employess", 
            "Add Employee", 
            "Update Employee Role", 
            "Delete Employee",
            "View All Roles",
            "Add Role", 
            "Update Role",
            "Delete Role",
            "View All Departments", 
            "Add Department", 
            "Delete Department",
            "Quit"
            ]
        },
    ])
    .then((answers) => {
        const {choices} = answers;

        if (choices === "View All Employees") {
            viewAllEmployees();
        }

        If (choices === "Add Employee") {
            addEmployee();
        }

        if (choices === "Update Employee Role") {
            updateEmployeeRole();
        }

        if (choices === "Delete Employee") {
            deleteEmployee();
        }
        if (choices === "View All Roles") {
            viewAllRoles();
        }
        if (choices === "Add Role") {
            addRole();
        }
        if (choices === "Update Role") {
            updateRole();
        }
        if (choices === "Delete Role") {
            deleteRole();
        }
        if (choices === "View All Departments") {
            viewAllDepartment();
        }
        if (choices === "Add Department") {
            addDepartment();
        }
        if (choices === "Update Department") {
            updateDepartment();
        }
        if (choices === "Delete Department") {
            deleteDepartment();
        }
        if (choices === "Exit") {
            connection.end();
        }
    })
};
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
