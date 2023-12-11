import { isInputAllowed } from "./isInputAllowed.js";
import { showDivisionByZeroErrorMessage, showInputOnScreen } from "./showCalculatorInput.js";
import { fixEquation } from "./utility.js";

const calculate = (calculatorInput) =>
{
    return eval(calculatorInput);
}

const clearInput = (input) =>
{
    return input.slice(0, -1);
}

export const handleUserInput = (userInput, calculatorInput) =>
{
    if(!isInputAllowed(userInput, calculatorInput))
    {
        return calculatorInput;
    }

    if(userInput === "%" && calculatorInput.length > 0)
    {
        showInputOnScreen(`${calculatorInput} / 100`);
        return `${calculatorInput} / 100`;
    }

    if(userInput === "clear" || userInput === "Backspace")
    {
        calculatorInput = clearInput(calculatorInput);
        showInputOnScreen(calculatorInput);
        return clearInput(calculatorInput);
    }
    
    if(userInput === "=" || userInput === "Enter")
    {
        calculatorInput = fixEquation(calculatorInput);
        calculatorInput = calculate(calculatorInput).toString();
        if(!isFinite(calculatorInput))
        {
            showDivisionByZeroErrorMessage();
            return "";
        }

        showInputOnScreen(calculatorInput);
        return calculatorInput;
    }

    showInputOnScreen(calculatorInput + userInput);
    return calculatorInput + userInput;
}