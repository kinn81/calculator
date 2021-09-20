//  Variables are used to access the buttons and screen
const screenDiv = document.querySelector('#screen');
const buttons = document.querySelectorAll('.button');

let input;
let firstNum;
let operand;
let equals;

//  Functions to perform calculations
function operate(num1, operator, num2) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);

    if (operator === '+') {
        return add(num1, num2);
    } else if (operator === '-') {
        return subtract(num1, num2);
    } else if (operator === 'x') {
        return multiply(num1, num2);
    } else if (operator === '/') {
        return divide(num1, num2);
    }
}

function add(num1, num2) {
    return num1 + num2;
};

function subtract(num1, num2) {
    return num1 - num2;
};

function multiply(num1, num2) {
    return num1 * num2;
};

function divide(num1, num2) {
    return num1 / num2;
};

//  Add listeners to all the buttons to take action when user clicks
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        takeInput(button.textContent);
    });
})


//  This function takes the user's input and determines the correct action based on the button pressed
function takeInput(s) {
    if (s === 'AC') {
        input = undefined;
        firstNum = undefined;
        operand = undefined;
        equals = undefined;
        displayText('');
    } else if (s.match(/[0123456789.]/)) {
        equals = undefined;
        if (!input) {
            input = s;
        } else if (s === '.' && input.includes('.')) {
            return;
        } else {
            input += s;
        }
        display();
    } else if (s === '+/-') {
        if (!equals && !input) return;
        if (equals) {
            equals = equals * -1;
        }
        if (input > 0) {
            input = input * -1;
        } else {
            input = Math.abs(input);
        }
        display();
    } else if (s.match(/[-/x+]/)) {
        if (firstNum && operand && input) {
            takeInput('=');
        }
        if (equals) {
            input = equals;
            equals = undefined;
        }
        if (!input) return
        firstNum = input;
        operand = s;
        input = undefined;
        displayText(firstNum + operand);
    } else if (s === '=') {
        if (firstNum && operand && input) {
            equals = operate(firstNum, operand, input);
            displayText(equals);
            firstNum = undefined;
            operand = undefined;
            input = undefined;
        }
    } else if (s === '%') {
        if (equals) {
            equals = equals / 100;
        }
        if (input) {
            input = input / 100;
        }
        display();
    }
}

//  This function determines whether the sceen text has grown too large for its container, and truncates if it does
function displayText(s) {
    screenDiv.textContent = s;
    if (screenDiv.clientWidth > 399) {
        while (screenDiv.clientWidth > 399) {
            s = s.substring(1);
            screenDiv.textContent = s;
        }
    }
}

//  Checks that a variable contains ONLY a number
function isNumber(myString) {
    return /^\d+$/.test(myString);
}

//  Updates the calculator display
function display() {
    if (firstNum) {
        displayText(firstNum + operand + input);
    } else if (equals) {
        displayText(equals);
    } else {
        displayText(input);
    }
}




