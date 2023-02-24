// Packages needed for this application
const fs = require('fs');
const inquirer = require('inquirer');
const Manager = require("./lib/manager");
const Intern = require("./lib/intern");
const Engineer = require("./lib/engineer");

const employeeInfo = [];

//Creating an array of questions for user input
const MANAGER_QUESTIONS = [
    {
      type: 'input',
      name: 'name',
      message: 'What is your Team Manager name?'
    },
    {
        type: 'input',
        name: 'id',
        message: 'What is your managers id'
    },
    {
      type: 'input',
      name: 'email',
      message: 'What is your managers email?'
    },
    {
        type: 'input',
        name: 'officeNumber',
        message: 'What is your managers office number?'
    }
];

const ADD_EMPLOYEE_QUESTIONS = [
    {
        type: 'list',
        name: 'employeeType',
        message: 'Which employee would you like to add? (Or you can choose to be done adding employees)',
        choices: ['Engineer', 'Intern', 'All done adding employees']
    }
]

const EMPLOYEE_ENGINEER_QUESTIONS = [
    {
        type: 'input',
        name: 'name',
        message: 'What is their name'
    },
    {
        type: 'input',
        name: 'id',
        message: 'What is their id'
    },
    {
        type: 'input',
        name: 'email',
        message: 'What is their email'
    },
    {
        type: 'input',
        name: 'github',
        message: 'What is your GitHub their username?'
    }
]

const EMPLOYEE_INTERN_QUESTIONS = [
    {
        type: 'input',
        name: 'name',
        message: 'What is their name'
    },
    {
        type: 'input',
        name: 'id',
        message: 'What is their id'
    },
    {
        type: 'input',
        name: 'email',
        message: 'What is their email'
    },
    {
        type: 'input',
        name: 'school',
        message: 'What school are they from?'
    }
]

function generateHTML(){
    var html = `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>My Team</title>
                <link rel="stylesheet" href="GENERATED_MyTeam.css">
            </head>
            <body>
                <h1> MY TEAM </h1>
    `;

    for (const employee of employeeInfo) {
        // Generate a card for employee
        html += employee.getHtmlOutput();
    }

    html += `
            </body>
        </html>
    `;

    var css = `
        .employee-card {
            border: 1px solid black;
        }
    `;
  
    fs.writeFile('dist/GENERATED_MyTeam.html', html, (err) => {
      if (err)
        console.log("I got an error!", err);
      else {
        console.log("HTML generated successfully\n");
      }
    });

    fs.writeFile('dist/GENERATED_MyTeam.css', css, (err) => {
        if (err)
          console.log("I got an error!", err);
        else {
          console.log("CSS generated successfully\n");
        }
      });
}

function addIntern() {
    inquirer
        .prompt(EMPLOYEE_INTERN_QUESTIONS)
        .then(answers => {
            employeeInfo.push(new Intern(answers.id, answers.name, answers.email, answers.school));
            askForEmployee();
        });
}

function addEngineer() {
    inquirer
        .prompt(EMPLOYEE_ENGINEER_QUESTIONS)
        .then(answers => {
            employeeInfo.push(new Engineer(answers.id, answers.name, answers.email, answers.github));
            askForEmployee();
        });
}

function askForEmployee() {
    inquirer
        .prompt(ADD_EMPLOYEE_QUESTIONS)
        .then(answers => {
            const typeOfEmployeeToAdd = answers.employeeType;
            if (typeOfEmployeeToAdd == 'Intern') {
                addIntern();
            } else if (typeOfEmployeeToAdd == 'Engineer') {
                addEngineer();
            } else {
                // The user has chosen they are done adding employees, so now generate the HTML
                generateHTML();
            }
        })
        .catch(error => {
            console.error(error);
        });
}

// Initialize app
function init() {
    console.log("Starting initialization of the app");

    inquirer
        .prompt(MANAGER_QUESTIONS)
        .then(answers => {
            employeeInfo.push(new Manager(answers.id, answers.name, answers.email, answers.officeNumber))
            askForEmployee();
        })
        .catch(error => {
            console.error(error);
        });
}
  
//Running app
init();