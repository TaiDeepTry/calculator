let runningTotal = 0
let buffer = "0"
let previousOperator
let last_calculation_string = ""
let history = []
let clickedValues = "" // This will hold all clicked values

const screen = document.querySelector(".screen")
const last_calculation = document.querySelector(".last_calculation")
const display = document.querySelector(".display")
function buttonClick(value) {
    if (value !== "<-" && value !== "=") {
        if(clickedValues !== "0"){
            clickedValues += value 
        }else{
            clickedValues = value
        }
    }
    if (value == "<-") {
        if (clickedValues.length == 1 || clickedValues.length === undefined || clickedValues.length == 0) {
            clickedValues = "0"
        } else {
            clickedValues = clickedValues.substring(0, clickedValues.length - 1)
        }
    }
    if (isNaN(value)) {
        handleSymbol(value)
    } else {
        handleNumber(value)
    }
    // display.innerText = buffer
    display.innerText = clickedValues
    last_calculation.innerText = last_calculation_string
}

function handleSymbol(symbol) {
    switch (symbol) {
        case "C":
            buffer = "0"
            runningTotal = 0
            last_calculation_string = ""
            clickedValues = "0"
            last_calculation.innerText = last_calculation_string
            break
        case "=":
            if (previousOperator === null) {
                return
            }
            last_calculation_string = ""
            last_calculation_string = last_calculation_string.concat(
                runningTotal,
                previousOperator,
                buffer
            )
            flushOperation(parseInt(buffer))
            previousOperator = null
            buffer = runningTotal
            clickedValues = buffer
            history.push(last_calculation_string + "=" + buffer)
            runningTotal = 0
            break
        case "<-":
            if (buffer.length == 1 || buffer.length === undefined) {
                buffer = "0"
                last_calculation_string = ""
            } else {
                buffer = buffer.substring(0, buffer.length - 1)
            }
            break
        case "+":
        case "−":
        case "×":
        case "÷":
            handleMath(symbol)
            break
    }
}

function handleMath(symbol) {
    if (buffer === "0") {
        return
    }
    const intBuffer = parseInt(buffer)
    if (runningTotal === 0) {
        runningTotal = intBuffer
    } else {
        flushOperation(intBuffer)
    }
    previousOperator = symbol
    buffer = "0"
}
function flushOperation(intBuffer) {
    if (previousOperator === "+") {
        runningTotal += intBuffer
    } else if (previousOperator === "−") {
        runningTotal -= intBuffer
    } else if (previousOperator === "×") {
        runningTotal *= intBuffer
    } else if (previousOperator === "÷") {
        runningTotal /= intBuffer
    }
}

function handleNumber(numberString) {
    if (buffer === "0") {
        buffer = numberString
    } else {
        buffer += numberString
    }
}

function init() {
    document
        .querySelector(".calc-buttons")
        .addEventListener("click", function (event) {
            buttonClick(event.target.innerText)
        })
}

init()
