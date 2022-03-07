const connection = require ("./config/connection");
const inquirer = require("inquirer");
const conTable = require("console.table");

connection.connect((err) => {
    if (err) throw err;
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

// -------------- View All Employees --------------
const viewAllEmployees = () => {
    let sql = 
        `SELECT employee.id,
        employee.first_name, 
        employee.last_name, 
        role.title, 
        department.department_name AS "department",
        role.salary
        FROM employee, role, department
        WHERE department.id = role.depart_id
        AND role.id = employee.role_id
        ORDER BY employee.id ASC
        `;

    connection.promise().query(sql, (err, response) => {
        if (err) throw err;
        promptQ();
    })
};

// --------------Add Employee --------------
const addEmployee = () => {
    inquirer.prompt([
        {
            type: input,
            name: "firstName",
            message: "What is the first name of the employee?",
        },
        {
            type: input,
            name: "lastName",
            message: "What is the last name of the employee?",
        }
    ])
    .then(answer => {
        const employeeName = [answer.firstName, answer.lastName]
        const roleSQL = `SELECT role.id, role.title FROM role`;
        connection.promise().query(roleSQL, (err, data) => {
            if (err) throw err;
            const roles = data.map(({ id, title}) => ({ name: title, value: id}));
            inquirer.prompt([
                {
                    type: "list",
                    name: "role",
                    message: "What is the employee's role?",
                    choices: roles
                }
            ])
            .then (roleChoice => {
                let role = roleChoice.role;
                employeeName.push(role);
                let managerSQL = `SELECT * FROM employee`;
                connection.promise().query(managerSQL, (err, data) => {
                    if (err) throw err;
                    let managers = data.map (({ id, first_name, last_name }) => ({name: first_name + " " + last_name, value: id }));
                    inquirer.prompt([
                        {
                            type: "list",
                            name: "manager",
                            message: "Who is the employee's manager?",
                            choices: managers
                        }
                ])
                    .then(managerChoice => {
                        let manager = managerChoice.manager;
                        employeeName.push(manager);
                        let sql = 
                        `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                        VALUES (?, ?, ?, ?)`;
                        connection.query(sql, employeeName, (err) => {
                            if (err) throw err;
                            console.log("Employee has been added!")
                            viewAllEmployees();
                        });
                    });
                });
            });
        });
    });
};

// -------------- Update Employee --------------

// -------------- Delete Employee --------------

// 

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
