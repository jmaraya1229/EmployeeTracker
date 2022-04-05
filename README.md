# Employee Tracker

## Description
The following application will allow the user to manage an employee database using Node.js, Inquirer, and MySQL. The user will be able to view all of their employees, and add/delete an employee, role, or department.

## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [Technologies Used](#technologies-used)

## Installation
First, the user must save the application to their local machine by going to the application's [repo](https://github.com/jmaraya1229/EmployeeTracker) and copying the clone key from `Code`. After adding the application to the local machine by using `git clone`, the user will then be able to download the necessary techonologies by using `npm install`. If the required techongies are not downloaded, the following commands may be typed to install them: 
> * `npm install inquirer`
> * `npm install mysql2`
> * `npm install console.table` 
> * `npm install dotenv`

After installing the required technologies, the user must use their own passord to access the MySQL connection. The user can add their own password by overwriting `process.env.MYSQL_PW`, which is located in the `connection.js` file in the config folder. 
> Note: The user may also edit the host, user, and port if needed.

## Usage
To begin, the user must type `npm start` in the command terminal. If the line doesn't work, `node server.js` can also begin the application. Once the server is running, a list of available options will appear in the command terminal. 

In order to view the employees, roles, and departments, the user can select `View All Employees`, `View All Roles`, or `View All Departments`.

The user will be able to add an employee, a role, and a department by selecting `Add Employee`, `Add Role`, or `Add Department`. The user can also delete each item by selecting the appropriate option. 

Once the user is finished with the database, the user can select `Quit` to exit the application. 

### Usage Walkthrough
![GIF](/EmployeeTrackerGIF.gif)
[Walkthrough Video Link](https://drive.google.com/file/d/1_1A97OvNF1FQ9d-ZrBiRXM4_6rb8FcHX/view)

## Technologies Used
* Inquirer
* MySQL2
* Consol Table
* dotenv
