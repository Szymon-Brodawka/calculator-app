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