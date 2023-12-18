import { handleErrors } from "./handleErrors.js";
import { isInputAllowed } from "./isInputAllowed.js";
import { showInputOnScreen } from "./showCalculatorInput.js";

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
    const MAX_LENGTH = 33;
    if(!isInputAllowed(userInput, calculatorInput))
    {
        return calculatorInput;
    }

    if(userInput === "%" && calculatorInput.length > 0)
    {
        showInputOnScreen(`${calculatorInput}/100`);
        return `${calculatorInput} / 100`;
    }

    if(userInput === "clear" || userInput === "Backspace")
    {
        calculatorInput = clearInput(calculatorInput);
        showInputOnScreen(calculatorInput);
        return calculatorInput;
    }
    
    if(userInput === "=" || userInput === "Enter" || calculatorInput.length > MAX_LENGTH)
    {
        calculatorInput = calculate(calculatorInput).toString();
        showInputOnScreen(calculatorInput);
        
        return calculatorInput;
    }

    if(userInput === "=" || userInput === "Enter")
    {
        const hastErrorOccured = handleErrors(calculatorInput);

        if(hastErrorOccured)
        {
            return "";
        }

        calculatorInput = calculate(calculatorInput).toString();
        showInputOnScreen(calculatorInput);
        return calculatorInput;
    }

    showInputOnScreen(calculatorInput + userInput);
    return calculatorInput + userInput;
}