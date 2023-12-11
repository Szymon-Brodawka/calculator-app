import { isOperand } from "./utility.js";

const isKeyboardInputAllowed = (keyboardInput) =>
{
    if(keyboardInput === "Backspace" || keyboardInput === "Enter")
    {
        return true;
    }
    
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
    const inputValue = event.key;
    if(!isKeyboardInputAllowed(inputValue))
    {
        return "";
    }

    return inputValue;
}

const saveInputFromCalculator = (event) =>
{
    const clickedObject = event.target;
    const inputValue = clickedObject.value;
    const wasCalculatorButtonClicked = clickedObject.classList.contains("button");
    if(!wasCalculatorButtonClicked)
    {
        return "";
    }

    return inputValue;
}

export const saveInput = (event) =>
{
    let inputValue = "";
    event.type === "click"
        ? inputValue = saveInputFromCalculator(event)
        : inputValue = saveInputFromKeyboard(event);

    return inputValue;
}