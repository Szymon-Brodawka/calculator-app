let result;
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

const removeDuplicateOperands = (input) =>
{
    const duplicateAdditionOperandPattern = /\+{2,}/g;
    const duplicateSubstractionOperandPattern = /\-{2,}/g;
    const duplicateDivisionOperandPattern = /\/{2,}g/;
    const duplicateMultiplicationOperandPattern = /\*{2,}/g;

    input = input.replace(duplicateAdditionOperandPattern, "+");
    input = input.replace(duplicateSubstractionOperandPattern, "-");
    input = input.replace(duplicateDivisionOperandPattern, "/");
    input = input.replace(duplicateMultiplicationOperandPattern, "*");

    return input;
}

const saveInput = (event) =>
{
    const clickedObject = event.target;
    if(!clickedObject.classList.contains("button"))
    {
        return;
    }

    const inputValue = clickedObject.value;
    if(inputValue !== "=")
    {
        calculatorInput += inputValue;
        showInputOnScreen(calculatorInput);
        return;
    }

    calculatorInput = removeDuplicateOperands(calculatorInput);
    calculatorInput = removeOperandAtTheEnd(calculatorInput);
    result = calculate(calculatorInput);
    showInputOnScreen(result);
    calculatorInput = "";
}

const calculator = document.querySelector(".calculator");
calculator.addEventListener("click", event => saveInput(event));