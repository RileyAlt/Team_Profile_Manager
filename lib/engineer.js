import Employee from "./employee";

export class Engineer extends Employee {
    constructor(id, name, email, github) {
        super(id, name, email);
        this.github = github;
    }

    getGithub() {
        return `www.github.com/users/${this.github}`;
    }

    getRole() {
        return 'Engineer';
    }
};