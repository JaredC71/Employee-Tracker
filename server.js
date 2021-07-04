const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'EmployeesDB'
})

const startQuestions = [
    {
        name: "mainMenu",
        message: 'What would you like to do?',
        type: 'list',
        choices: ['Add Employee', 'View All Employees', 'Remove Employee','Exit']
        
    }
    
];

const addEmployeeQuestions = [
    {
        name: "newEmployeeFirstName",
        message: 'Employees first name',
        type: 'input'
        
    },
    {
        name: "newEmployeeLastName",
        message: 'Employees Last name',
        type: 'input'
        
    },
    {
        name: "newEmployeeTitle",
        message: 'Employees Title',
        type: 'input'
        
    },
    {
        name: "newEmployeeDepartment",
        message: 'Employees Department',
        type: 'input'
        
    },
    {
        name: "newEmployeeSalary",
        message: 'Employees Salary',
        type: 'input'
        
    }
    
];

const removeEmployeeQuestions = [
    {
        name:'RemoveEmployeeFirstName',
        type: 'input',
        message: 'Employees first name'
        
    },
    {
        name:'RemoveEmployeeLastName',
        type: 'input',
        message: 'Employees Last name'
        
    },
    {
        name:'confirmRemoval',
        type: 'list',
        message: 'Are you sure want to remove this employee from the database?',
        choices: ["yes", "no"]
        
    }
];




function addEmployeePrompt() {
    return inquirer.prompt(addEmployeeQuestions)
    .then(((answer) => {
        connection.query("INSERT INTO Employees (first_name, last_name, title, department, salary) VALUES" + `("${answer.newEmployeeFirstName}", "${answer.newEmployeeLastName}", "${answer.newEmployeeTitle}", "${answer.newEmployeeDepartment}", ${answer.newEmployeeSalary});`);
        init();
        
    })
    );
}
function removeEmployeePrompt() {
    return inquirer.prompt(removeEmployeeQuestions)
    .then(((answer) => {
        if(answer.confirmRemoval == 'yes') {
            connection.query("DELETE FROM Employees WHERE " + `first_name = "${answer.RemoveEmployeeFirstName}" AND last_name = "${answer.RemoveEmployeeLastName}";`); 
            init();
            
        } else {
            init();
        }
        
        
    })
    );
}
const readEmployees = () => {
    connection.query("SELECT * FROM Employees", (err, res) => {
        
        if (err) throw err;
        console.table(res);
        
        init();
        
        
        
    })
}

function init() {
    inquirer.prompt(startQuestions)
    .then(function (answer) {
        if (answer.mainMenu == 'Add Employee') {
            addEmployeePrompt();
        } else if (answer.mainMenu == 'View All Employees') {
            readEmployees();
            
        } else if (answer.mainMenu == 'Exit') {
            process.exit();
        } else if(answer.mainMenu == 'Remove Employee') {
            removeEmployeePrompt();
        }
    })
    .catch((err) => {
        console.error(err);
    })
}

init();



