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

const hasUnallowedDuplicateOperand = (input, previousInput) =>
{
    if(isOperand(previousInput) && isOperand(input))
    {
        return true;
    }

    return false;
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

    if(isOperand(userInput) && isOperand(previousInput))
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
    const wasCalculatorButtonClicked = clickedObject.classList.contains("button");
    if(!wasCalculatorButtonClicked)
    {
        return;
    }

    inputValue = clickedObject.value;
    inputValue = handleUserInput(inputValue, calculatorInput);
    if(inputValue !== "=")
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

const saveInputFromKeyboard = () =>
{

}

const saveInput = (event) =>
{
    if(event.type === "click")
    {
        saveInputFromCalculator(event);
        return;
    }
}

const calculator = document.querySelector(".calculator");
calculator.addEventListener("click", event => saveInput(event));
document.documentElement.addEventListener("keydown", event => saveInput(event));