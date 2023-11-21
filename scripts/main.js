let result = 0;
let calculatorInput = "";
const showInputOnScreen = (input) =>
{
    const resultScreen = document.querySelector(".result-screen");
    resultScreen.textContent = input;
};

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
    const notAllowedCharacterPattern = /(\+|\*|\/)/;
    return notAllowedCharacterPattern.test(input)
}

const isPointInTheEquation = (equation) =>
{
    return equation.includes(".");
}

const isOperandAllowed = (userInput, previousInput) =>
{
    if(userInput === "-" && isOperand(previousInput))
    {
        return false;
    }


    if(isOperand(userInput) && isOperand(previousInput))
    {
        return true;
    }

    return false;
}

const handleUserInput = (userInput, equation) =>
{
    const previousInput = equation.slice(-1,);
    if(isNotAllowedCharacterAtTheBeginning(userInput)
        && equation.length === 0
    )
    {
        userInput = "";
        return userInput;
    }

    if(isPointInTheEquation(equation) && userInput === ".")
    {
        userInput = "";
        return userInput;
    }

    if(isOperandAllowed(userInput, previousInput))
    {
        userInput = "";
        return userInput;
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
    if(!isOperand(keyboardInput) && isNaN(keyboardInput) && keyboardInput !== "=" && keyboardInput !== ".")
    {
        return true;
    }

    return false;
}

const saveInputFromKeyboard = (event) =>
{
    let inputValue = event.key;
    if(isKeyboardInputAllowed(inputValue))
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