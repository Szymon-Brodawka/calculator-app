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
    const duplicateOperands = ["+", "*", "/"];
    duplicateOperands.forEach((duplicateOperand) =>
        {
            const duplicateOperandPattern = new RegExp(`\\${duplicateOperand}{2,}`, "g");
            input = input.replace(duplicateOperandPattern, duplicateOperand);
        }
    );
    return input;
}

const removeUnnecessaryMinuses = (input) =>
{
    const duplicateMinusesPattern = /\-{2}/g;
    return input.replace(duplicateMinusesPattern, "");
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

    calculatorInput = removeUnnecessaryMinuses(calculatorInput);
    calculatorInput = removeDuplicateOperands(calculatorInput);
    calculatorInput = removeOperandAtTheEnd(calculatorInput);
    result = calculate(calculatorInput);
    showInputOnScreen(result);
    calculatorInput = "";
}

const calculator = document.querySelector(".calculator");
calculator.addEventListener("click", event => saveInput(event));