const Employee = require("./employee");

class Engineer extends Employee {
    constructor(id, name, email, github) {
        super(id, name, email);
        this.github = github;
    }

    getHtmlOutput() {
        return `
            <div class="employee-card"> 
                <h1 class="employee-name"> ${this.getName()} </h1>
                <h1 class="employee-role"> ${this.getRole()} </h1>
                <h1 class="employee-id"> ${this.getId()} </h1>
                <a href="mailto:${this.getEmail()}">${this.getEmail()}</a>
                <a href="https://github.com/${this.getGitHub()}" target="_blank"> Github: ${this.getGitHub()} </a>
            </div>
        `
    }

    getGitHub(){
        return this.github;
    }

    getRole() {
        return 'Engineer';
    }
};

module.exports = Engineer;
