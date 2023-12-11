import { saveInput } from "./saveInput.js";
import { handleUserInput } from "./handleUserInput.js";

let calculatorInput = "";
const main = (event) =>
{
    const savedInput = saveInput(event);
    calculatorInput = handleUserInput(savedInput, calculatorInput);
}

const calculator = document.querySelector(".calculator");
calculator.addEventListener("click", event => main(event));
document.documentElement.addEventListener("keydown", event => main(event));