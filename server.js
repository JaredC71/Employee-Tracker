const mysql = require("mysql");
const inquirer = require("inquirer");
const boxen = require("boxen");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "EmployeesDB",
});

const startQuestions = [
  {
    name: "mainMenu",
    message: "What would you like to do?",
    type: "list",
    choices: [
      "Add Employee",
      "View All Employees",
      "Remove Employee",
      "View Departments",
      "View Titles",
      "Update Employee Role",
      "Exit",
    ],
  },
];

const addEmployeeQuestions = [
  {
    name: "newEmployeeFirstName",
    message: "Employees first name",
    type: "input",
  },
  {
    name: "newEmployeeLastName",
    message: "Employees Last name",
    type: "input",
  },
  {
    name: "newEmployeeTitle",
    message: "Employees Title",
    type: "input",
  },
  {
    name: "newEmployeeDepartment",
    message: "Employees Department",
    type: "input",
  },
  {
    name: "newEmployeeSalary",
    message: "Employees Salary",
    type: "input",
  },
];

const removeEmployeeQuestions = [
  {
    name: "RemoveEmployeeFirstName",
    type: "input",
    message: "Employees first name",
  },
  {
    name: "RemoveEmployeeLastName",
    type: "input",
    message: "Employees Last name",
  },
  {
    name: "confirmRemoval",
    type: "list",
    message: "Are you sure want to remove this employee from the database?",
    choices: ["yes", "no"],
  },
];

const updateEmployeeQuestions = [
  {
    name: "FirstNameEmployee_To_Be_Updated",
    type: "input",
    message: "Employees first name",
  },
  {
    name: "LastNameEmployee_To_Be_Updated",
    type: "input",
    message: "Employees last name",
  },
  {
    name: "newRole",
    type: "input",
    message: "What is this employees new Role?",
  },
];

function updateEmployee() {

  return inquirer.prompt(updateEmployeeQuestions).then((answer) => {
    connection.query(
      `UPDATE Employees 
      SET title = "${answer.newRole}"
      WHERE first_name = "${answer.FirstNameEmployee_To_Be_Updated}" 
      AND last_name = "${answer.LastNameEmployee_To_Be_Updated}";`
    );

    init();
  });

}

function addEmployeePrompt() {
  return inquirer.prompt(addEmployeeQuestions).then((answer) => {
    connection.query(
      "INSERT INTO Employees (first_name, last_name, title, department, salary) VALUES" +
        `("${answer.newEmployeeFirstName}", "${answer.newEmployeeLastName}", "${answer.newEmployeeTitle}", "${answer.newEmployeeDepartment}", ${answer.newEmployeeSalary});`
    );
    init();
  });
}
function removeEmployeePrompt() {
  return inquirer.prompt(removeEmployeeQuestions).then((answer) => {
    if (answer.confirmRemoval == "yes") {
      connection.query(
        "DELETE FROM Employees WHERE " +
          `first_name = "${answer.RemoveEmployeeFirstName}" AND last_name = "${answer.RemoveEmployeeLastName}";`
      );
      init();
    } else {
      init();
    }
  });
}

function viewDepartments() {
  connection.query("DROP TABLE Departments;");
  connection.query(
    "CREATE TABLE Departments AS (SELECT DISTINCT department FROM Employees);"
  );
  connection.query("SELECT * FROM DEPARTMENTS;", (err, res) => {
    if (err) throw err;
    console.table(res);

    init();
  });
}
function viewRoles() {
  connection.query("DROP TABLE Roles;");
  connection.query(
    "CREATE TABLE Roles AS (SELECT DISTINCT title FROM Employees);"
  );
  connection.query("SELECT * FROM Roles;", (err, res) => {
    if (err) throw err;
    console.table(res);

    init();
  });
}
const readEmployees = () => {
  console.log(
    boxen("Employees", {
      padding: 2,
      margin: 1,
      borderStyle: "classic",
      center: "true",
    })
  );
  connection.query("SELECT * FROM Employees", (err, res) => {
    if (err) throw err;
    console.table(res);

    init();
  });
};

function init() {
  inquirer
    .prompt(startQuestions)
    .then(function (answer) {
      if (answer.mainMenu == "Add Employee") {
        addEmployeePrompt();
      } else if (answer.mainMenu == "View All Employees") {
        readEmployees();
      } else if (answer.mainMenu == "Exit") {
        process.exit();
      } else if (answer.mainMenu == "Remove Employee") {
        removeEmployeePrompt();
      } else if (answer.mainMenu == "View Departments") {
        viewDepartments();
      } else if (answer.mainMenu == "View Titles") {
        viewRoles();
      } else if(answer.mainMenu == 'Update Employee Role') {
        updateEmployee();
      }
    })
    .catch((err) => {
      console.error(err);
    });
}

init();

// basically for linking roles with department, pass a

