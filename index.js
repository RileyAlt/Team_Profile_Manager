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
    // At this point, use employeeInfo to generate HTML
  
    var html = `<div class="header-card">
                    <header> My Team </header>
                </div>`;
    for (const employee of employeeInfo) {
        // Generate a card for employee
        html += `
            <div class="employee-card"> 
                <h1 class="employee-name"> ${employee.getName()} </h1>
                <h1 class="employee-id"> ${employee.getId()} </h1>
                <h1 class="employee-role"> ${employee.getRole()} </h1>
                <a href="mailto:${employee.email}">${employee.getEmail()}</a>
            </div>`
    }
  
    fs.writeFile('dist/GENERATED_MyTeam.html', html, (err) => {
      if (err)
        console.log("I got an error!", err);
      else {
        console.log("HTML generated successfully\n");
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