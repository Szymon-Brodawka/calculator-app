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

const hasUnallowedDuplicateOperand = (input) =>
{
    const notAllowedDuplicateOperands = ["+", "*", "/"];
    notAllowedDuplicateOperands.forEach((notAllowedDuplicateOperand) =>
        {
            const notAllowedDuplicateOperandPattern = new RegExp(`\\${notAllowedDuplicateOperand}{2,}`);
            if(notAllowedDuplicateOperandPattern.test(input))
            {
                return true;
            }
        }
    );
    return false;
}

const isOperand = (input) =>
{
    const isOperandPattern = /(\+|\-|\*|\/)/;
    return isOperandPattern.test(input);
}

const removeUnnecessaryMinuses = (input) =>
{
    const duplicateMinusesPattern = /\-{2}/g;
    return input.replace(duplicateMinusesPattern, "");
}

const isDivisionOrMultiplicationAllowed = (input) =>
{
    const divisionOrMultiplicationNotAllowed = /(\*|\/|\.){1,}/;
    if(divisionOrMultiplicationNotAllowed.test(input) && input.length < 3)
    {
        return false;
    }

    return true;
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
    if(isNotAllowedCharacterAtTheBeginning(userInput)
        && equation.length === 0
    )
    {
        console.log("a")
        userInput = "";
    }

    if(isPointInTheEquation(equation) && userInput === ".")
    {
        console.log("b")
        userInput = "";
    }
    return userInput;
}



const saveInput = (event) =>
{
    let inputValue = "";
    const clickedObject = event.target;
    if(!clickedObject.classList.contains("button"))
    {
        return;
    }
    
    inputValue = clickedObject.value;
    if(isNotAllowedCharacterAtTheBeginning(inputValue)
        && calculatorInput.length === 0
    )
    {
        inputValue = "";
    }

    if(isPointInTheEquation(calculatorInput) && inputValue === ".")
    {
        inputValue = "";
    }



    
    // if(!isDivisionOrMultiplicationAllowed(calculatorInput) &&
    //     (inputValue === "/" || inputValue === "*")
    //     ||
    //     calculatorInput.length === 0 &&
    //     (inputValue === "/" || inputValue === "*")
    // )
    // {
    //     inputValue = "";
    // }

    if(inputValue !== "=")
    {
        calculatorInput += inputValue;
        showInputOnScreen(calculatorInput);
        return;
    }

    // calculatorInput = removeUnnecessaryMinuses(calculatorInput);
    // calculatorInput = removeDuplicateOperands(calculatorInput);
    // calculatorInput = removeOperandAtTheEnd(calculatorInput);
    result = calculate(calculatorInput);
    showInputOnScreen(result);
    calculatorInput = "";
}


const calculator = document.querySelector(".calculator");
calculator.addEventListener("click", event => saveInput(event));