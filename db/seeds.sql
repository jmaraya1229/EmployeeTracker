INSERT INTO department(department_name)
VALUES ("Engineering"), 
("Sales"), 
("Finance"), 
("Legal");

INSERT INTO role(title, salary, department_id)
VALUES ("Engineer", 90000, 1), 
("Senior Engineer", 120000, 1), 
("Sales Lead", 80000, 2),
("Salesperson", 60000, 2),
("Account Manager", 100000, 3), 
("Accountant", 70000, 3),
("Lawyer", 90000, 4);


INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("Edward", "Elric", 1, 2), 
("Roy", "Mustang", 2, 0), 
("Alphonse", "Elric", 7, 0),
("May", "Chang", 3, 0),
("Ling", "Yao", 4, 3),
("Winry", "Rockbell", 5, 0), 
("Nina", "Tucker", 6, 5);