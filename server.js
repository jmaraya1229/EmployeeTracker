const connection = require("./config/connection.js");
const inquirer = require("inquirer");

connection.connect((error) => {
    if (error) throw error;
    promptQ(); 
})

const promptQ = () => {
    inquirer.prompt([
        {
        type: "list",
        name: "options",
        message: "What would you like to do?",
        choices: [
            "View All Employees", 
            "View All Roles",
            "View All Departments", 
            "Add Employee", 
            "Update Employee Role", 
            "Delete Employee",
            "Add Role", 
            "Delete Role",
            "Add Department", 
            "Delete Department",
            "Quit"
            ]
        },
    ])
    .then((answers) => {
        const choices = answers["options"];

        if (choices === "View All Employees") {
            viewAllEmployees();
        }

        if (choices === "View All Roles") {
            viewAllRoles();
        }

        if (choices === "View All Departments") {
            viewAllDepartments();
        }

        if (choices === "Add Employee") {
            addEmployee();
        }

        if (choices === "Update Employee Role") {
            updateEmployeeRole();
        }

        if (choices === "Delete Employee") {
            deleteEmployee();
        }

        if (choices === "Add Role") {
            addRole();
        }

        if (choices === "Delete Role") {
            deleteRole();
        }

        if (choices === "Add Department") {
            addDepartment();
        }

        if (choices === "Delete Department") {
            deleteDepartment();
        }

        if (choices === "Quit") {
            connection.end();
        }
    });
};

// -------------- View All Employees --------------
const viewAllEmployees = () => {
    let sql =
        ` SELECT DISTINCT e.id,
                e.first_name, 
                e.last_name, 
                role.title, 
                department.department_name AS "department",
                role.salary,
                CONCAT (m.first_name, ' ',m.last_name) as manager
                FROM role, department, employee e
                LEFT JOIN employee m 
                ON e.manager_id = m.role_id
                WHERE department.id = role.department_id
                AND role.id = e.role_id  `
            ;

    connection.query(sql, (err, response) => {
        if (err) throw err;
        console.log("Current Employees:");
        console.table(response);
        promptQ();
    });
};

// -------------- View Employees By Manager --------------

// -------------- View Employees By Department --------------

// -------------- View Employees By Department Budget --------------

// -------------- View All Roles --------------
const viewAllRoles = () => {
    let sql = 
    `SELECT role.id, role.title, role.salary, department.department_name AS department
    FROM role
    INNER JOIN department ON role.department_id = department.id`;
    connection.query(sql, (err, response) => {
        if (err) throw err;
        console.table(response);
        promptQ();
    });
};

// -------------- View All Departments --------------
const viewAllDepartments = () => {
    let sql = 
    `SELECT department.department_name FROM department`;
    connection.query(sql, (err, response) => {
        if (err) throw err;
        console.table(response);
        promptQ();
    });
};

// -------------- Add Employee --------------
const addEmployee = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "firstName",
            message: "What is the first name of the employee?",
        },
        {
            type: "input",
            name: "lastName",
            message: "What is the last name of the employee?",
        }
    ])
    .then(answer => {
        const employeeName = [answer.firstName, answer.lastName]
        const roleSQL = `SELECT role.id, role.title FROM role`;
        connection.query(roleSQL, (err, data) => {
            if (err) throw err;
            const roles = data.map(({ id, title }) => ({ name: title, value: id}));
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
                connection.query(managerSQL, (err, data) => {
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
                            console.log(`${employeeName} has been added!`)
                            viewAllEmployees();
                            promptQ();
                        });
                    });
                });
            });
        });
    });
};

// -------------- Update Employee Role--------------
const updateEmployeeRole = () => {
    let newTitleId, employeeId, employeeResponse;
    let employeeNamesArray = [];

    let sql =       
      `SELECT employee.id, employee.first_name, employee.last_name, role.id AS "role_id"
      FROM employee, role, department WHERE department.id = role.department_id AND role.id = employee.role_id`;
    
    connection.query(sql, (error, response) => {
    if (error) throw error;
    employeeResponse = response
    response.forEach((employee) => {
        employeeNamesArray.push(`${employee.first_name} ${employee.last_name}`);
    });
    
    let sql = `SELECT role.id, role.title FROM role`;
      connection.query(sql, (error, response) => {
        if (error) throw error;
        let rolesArray = [];
        response.forEach((role) => {rolesArray.push(role.title);});
        inquirer.prompt([
            {
              name: 'chosenEmployee',
              type: 'list',
              message: "Which employee's role do you want to update?",
              choices: employeeNamesArray
            },
            {
              name: 'updateRole',
              type: 'list',
              message: 'What is their new role?',
              choices: rolesArray
            }
        ])
        .then((answer) => {  
            response.forEach((role) => {
              if (answer.updateRole === role.title) {
                newTitleId = role.id;
            }
        });

        employeeResponse.forEach((elem) => {
            if (answer.chosenEmployee === `${elem.first_name} ${elem.last_name}`) 
            {
              employeeId = elem.id;
            }
        });

            let sqlUpdate = `UPDATE employee SET employee.role_id = ? WHERE employee.id = ? `;

            connection.query(sqlUpdate, [newTitleId, employeeId], (error) => {
                if (error) throw error;
                console.log(`Updated ${answer.chosenEmployee}!`)
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

    connection.query(sql, (error, response) => {
        if (error) throw error;
        let employeeNamesArray = [];
        response.forEach((employee) => {employeeNamesArray.push(`${employee.first_name} ${employee.last_name}`);});
  
        inquirer.prompt([
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
              console.log(`${answer.chosenEmployee} has been deleted!`)
              promptQ();
            });
          });
      });
};

// -------------- Add Role --------------
const addRole = () => {
  const sql = 'SELECT * FROM department'
  connection.query(sql, (error, response) => {
    if (error) throw error;
    let deptNamesArray = [];
    response.forEach((department) => {deptNamesArray.push(department.department_name);});
    inquirer.prompt([
      {
        name: 'departmentName',
        type: 'list',
        message: 'Which department is this new role in?',
        choices: deptNamesArray
      },
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
          if (answer.departmentName === department.department_name) {departmentId = department.id;}
        });

        let sql =   `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
        let addedRole = [createdRole, answer.salary, departmentId];

        connection.query(sql, addedRole, (error) => {
          if (error) throw error;
          console.log(`${addedRole[0]} has been added!`)
          viewAllRoles();
        });
      });
  });
};

// -------------- Delete Role --------------
const deleteRole = () => {
    let sql = `SELECT role.id, role.title FROM role`;

    connection.query(sql, (error, response) => {
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
          connection.query(sql, [roleId], (error) => {
            if (error) throw error;
            console.log(`${answer.chosenRole} has been deleted!`)
            viewAllRoles();
          });
        });
    });
  };

// -------------- Add Department --------------
const addDepartment = () => {
    inquirer.prompt([
        {
          name: 'newDepartment',
          type: 'input',
          message: 'What is the name of your new Department?',
        }
        ])
        .then((answer) => {
        let sql = `INSERT INTO department (department_name) VALUES (?)`;
        connection.query(sql, answer.newDepartment, (error, response) => {
          if (error) throw error;
          console.log(`${answer.newDepartment} department has been added!`)
          viewAllDepartments();
        });
    });
};

// -------------- Delete Departemnt --------------
const deleteDepartment = () => {
    let sql =   `SELECT department.id, department.department_name FROM department`;
    connection.query(sql, (error, response) => {
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
          connection.query(sql, [departmentId], (error) => {
            if (error) throw error;
            console.log(`${answer.chosenDept} department has been deleted!`)
            viewAllDepartments();
          });
        });
    });
};
