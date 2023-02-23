const Manager = require("../lib/employee");

// Test that employee methods work
const newEmployee = new Manager(1, "riley", "riley@fruity.com")

if ("riley" == newEmployee.getName()) {
    console.log("Test 1 passed!")
} else {
    console.log("Test 1 failed :( ")
}