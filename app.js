var validKeys = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "+",
  "-",
  "*",
  "/",
  "c",
  "C",
  ".",
  "Enter",
  "(",
  ")",
  "Backspace",
  "ArrowUp",
  "ArrowDown",
];

// Function that displays the value
function displayValue(val) {
  document.querySelector(".display").value += val;

  // Fixes bug: Btn with a value 5 doesn't blink
  if (val == "5") blink(document.querySelector("#five"));
  else blink(document.querySelector(`.btn[value="${val}"]`));
}

// Function that provides input feedback with a blink
function blink(element) {
  var initialFilter = element.style.filter;

  element.style.filter = "invert(10%)";

  setTimeout(function () {
    element.style.filter = initialFilter;
  }, 50);
}

// Function that evaluates the expression
function solve() {
  var displayingValue = document.querySelector(".display").value;

  // If there is an operator at the very end
  var lastChar = displayingValue.substring(
    displayingValue.length - 1,
    displayingValue.length
  );
  if (
    lastChar === "+" ||
    lastChar === "-" ||
    lastChar === "*" ||
    lastChar === "/"
  ) {
    displayingValue = displayingValue.substring(0, displayingValue.length - 1);
  }
  /****/

  var solvedValue = eval(displayingValue);

  if (document.querySelector(".display").value != "")
    document.querySelector(".display").value = solvedValue;

  blink(document.querySelector("#enter-btn"));
}

// Function that clears the display
function clr() {
  document.querySelector(".display").value = "";
  blink(document.querySelector("#C"));
}

// Detecting inputs with key presses
document.addEventListener("keydown", function (e) {
  var key = e.key;

  // Validates key press

  if (validKeys.includes(key)) {
    if (key === "c" || key === "C") clr();
    else if (key === "Enter") solve();
    else if (key === "Backspace") backspace();
    else displayValue(key);
  }
});

// Eraser
function backspace() {
  var displayValue = document.querySelector(".display").value;
  document.querySelector(".display").value = displayValue.substring(
    0,
    displayValue.length - 1
  );
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("./serviceWorker.js", {
        scope: ".",
      })
      .then((res) => console.log("service worker registered"))
      .catch((err) => console.log("service worker not registered", err));
  });
}
