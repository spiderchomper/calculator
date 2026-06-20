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
  if (num2 === 0) return "nopesies ;)";
  else return Math.round((num1 / num2) * 10000) / 10000;
}

let firstNum, secondNum, operator, toClr;

function operate(num1, oper, num2) {
  switch (oper) {
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
const display = document.querySelector("#display");
display.textContent = "0";
const buttons = document.querySelectorAll("button");
const backspace = document.getElementById("bksp");

buttons.forEach((button) => {
  document.addEventListener("keydown", (e) => {
    if (e.key === button.textContent) button.click();
    else if (e.code === "Backspace") {
      e.stopPropagation();
      backspace.click();
    }
  });
  // button listener
  button.addEventListener("click", (event) => {
    const clicked = event.target.textContent;
    const btnType = event.target.className;
    let result;

    function clrVar() {
      firstNum = null;
      secondNum = null;
      operator = null;
    }
    switch (btnType) {
      case "num": {
        if ((display.textContent === "0" && clicked !== ".") || toClr) {
          display.textContent = clicked;
        } else {
          if (
            (!display.textContent.includes(".") && clicked === ".") ||
            clicked !== "."
          ) {
            display.textContent += clicked;
          }
        }
        toClr = 0;
        break;
      }
      case "oper": {
        if (!firstNum && !operator) {
          firstNum = parseFloat(display.textContent);
        } else if (!secondNum && !toClr) {
          secondNum = parseFloat(display.textContent);
          firstNum = operate(firstNum, operator, secondNum);
          display.textContent = firstNum;
          if (!Number(firstNum)) clrVar();
        }
        operator = clicked;
        toClr = 1;
        if (operator === "=") {
          clrVar();
        }
        break;
      }
      case "clr": {
        clrVar();
        display.textContent = "0";
        break;
      }
      case "bksp": {
        if (!toClr) {
          display.textContent = display.textContent.slice(0, -1);
        }
        break;
      }
    }
  });
});
