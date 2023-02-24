const Engineer = require("../lib/employee");

// Test that employee methods work
const newEngineer = new Engineer(1, "riley", "riley@fruity.com", "RileyALt")

if ("riley" == newEngineer.getName()) {
    console.log("Test 1 passed!")
} else {
    console.log("Test 1 failed :( ")
}

if ("RileyALt" == newEngineer.getGithub()) {
    console.log("Test 2 passed!")
} else {
    console.log("Test 2 failed :( ")
}