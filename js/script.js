
const element = {

  //elements's display
  accumulator: document.getElementById("accumulator"),
  char: document.getElementById("char"),
  operator: document.getElementById("operator"),

  //buttons
  btns_char: [...document.querySelectorAll(".char")],
  btns_operator: [...document.querySelectorAll(".operator")],
  btn_back: document.getElementById("back"),
  btn_equal: document.getElementById("equal"),
}

const display = {

  accumulator: 0,
  char: "",
  operator: "=",

  set_accumulator: function (acc) {
    this.accumulator = acc;
  },

  set_char: function (char) {
    this.char = char;
  },

  set_operator: function (operator) {
    this.operator = operator;
  },

}

class Calculator {

  start = () => {

  }

}

const calculator = new Calculator();
calculator.start();