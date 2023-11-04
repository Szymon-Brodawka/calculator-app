const calculatorInputs = [];

const calculate = () => {
    if(calculatorInputs.length < 3)
    {
        return null;
    }

    let result = 0;
    for(let i = 0; i < calculatorInputs.length - 2; i += 3) {
        if(checkIfIsNumber(calculatorInputs[i]) && checkIfIsNumber(calculatorInputs[i+2]))
        {
            result += parseInt(calculatorInputs[i] + calculatorInputs[i+2]);
        }
    }

    return result;

}

const showResultOnScreen = (event) => {
    if(!event.target.classList.contains("result-button"))
    {
        return;
    }

    const resultScreen = document.querySelector(".result-screen");
    //if calculates returns null then show error and return nothing
    
    resultScreen.textContent = calculate(calculatorInputs);
};

const saveCalculatorInput = (event) => {
    if(!event.target.classList.contains("button"))
    {
        return;
    }

    calculatorInputs.push(event.target.textContent);
}

const checkIfIsNumber = (input) => {
    const numberPattern = /\d+/;
    const isANumber = numberPattern.test(input);

    return isANumber;
}


const calculator = document.querySelector(".calculator");
calculator.addEventListener("click", (event) => showResultOnScreen(event));
calculator.addEventListener("click", (event) => saveCalculatorInput(event));