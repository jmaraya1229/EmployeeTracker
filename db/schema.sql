DROP DATABASE IF EXISTS work_db;
CREATE DATABASE work_db;

USE work_db;

CREATE TABLE department (
    id INT NOT NULL PRIMARY KEY,
    name VARCHAR(30)
);

CREATE TABLE role (
    id INT NOT NULL PRIMARY KEY, 
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT 
)

CREATE TABLE employee (
    id INT NOT NULL PRIMARY KEY,
    first_name  VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT NOT NULL,
    manager_id INT,

)