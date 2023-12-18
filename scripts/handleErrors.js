import { countSubstringInString, isOperand } from "./utility.js";
import { showErrorMessage } from "./showCalculatorInput.js";

const areParenthesisMatched = (equation) =>
{
    const leftParenthesisCount = countSubstringInString(equation, /\(/);
    const rightParenthesisCount = countSubstringInString(equation, /\)/);
    const areParenthesisMatched = leftParenthesisCount === rightParenthesisCount
    ? true : false;

    return areParenthesisMatched;
}

const isOperandLast = (equation) =>
{
    const lastCharacter = equation.slice(-1,);
    return isOperand(lastCharacter) ? true : false;
}

const isDivisionByZeroInEquation = (equation) =>
{
    return countSubstringInString(equation, /\/0/) > 0
    ? true : false;    
}

export const handleErrors = (equation) =>
{
    let hasErrorOccured = true;
    let errorMessage = "Unmatched parenthesis.";
    if(!areParenthesisMatched(equation))
    {
        showErrorMessage(errorMessage);
        return hasErrorOccured;
    }

    if(isOperandLast(equation))
    {
        errorMessage = "Operand can't be last.";
        showErrorMessage(errorMessage);
        return hasErrorOccured;
    }

    if(isDivisionByZeroInEquation(equation))
    {
        errorMessage = "Can't divide by 0.";
        showErrorMessage(errorMessage);
        return hasErrorOccured;
    }

    hasErrorOccured = false;
    return hasErrorOccured;
}