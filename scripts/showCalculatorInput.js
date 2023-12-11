export const showInputOnScreen = (input) =>
{
    const resultScreen = document.querySelector(".result-screen");
    resultScreen.textContent = input;
}

export const showDivisionByZeroErrorMessage = () =>
{
    const errorMessage = "Can't divide by 0";
    showInputOnScreen(errorMessage);
}