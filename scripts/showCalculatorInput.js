export const showInputOnScreen = (input) =>
{
    const MAX_LENGTH = 33;
    const TAKEN_POSITIONS = 3;
    if(input.length > MAX_LENGTH)
    {
        const numberOfCharactersExceedingMaxLength = input.length - MAX_LENGTH;
        const firstCharacterToShowIndex = (input.length - (TAKEN_POSITIONS + numberOfCharactersExceedingMaxLength)) * -1 - 1;   
        input = "..." + input.slice(firstCharacterToShowIndex);
    }

    const resultScreen = document.querySelector(".result-screen");
    resultScreen.textContent = input;
}

export const showErrorMessage = (errorMessage) =>
{
    showInputOnScreen(errorMessage);
}