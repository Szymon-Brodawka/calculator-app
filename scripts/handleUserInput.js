import { handleErrors } from "./handleErrors.js";
import { isInputAllowed } from "./isInputAllowed.js";
import { showInputOnScreen } from "./showCalculatorInput.js";
import { countSubstringInString } from "./utility.js";

const calculate = (calculatorInput) =>
{
    const countOfNumbers = countSubstringInString(calculatorInput, /[0-9]/);
    if(countOfNumbers < 1)
    {
        return "";
    }
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
        showInputOnScreen(`${calculatorInput}/100`);
        return `${calculatorInput}/100`;
    }

    if(userInput === "clear" || userInput === "Backspace")
    {
        calculatorInput = clearInput(calculatorInput);
        showInputOnScreen(calculatorInput);
        return calculatorInput;
    }

    if(userInput === "=" || userInput === "Enter")
    {
        const hasErrorOccured = handleErrors(calculatorInput);

        if(hasErrorOccured)
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