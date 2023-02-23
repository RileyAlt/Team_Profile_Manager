import { assert } from "console";
import { Engineer } from "../lib/employee";

// Test that employee methods work
const newEngineer = new Engineer(1, "riley", "riley@fruity.com")

if ("riley" == newEngineer.getName()) {
    console.log("Test 1 passed!")
} else {
    console.log("Test 1 failed :( ")
}