INSERT INTO department(department_name)
VALUES ("Engineering"), 
("Sales"), 
("Finance"), 
("Legal");

INSERT INTO role(title, salary, department_id)
VALUES ("Engineer", 90000, 1), 
("Senior Engineer", 120000, 1), 
("Account Manager", 100000, 2), 
("Accountant", 70000, 2);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("Edward", "Elric", 1, 2), 
("Roy", "Mustang", 2, 0), 
("Winry", "Rockbell", 3, 0), 
("Nina", "Tucker", 4, 3)