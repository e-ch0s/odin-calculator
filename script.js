const buttonContainer = document.querySelector(".button-container");
const symbols = ["+", "-", "*", "/"];
let num1;
let num2;
let symbol;
let reset;
buttonContainer.addEventListener("click", event => {
    const display = document.querySelector(".display");
    const button = event.target;
    if (button.tagName !== "DIV") {
        if (button.textContent !== "C" && button.textContent !== "=") {
            if ((display.textContent === "0000" || display.textContent === "Error" || reset) && !(symbols.includes(button.textContent))) {
                display.textContent = button.textContent;
                reset = false
            }
            else {
                if (symbols.includes(button.textContent)) {
                    reset = false;
                    if (!symbol) {
                        display.textContent += button.textContent;
                        symbol = button.textContent;
                        num1 = display.textContent.replace(symbol, "");
                    }
                    else {
                        num2 = display.textContent.slice(String(num1).length + 1);
                        console.log(num1);
                        console.log(num2);
                        console.log(symbol);
                        num1 = Math.round(operate(Number(num1), Number(num2), symbol))
                        display.textContent = num1;
                        if (num1 === "Error") {
                            num1 = null;
                        }
                        num2 = null;
                        display.textContent += button.textContent;
                        symbol = button.textContent;
                    }
                }
                else {
                    display.textContent +=button.textContent;
                }
            }
        }
        else if (button.textContent === "C") {
            display.textContent = "0000";
            num1 = null;
            num2 = null;
            symbol = null;
        }
        else {
            num2 = display.textContent.slice(String(num1).length + 1);
            num1 = Math.round(operate(Number(num1), Number(num2), symbol))
            display.textContent = num1;
            if (num1 === "Error") {
                num1 = null;
            }
            num2 = null;
            symbol = null;
            reset = true;
        }
    }
} );

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    if (num2 === 0) {
        return "Error"
    }
    return num1 / num2;
}

function operate(num1, num2, symbol) {
    switch (symbol) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "*":
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2); 
    }
}