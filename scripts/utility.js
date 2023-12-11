export const findLastOperandPosition = (equation) =>
{
    const operandPattern = /(\+|\-|\*|\/)/;
    let index = equation.length - 1;
    let character = equation.charAt(index);
    while(index !== -1 || operandPattern.test(character))
    {
        index--;
        character = equation.charAt(index);
    }

    return index;
}

export const countSubstringInString = (string, substring) =>
{
    const substringPattern = new RegExp(substring, "g");
    if(!string.match(substringPattern))
        return 0;
    
    return string.match(substringPattern).length;
}

export const isOperand = (input) =>
{
    const isOperandPattern = /(\+|\-|\*|\/)/;
    return isOperandPattern.test(input);
}

const removeOperandAtTheEnd = (input) =>
{
    const operandAtTheEndPattern = /(\+|\-|\*|\/)$/;
    return input.replace(operandAtTheEndPattern, "");
}

const addParenthesisAtTheEnd = (input) =>
{
    const leftParenthesisCount = countSubstringInString(input, /\(/);

    if(leftParenthesisCount % 2 === 1)
    {
        return input + ")";
    }

    return input;
}

export const fixEquation = (input) =>
{
    input = removeOperandAtTheEnd(input);
    input = addParenthesisAtTheEnd(input);

    return input;
}