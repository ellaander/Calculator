
let runningTotal = 0;
let buffer = "0";
let expression = "";
let previousOperator = null;
let operatorInMemory = null;
let piDisplayed = false;

const screen = document.querySelector('#display');
const piValue = "3.141592653589793238462643383279502884197169399375105820974944592307816406286208998628034825342117067982148086513282306647093844609550582231725359408128481117450284102701938521105559644622948954930381964428810975665933446128475648233786783165271201909145648566923460348610454326648213393607260249141273";

function buttonClick(value) {
    if (isNaN(value)) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    screen.innerText = expression || "0";
}

function handleNumber(number) {
    if (buffer === "0" || piDisplayed) {
        buffer = number;
        piDisplayed = false;
    } else {
        buffer += number;
    }
    expression += number;
}

function handleSymbol(symbol) {
    switch (symbol) {
        case 'C':
            buffer = '0';
            runningTotal = 0;
            previousOperator = null;
            operatorInMemory = null;
            expression = "";
            piDisplayed = false;
            break;
        case '←':
            if (piDisplayed) {
                buffer = "0";
                expression = expression.slice(0, -piValue.length);
                piDisplayed = false;
            } else if (buffer.length === 1) {
                buffer = "0";
                expression = expression.slice(0, -1);
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
                expression = expression.slice(0, -1);
            }
            break;
        case '=':
            if (previousOperator === null) {
                return;
            }
            flushOperation(parseFloat(buffer));
            previousOperator = null;
            buffer = runningTotal.toString();
            expression = buffer;
            break;
        case '÷':
        case '×':
        case '−':
        case '+':
            handleMath(symbol);
            expression += symbol;
            break;
        case 'π':
            buffer = piValue;
            expression += piValue;
            piDisplayed = true;
            break;
    }
}

function handleMath(symbol) {
    if (buffer === "0" && !piDisplayed) {
        return;
    }

    const floatBuffer = parseFloat(buffer);

    if (runningTotal === 0) {
        runningTotal = floatBuffer;
    } else {
        flushOperation(floatBuffer);
    }

    previousOperator = symbol;
    buffer = "";
}

function flushOperation(floatBuffer) {
    if (previousOperator === "+") {
        runningTotal += floatBuffer;
    } else if (previousOperator === "−") {
        runningTotal -= floatBuffer;
    } else if (previousOperator === "×") {
        runningTotal *= floatBuffer;
    } else if (previousOperator === "÷") {
        runningTotal /= floatBuffer;
    }
}
