const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'EmployeesDB'
})

const readEmployees = () => {
    console.log('Employees :');
    connection.query("SELECT * FROM Employees", (err, res) => {

        if (err) throw err;
        console.table(res);
        connection.end();

    })
}
const addEmployee = (first_name, last_name, title, department, salary) => {
    connection.query(`INSERT INTO Employees (first_name, last_name, title, department, salary) VALUES (${first_name}, ${last_name}, ${title}, ${department}, ${salary});`);


}


connection.connect((err) => {
    if (err) throw err;
    console.log('connected');
    addEmployee("Jared", "Colletti", "Lead Software Engineer", "Engineering", 150000);
    readEmployees();

})
