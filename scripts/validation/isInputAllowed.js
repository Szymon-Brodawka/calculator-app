import { countSubstringInString, findLastOperandPosition, isOperand } from "../utility.js";

const isParenthesisAllowed = (userInput, previousInput, equation) =>
{
    const parenthesisPattern = /(\(|\))/;
    if(parenthesisPattern.test(userInput) && parenthesisPattern.test(previousInput))
    {
        return false;
    }

    if(userInput === ")" && isOperand(previousInput))
    {
        return false;
    }

    if(userInput === "(" && (!isNaN(previousInput) && previousInput !== ""))
    {
        return false;
    }

    if(countSubstringInString(equation, /\(/) % 2 === 0 && userInput ===")")
    {
        return false;
    }

    return true;
}

const isPointAllowed = (input, previousInput, equation) =>
{
    const isPointNotAllowedPattern = /\.\d+/;
    const lastOperandPosition = findLastOperandPosition(equation);
    const equationAfterLastOperand = equation.slice(lastOperandPosition, );
    if(previousInput === "." && input === ".")
    {
        return false;
    }

    if(input === "." && isPointNotAllowedPattern.test(equationAfterLastOperand))
    {
        return false;
    }

    return true;
}

const isNotAllowedCharacterAtTheBeginning = (input) =>
{
    const notAllowedCharacterPattern = /(\+|\*|\/|\))/;
    return notAllowedCharacterPattern.test(input);
}

const isOperandAllowed = (userInput, previousInput) =>
{
    if(isOperand(userInput) && isOperand(previousInput))
    {
        return false;
    }

    return true;
}

export const isInputAllowed = (userInput, equation) =>
{
    const previousInput = equation.slice(-1,);
    if(isNotAllowedCharacterAtTheBeginning(userInput)
        && equation.length === 0
    )
    {
        return false;
    }

    if(!isPointAllowed(userInput, previousInput, equation))
    {
        return false;
    }

    if(!isOperandAllowed(userInput, previousInput))
    {
        return false;
    }

    if(!isParenthesisAllowed(userInput, previousInput, equation))
    {
        return false;
    }
    
    if(userInput === "%" && equation.length === 0)
    { 
        return false;
    }

    return true;
}