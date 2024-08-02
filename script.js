let displayValue = '';
let firstNumber = null;
let operator = null;
let secondNumber = null;

const display = document.getElementById('display');
const buttons = document.querySelectorAll('.number, .operator, #equals, #clear, .decimal');

buttons.forEach(button => {
    button.addEventListener('click', function() {
        const value = this.textContent;

        if (this.id === 'clear') {
            displayValue = '';
            firstNumber = null;
            operator = null;
            secondNumber = null;
            display.textContent = '0';
            return;
        }

        if (this.classList.contains('number')) {
            displayValue += value;
        } else if (this.classList.contains('decimal')) {
            if (!displayValue.includes('.')) {
                displayValue += value;
            }
        } else if (this.classList.contains('operator')) {
            if (firstNumber === null) {
                firstNumber = parseFloat(displayValue);
                operator = value;
                displayValue = '';
            } else if (operator) {
                secondNumber = parseFloat(displayValue);
                displayValue = operate(operator, firstNumber, secondNumber);
                firstNumber = parseFloat(displayValue);
                operator = value;
                displayValue = '';
            }
        } else if (this.id === 'equals') {
            if (firstNumber !== null && operator !== null) {
                secondNumber = parseFloat(displayValue);
                displayValue = operate(operator, firstNumber, secondNumber);
                firstNumber = null;
                operator = null;
            }
        }

        display.textContent = displayValue;
    });
});

function operate(operator, num1, num2) {
    switch (operator) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '/':
            return num2 === 0 ? "Error: You can't do that!" : num1 / num2;
        default:
            return "Invalid operation";
    }
}