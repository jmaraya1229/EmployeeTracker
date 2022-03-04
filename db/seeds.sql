INSERT INTO department(department_name)
VALUES ("Engineering"), ("Sales"), ("Finance"), ("Legal");

INSERT INTO role(title, slaray, department_id)
VALUES ("Engineer", 90000, 1), ("Senior Engineer", 120000, 2), ("Account Manager", 100000, 3), ("Accountant", 70000, 4);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("Edward", "Elric", 1, 2), ("Roy", "Mustang", 2, 2), ("Winry", "Rockbell", 3, null), ("Nina", "Tucker", 4, 2)