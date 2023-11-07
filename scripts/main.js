const calculatorInputs = [];
const numberInputs = [];
const operationInputs = [];
let numberInput = "0";
let result;

const checkIfIsNumber = (input) => {
    const numberPattern = /\d+/;
    return numberPattern.test(input);
}

const checkIfIsOperationSign = (input) => {
    const operationSignPattern = /(\+|\-|x|\/)/;
    return operationSignPattern.test(input);
}

const convertNumberType = (number) => {
    if(number.length < 2)
        return 0;
    
    number = number.slice(1, number.length);
    number.includes(".")
        ? number = parseFloat(number)
        : number = parseInt(number);
    return number;
}

const showResultOnScreen = (result) => {
    const resultScreen = document.querySelector(".result-screen");
    resultScreen.textContent = result;
};

const calculate = (numberInputs, operationInputs) => {
}

const saveInput = (event) => {
    const clickedObject = event.target;
    if(!clickedObject.classList.contains("button"))
    {
        return;
    }

    const input = clickedObject.textContent;
    if(checkIfIsNumber(input)
        || input === "." && !numberInput.includes(".")
        || (input === "-" && !numberInput.includes("-") && numberInput.length < 2)
    )
    {
        numberInput += input;
    }

    if(checkIfIsOperationSign(input) && numberInput.length > 2)
    {
        numberInputs.push(convertNumberType(numberInput));
        operationInputs.push(input);
        numberInput = "0";
    }

    const previousInput = operationInputs[operationInputs.length - 1];
    if(checkIfIsOperationSign(previousInput) && input === "=")
    {
        numberInputs.push(convertNumberType(numberInput));
        numberInput = "0";
    }

    if(checkIfIsNumber(previousInput) && input === "=")
    {
        calculate(numberInputs, operationInputs);
        //clear all arrays
    }

    console.log(numberInputs);
    console.log(operationInputs);

    // if(checkIfIsOperationSign(input) && numberInput.length > 2)
    // {
    //     calculatorInputs.push(convertNumberType(numberInput));
    //     calculatorInputs.push(input);
    //     numberInput = "0";
    // }

    // const previousInput = calculatorInputs[calculatorInputs.length - 1];
    // if(checkIfIsOperationSign(previousInput) && input === "=")
    // {
    //     calculatorInputs.push(convertNumberType(numberInput));
    //     numberInput = "0";
    // }

    // if(checkIfIsNumber(previousInput) && input === "=")
    // {
    //     // calculate();
    // }
    
    // console.log(calculatorInputs);
    // console.log(numberInput);
}


const calculator = document.querySelector(".calculator");
calculator.addEventListener("click", event => saveInput(event));