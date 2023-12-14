import { isInputAllowed } from "./isInputAllowed.js";
import { showDivisionByZeroErrorMessage, showInputOnScreen } from "./showCalculatorInput.js";
import { fixEquation } from "./utility.js";

const calculate = (calculatorInput) =>
{
    return eval(calculatorInput);
}

const clearInput = (input) =>
{
    console.log("Fire")
    console.log(input.length);
    return input.slice(0, -1);
}

export const handleUserInput = (userInput, calculatorInput) =>
{
    const MAX_LENGTH = 33;
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
        return calculatorInput;
    }
    
    if(userInput === "=" || userInput === "Enter" && calculatorInput.length > MAX_LENGTH)
    {
        calculatorInput = fixEquation(calculatorInput);
        calculatorInput = calculate(calculatorInput).toString();
        showInputOnScreen(calculatorInput);
        
        return calculatorInput;
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