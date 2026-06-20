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

let firstNum, secondNum, operator, toClr, result;

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

function clrVar() {
  // clears math variables
  firstNum = null;
  secondNum = null;
  operator = null;
}
const numBtns = document.querySelectorAll(".num"); // numeric btns + decimal handling
numBtns.forEach((button) => {
  button.addEventListener("click", (event) => {
    const clicked = event.target.textContent;

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
  });
});

const operBtns = document.querySelectorAll(".oper"); // operands handling
operBtns.forEach((button) => {
  button.addEventListener("click", (event) => {
    const clicked = event.target.textContent;

    if (!firstNum && !operator) {
      firstNum = parseFloat(display.textContent);
    } else if (!toClr) {
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
  });
});

const clrBtn = document.querySelector("#clr"); //define special btns
clrBtn.addEventListener("click", (event) => {
  clrVar();
  display.textContent = "0";
});

const bkspBtn = document.querySelector("#bksp");
bkspBtn.addEventListener("click", (event) => {
  display.textContent.length > 1
    ? (display.textContent = display.textContent.slice(0, -1))
    : (display.textContent = "0");
});

const enter = document.getElementById("equals");

document.addEventListener("keydown", (event) => {
  //keyboard support
  const isNum = /\d|\./;
  const isOper = "+-/=*";
  if (isNum.test(event.key)) {
    const targetBtn = Array.from(numBtns).find(
      (btn) => btn.textContent === event.key,
    );
    targetBtn.click();
  } else if (isOper.includes(event.key)) {
    const targetBtn = Array.from(operBtns).find(
      (btn) => btn.textContent === event.key,
    );
    targetBtn.click();
  } else if (event.key === "Backspace") bkspBtn.click();
  else if (event.key === "Enter") {
    event.preventDefault();
    enter.click();
  } else if (event.key === "c") {
    clrBtn.click();
  }
});
