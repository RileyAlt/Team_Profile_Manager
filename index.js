// Packages needed for this application
const fs = require('fs');
const inquirer = require('inquirer');

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
      name: 'email',
      message: 'What is your managers email?'
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

const EMPLOYEE_QUESTIONS = [
    {
        type: 'input',
        name: 'name',
        message: 'What is this persons name'
    },
    {
        type: 'input',
        name: 'email',
        message: 'What is this persons email'
    }
]

//Correctly displaying asnwers on HTML document
function renderTeamManagerInfo(answers) {
  return `
  
  ${answers.teammanager}
  ${answers.email}

  ${answers.number}

  ${answers.employeeid}
  `;
}


/*
employeeInfo will eventually look like:

[
    {
        id: 1,
        name: "Nate",
        email: "whatever",
        title: "manager"
    },
    {
        id: 2,
        name: "Riley",
        email: "whatever",
        title: "engineer"
    },
    {
        id: 3,
        name: "Trev",
        email: "whatever",
        title: "engineer"
    },
    {
        id: 4,
        name: "Harrison",
        email: "whatever",
        title: "intern"
    },
    {
        id: 5,
        name: "Max",
        email: "whatever",
        title: "intern"
    }
]
*/


function generateHTML(){
    // At this point, use employeeInfo to generate HTML
  
    var html = '';
    for (const employee of employeeInfo) {
        // Generate a card for employee
        html += `
            <div class="employee-card"> 
                <h1 class="employee-name"> ${employee.name} </h1>
                <h1 class="employee-title"> ${employee.title} </h1>
                <a href="mailto:${employee.email}">${employee.email}</a>
            </div>`
    }
  
    fs.writeFile('GENERATED_MyTeam.html', html, (err) => {
      if (err)
        console.log("I got an error!", err);
      else {
        console.log("HTML generated successfully\n");
      }
    });
}

function askForEmployee() {
    inquirer
        .prompt(ADD_EMPLOYEE_QUESTIONS)
        .then(answers => {
            const typeOfEmployeeToAdd = answers.employeeType;
            if (typeOfEmployeeToAdd == 'Intern' || typeOfEmployeeToAdd == 'Engineer') {
                inquirer
                    .prompt(EMPLOYEE_QUESTIONS)
                    .then(answers => {
                        answers['title'] = typeOfEmployeeToAdd;
                        employeeInfo.push(answers)
                        askForEmployee();
                    });
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
            answers['title'] = 'Manager';
            employeeInfo.push(answers);
            askForEmployee();
        })
        .catch(error => {
            console.error(error);
        });
}
  

//Running app
init();



//constructor builder
class Employee {
    constructor(employeeData) {
      this.name = employeeData.name;
      this.email = employeeData.email;
    }
  
    printInfo() {
      console.log(`your name is ${this.name} `);
      console.log(`email is  ${this.email}`);
    }
}

module.exports = Employee;
   
