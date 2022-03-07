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
        if (choices === "Update Employee Role") {
            updateEmployeeRole();
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

// -------------- Update Employee Role--------------
const updateEmployeeRole = () => {
    let sql =       
        `SELECT employee.id, employee.first_name, employee.last_name, role.id AS "role_id"
        FROM employee, role, department WHERE department.id = role.department_id AND role.id = employee.role_id`;
    
    connection.promise().query(sql, (error, response) => {
    if (error) throw error;
    let employeeNamesArray = [];
    response.forEach((employee) => {employeeNamesArray.push(`${employee.first_name} ${employee.last_name}`);});

    let sql = `SELECT role.id, role.title FROM role`;
      connection.promise().query(sql, (error, response) => {
        if (error) throw error;
        let rolesArray = [];
        response.forEach((role) => {rolesArray.push(role.title);});

        inquirer.prompt([
            {
              name: 'chosenEmployee',
              type: 'list',
              message: 'Which employee has a new role?',
              choices: employeeNamesArray
            },
            {
              name: 'chosenRole',
              type: 'list',
              message: 'What is their new role?',
              choices: rolesArray
            }
          ])
          .then((answer) => {
            let newTitleId, employeeId;

            response.forEach((role) => {
              if (answer.chosenRole === role.title) {
                newTitleId = role.id;
              }
            });

            response.forEach((employee) => {
              if (
                answer.chosenEmployee ===
                `${employee.first_name} ${employee.last_name}`
              ) {
                employeeId = employee.id;
              }
            });

            let sqls =    `UPDATE employee SET employee.role_id = ? WHERE employee.id = ?`;
            connection.query(
              sqls,
              [newTitleId, employeeId],
              (error) => {
                if (error) throw error;
                console.log("Updated employee")
                promptQ();
              }
            );
          });
      });
    });
  };

// -------------- Delete Employee --------------
const deleteEmployee = () => {
    let sql = `SELECT employee.id, employee.first_name, employee.last_name FROM employee`;

    connection.promise().query(sql, (error, response) => {
        if (error) throw error;
        let employeeNamesArray = [];
        response.forEach((employee) => {employeeNamesArray.push(`${employee.first_name} ${employee.last_name}`);});
  
        inquirer
          .prompt([
            {
              name: 'chosenEmployee',
              type: 'list',
              message: 'Which employee would you like to remove?',
              choices: employeeNamesArray
            }
          ])
          .then((answer) => {
            let employeeId;
  
            response.forEach((employee) => {
              if (
                answer.chosenEmployee ===
                `${employee.first_name} ${employee.last_name}`
              ) {
                employeeId = employee.id;
              }
            });
  
            let sql = `DELETE FROM employee WHERE employee.id = ?`;
            connection.query(sql, [employeeId], (error) => {
              if (error) throw error;
              viewAllEmployees();
            });
          });
      });
};

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
const addRole = () => {
    const sql = 'SELECT * FROM department'
    connection.promise().query(sql, (error, response) => {
        if (error) throw error;
        let deptNamesArray = [];
        response.forEach((department) => {deptNamesArray.push(department.department_name);});
        deptNamesArray.push('Create Department');
        inquirer
          .prompt([
            {
              name: 'departmentName',
              type: 'list',
              message: 'Which department is this new role in?',
              choices: deptNamesArray
            }
          ])
          .then((answer) => {
            if (answer.departmentName === 'Create Department') {
              this.addDepartment();
            } else {
              addRoleResume(answer);
            }
          });
  
        const addRoleResume = (departmentData) => {
          inquirer
            .prompt([
              {
                name: 'newRole',
                type: 'input',
                message: 'What is the name of your new role?',
              },
              {
                name: 'salary',
                type: 'input',
                message: 'What is the salary of this new role?',
              }
            ])
            .then((answer) => {
              let createdRole = answer.newRole;
              let departmentId;
  
              response.forEach((department) => {
                if (departmentData.departmentName === department.department_name) {departmentId = department.id;}
              });
  
              let sql =   `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
              let crit = [createdRole, answer.salary, departmentId];
  
              connection.promise().query(sql, crit, (error) => {
                if (error) throw error;
                viewAllRoles();
              });
            });
        };
      });
    };

//  -------------- Update Role --------------

// -------------- Delete Role --------------
const deleteRole = () => {
    let sql = `SELECT role.id, role.title FROM role`;

    connection.promise().query(sql, (error, response) => {
      if (error) throw error;
      let roleNamesArray = [];
      response.forEach((role) => {roleNamesArray.push(role.title);});

      inquirer
        .prompt([
          {
            name: 'chosenRole',
            type: 'list',
            message: 'Which role would you like to remove?',
            choices: roleNamesArray
          }
        ])
        .then((answer) => {
          let roleId;

          response.forEach((role) => {
            if (answer.chosenRole === role.title) {
              roleId = role.id;
            }
          });

          let sql =   `DELETE FROM role WHERE role.id = ?`;
          connection.promise().query(sql, [roleId], (error) => {
            if (error) throw error;
            viewAllRoles();
          });
        });
    });
  };

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
const addDepartment = () => {
    inquirer
      .prompt([
        {
          name: 'newDepartment',
          type: 'input',
          message: 'What is the name of your new Department?',
          validate: validate.validateString
        }
      ])
      .then((answer) => {
        let sql = `INSERT INTO department (department_name) VALUES (?)`;
        connection.query(sql, answer.newDepartment, (error, response) => {
          if (error) throw error;
          console.log("Added new department!")
          viewAllDepartments();
        });
      });
};

// -------------- Update Department --------------

// -------------- Delete Departemnt --------------
const deleteDepartment = () => {
    let sql =   `SELECT department.id, department.department_name FROM department`;
    connection.promise().query(sql, (error, response) => {
      if (error) throw error;
      let departmentNamesArray = [];
      response.forEach((department) => {departmentNamesArray.push(department.department_name);});

      inquirer
        .prompt([
          {
            name: 'chosenDept',
            type: 'list',
            message: 'Which department would you like to remove?',
            choices: departmentNamesArray
          }
        ])
        .then((answer) => {
          let departmentId;

          response.forEach((department) => {
            if (answer.chosenDept === department.department_name) {
              departmentId = department.id;
            }
          });

          let sql = `DELETE FROM department WHERE department.id = ?`;
          connection.promise().query(sql, [departmentId], (error) => {
            if (error) throw error;
            console.log("Deleted department!")
            viewAllDepartments();
          });
        });
    });
};
