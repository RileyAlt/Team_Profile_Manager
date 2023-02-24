const Employee = require("./employee");

class Intern extends Employee {
    constructor(id, name, email, school) {
        super(id, name, email);
        this.school = school;
    }

    getHtmlOutput() {
        return `
            <div class="employee-card"> 
                <h1 class="employee-name"> ${this.getName()} </h1>
                <h1 class="employee-role"> ${this.getRole()} </h1>
                <h1 class="employee-id"> ${this.getId()} </h1>
                <a href="mailto:${this.getEmail()}">${this.getEmail()}</a>
                <h1> School: ${this.getSchool()} </a>
            </div>
        `
    }

    getSchool() {
        return this.school;
    }

    getRole() {
        return 'Intern';
    }
};

module.exports = Intern;
