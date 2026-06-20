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
  if (num2 === 0) return "hellNo :)";
  else return num1 / num2;
}

let firstNum, secondNum, operator, toClr;

function operate(num1, oper, num2) {
  switch (oper) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "x":
      return multiply(num1, num2);
    case "/":
      return divide(num1, num2);
  }
}
const display = document.querySelector("#display");
display.textContent = "0";
const buttons = document.querySelectorAll("button");

buttons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const clicked = event.target.textContent;
    const btnType = event.target.className;
    let result;
    switch (btnType) {
      case "num": {
        if (display.textContent === "0" || toClr) {
          display.textContent = clicked;
        } else {
          display.textContent += clicked;
        }
        toClr = 0;
        break;
      }
      case "oper": {
        if (!firstNum && !operator) {
          firstNum = parseInt(display.textContent);
        } else if (!secondNum && !toClr) {
          secondNum = parseInt(display.textContent);
          firstNum = operate(firstNum, operator, secondNum);
          display.textContent = firstNum;
          secondNum = null;
        }
        operator = clicked;
        toClr = 1;
        if (operator === "=") {
          firstNum = null;
          secondNum = null;
          operator = null;
        }
        break;
      }
      case "clr": {
        firstNum = null;
        secondNum = null;
        operator = null;
        display.textContent = "0";
      }
    }
  });
});
