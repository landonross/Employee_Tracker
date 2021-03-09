const inquirer = require('inquirer');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
  
    port: 3306,
  
    // Your username
    user: 'root',
  
    // Be sure to update with your own MySQL password!
    password: '',
    database: 'employee_tracker',
  });

  connection.connect((err) => {
    if (err) throw err;
    runEmployee();
  });

  const runEmployee = () => {
      inquirer
        .prompt({
            name: 'action',
            type: 'rawlist',
            message: 'What would you like to do?',
            choices: [
                'View All Employees',
                'View All Employees By Department',
                'View All Employees By Manager',
                'Add Employee',
                'Remove Employee',
                'Update Employee Role',
                'Update Employee Manager',
            ],
        })
        .then((answer) => {
            switch (answer.action) {
                case 'View All Employees':
                    allEmployeeSearch();
                    break;
                
                case 'View All Employees By Department':
                    allEmployeesByDepartment();
                    break;

                case 'View All Employees By Manager':
                    allEmployeesByManager();
                    break;
                
                case 'Add Employee':
                    addEmployee();
                    break;

                case 'Remove Employee':
                    removeEmployee();
                    break;

                case 'Update Employee Role':
                    updateEmployeeRole();
                    break;

                case 'Update Employee Manager':
                    updateEmployeeManager();
                    break;

                default:
                    console.log(`Invalid action: ${answer.action}`);
                    break;
            }
        });
  };

  const allEmployeeSearch = () => {
    const query = 'SELECT first_name, last_name FROM employee_tracker WHERE ?';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        connection.end();
        });
  };

  const addEmployee = () => {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'New Employee First Name:',
            validate: answer => {
                if (answer !== "") {
                    return true
                };
                return "must enter a name"
            }
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'New Employee Last Name:',
        },
        {
            type: 'input',
            name: 'roleId',
            message: 'New Employee Role Id (if applicable):',
        },
        {
            type: 'input',
            name: 'managerId',
            message: 'New Employees Manager Id (if applicable)',
        }
    ]).then((answer) => {
        const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (${answer.firstName}, ${answer.lastName}, ${answer.roleId}, ${answer.managerId})`;
        connection.query(query, (err, res) => {
            console.log("New Employee Added!");
        });
    });
    // logs the query being run
    // console.log(query.sql);
    // runEmployee();
    };