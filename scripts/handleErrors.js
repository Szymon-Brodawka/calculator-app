import { countSubstringInString, isOperand } from "./utility.js";
import { showErrorMessage } from "./showCalculatorInput.js";

const areParenthesisMatched = (equation) =>
{
    const leftParenthesisCount = countSubstringInString(equation, /\(/);
    const rightParenthesisCount = countSubstringInString(equation, /\)/);

    leftParenthesisCount === rightParenthesisCount ? true : false;
}

const isOperandLast = (equation) =>
{
    const lastCharacter = equation.slice(-1,);
    isOperand(lastCharacter) ? true : false;
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

    hasErrorOccured = false;
    return hasErrorOccured;
}