const connection = require ("./config/connection");
const inquirer = require("inquirer");
const mysql = require ("mysql2");
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

        If (choices === "Add Employee"); { 
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
            viewAllDepartments();
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
    });
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

// -------------- View All Roles --------------
const viewAllRoles = () => {
    let sql = 
    `SELECT role.id, role.title, department.department_name AS department
    FROM role
    INNER JOIN department ON role.department_id = department.id`;
    connection.promise().query(sql, (err, response) => {
        if (err) throw err;
        response.forEach((role) => {console.log(role.title)})
        promptQ();
    });
};

// -------------- Add Role --------------

//  -------------- Update Role --------------

// -------------- Delete Role --------------

// -------------- View All Departments --------------
const viewAllDepartments = () => {
    let sql = 
    `SELECT department.id AS id, department.department_name AS department FROM department`;
    connection.promise().query(sql, (err, response) => {
        if (err) throw err;
        promptQ();
    });
};

// -------------- Add Department --------------

// -------------- Update Department --------------

// -------------- Delete Departemnt --------------

