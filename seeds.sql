DROP DATABASE IF EXISTS EmployeesDB;

CREATE DATABASE EmployeesDB;

USE EmployeesDB;


CREATE TABLE Employees(
id INTEGER AUTO_INCREMENT,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
title VARCHAR(30) NOT NULL,
department VARCHAR(30) NOT NULL,
salary MEDIUMINT NOT NULL,
PRIMARY KEY(id)
);

INSERT INTO Employees (first_name, last_name, title, department, salary) VALUES ("John", "Smith", "Software Developer", "Engineering", 95000);
INSERT INTO Employees (first_name, last_name, title, department, salary) VALUES ("Tony", "Ferguson", "Salesperson", "Sales", 70000);
INSERT INTO Employees (first_name, last_name, title, department, salary) VALUES ("Marissa", "Ballatini", "Lawyer", "Legal", 200000);



