const Employee = require("./employee");

class Manager extends Employee {
    constructor(id, name, email, officeNumber) {
        super(id, name, email);
        this.officeNumber = officeNumber;
    }

    getHtmlOutput() {
        return `
            <div class="employee-card"> 
                <h1 class="employee-name"> ${this.getName()} </h1>
                <h1 class="employee-role"> ${this.getRole()} </h1>
                <h1 class="employee-id"> ${this.getId()} </h1>
                <a href="mailto:${this.getEmail()}">${this.getEmail()}</a>
                <h1> Office Number: ${this.getOfficeNumber()} </a>
            </div>
        `
    }

    getOfficeNumber() {
        return this.officeNumber;
    }

    getRole() {
        return 'Manager';
    }
};

module.exports = Manager;
