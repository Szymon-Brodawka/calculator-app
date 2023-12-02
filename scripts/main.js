const DIVIDE_BY_100 = "/100";
let result = 0;
let calculatorInput = "";
const showInputOnScreen = (input) =>
{
    const resultScreen = document.querySelector(".result-screen");
    resultScreen.textContent = input;
};

const clearInput = (input) =>
{
    return input.slice(0, -1);
}

const calculate = (calculatorInput) =>
{
    return eval(calculatorInput);
}

const removeOperandAtTheEnd = (input) =>
{
    const operandAtTheEndPattern = /(\+|\-|\*|\/)$/;
    return input.replace(operandAtTheEndPattern, "");
}

const isOperand = (input) =>
{
    const isOperandPattern = /(\+|\-|\*|\/)/;
    return isOperandPattern.test(input);
}

const isNotAllowedCharacterAtTheBeginning = (input) =>
{
    const notAllowedCharacterPattern = /(\+|\*|\/|\))/;
    return notAllowedCharacterPattern.test(input)
}

const findLastOperandPosition = (equation) =>
{
    const operandPattern = /(\+|\-|\*|\/)/;
    let index = equation.length;
    while(index !== -1 || operandPattern.test(equation.charAt(index)))
    {
        index--;
    }

    return index - 1;
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

const isOperandAllowed = (userInput, previousInput) =>
{
    if(isOperand(userInput) && isOperand(previousInput))
    {
        return false;
    }

    return true;
}

const countSubstringInString = (string, substring) =>
{
    const substringPattern = new RegExp(substring, "g");
    if(!string.match(substringPattern))
        return 0;
    
    return string.match(substringPattern).length;
}

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

const handleUserInput = (userInput, equation) =>
{
    const previousInput = equation.slice(-1,);
    if(userInput === "%")
    { 
        return DIVIDE_BY_100;
    }

    if(userInput === "clear")
    {
        calculatorInput = clearInput(calculatorInput);
        return "";
    }

    if(isNotAllowedCharacterAtTheBeginning(userInput)
        && equation.length === 0
    )
    {
        userInput = "";
        return userInput;
    }

    if(!isPointAllowed(userInput, previousInput, equation))
    {
        userInput = "";
        return userInput;
    }

    if(!isOperandAllowed(userInput, previousInput))
    {
        userInput = "";
        return userInput;
    }

    if(!isParenthesisAllowed(userInput, previousInput, equation))
    {
        userInput = "";
    }

    return userInput;
}

const showDivisionByZeroErrorMessage = () =>
{
    const errorMessage = "Can't divide by 0";
    showInputOnScreen(errorMessage);
}

const saveInputFromCalculator = (event) =>
{
    let inputValue = "";
    const clickedObject = event.target;
    inputValue = clickedObject.value;
    const wasCalculatorButtonClicked = clickedObject.classList.contains("button");
    if(!wasCalculatorButtonClicked)
    {
        return "";
    }

    return inputValue;
}

const isKeyboardInputAllowed = (keyboardInput) =>
{
    if(
        !isOperand(keyboardInput) && isNaN(keyboardInput) && keyboardInput !== "="
        && keyboardInput !== "."
    )
    {
        return false;
    }

    return true;
}

const saveInputFromKeyboard = (event) =>
{
    let inputValue = event.key;
    if(inputValue === "Backspace")
    {
        calculatorInput = clearInput(calculatorInput);
        return "";
    }

    if(!isKeyboardInputAllowed(inputValue))
    {
        return "";
    }

    return inputValue;
}

const saveInput = (event) =>
{
    let inputValue = "";
    event.type === "click"
        ? inputValue = saveInputFromCalculator(event)
        : inputValue = saveInputFromKeyboard(event);

    inputValue = handleUserInput(inputValue, calculatorInput);
    if(inputValue === DIVIDE_BY_100)
    {
        result = calculate(calculatorInput);
        result /= 100;
        showInputOnScreen(result);
        calculatorInput = result.toString();
        return;
    }

    if(inputValue !== "=" && event.key !== "Enter")
    {
        calculatorInput += inputValue;
        showInputOnScreen(calculatorInput);
        return;
    }

    calculatorInput = removeOperandAtTheEnd(calculatorInput);
    result = calculate(calculatorInput);
    if(result == "Infinity")
    {
        showDivisionByZeroErrorMessage();
        result = "";
        calculatorInput = result;
        return;
    }

    showInputOnScreen(result);
    calculatorInput = result.toString();
}

const calculator = document.querySelector(".calculator");
calculator.addEventListener("click", event => saveInput(event));
document.documentElement.addEventListener("keydown", event => saveInput(event));