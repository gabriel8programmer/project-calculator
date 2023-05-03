
//elements
const element = {

  //elements's display
  accumulator: document.getElementById("accumulator"),
  expression: document.getElementById("expression"),
  operator: document.getElementById("operator"),

  //buttons
  btns_char: [...document.querySelectorAll(".char")],
  btns_operator: [...document.querySelectorAll(".operator")],
  btn_clear: document.getElementById("clear"),
  btn_equal: document.getElementById("equal")
}

//literal object display
const display = {

  accumulator: 0,
  expression: "",
  operator: "=",

  set_display: function (acc, exp, opt) {
    this.accumulator = acc;
    this.expression = exp;
    this.operator = opt;
  }

}

//operations
const operation = {

  float: function (number) {
    return parseFloat(number);
  },

  sum: function (opt, opd) {
    return this.float(opt) + this.float(opd);
  },
  sub: function (opt, opd) {
    return this.float(opt) - this.float(opd);
  },
  mult: function (opt, opd) {
    return this.float(opt) * this.float(opd);
  },
  div: function (opt, opd) {
    return (this.float(opd) > 0) ? this.float(opt) / this.float(opd) : 0;
  }

}

//class calculator
class Calculator {

  constructor() {

    this.display = display;
    this.element = element;
    this.operation = operation;
    this.expression = [];
    this.result = 0;
  }

  get_expression_text = (expression) => {
    return expression.toString().replace(/,/g, "");
  }

  add_click_char = (element) => {
    element.addEventListener("click", this.on_the_click_char);
  }

  add_click_operator = (element) => {
    element.addEventListener("click", this.on_the_click_operator);
  }

  update_display = () => {
    this.element.accumulator.innerHTML = this.display.accumulator;
    this.element.expression.innerHTML = this.display.expression;
    this.element.operator.innerHTML = this.display.operator;
  }

  on_the_click_char = (event) => {

    const text_button = event.target.innerHTML;

    if ((text_button === "." || text_button === "0")
      && this.expression.length === 0) {
      return
    }

    this.expression.push(text_button);
    this.display.expression = this.get_expression_text(this.expression);
    this.update_display();

  }

  on_the_click_operator = (event) => {

    this.expression = [];
    const text_button = event.target.innerHTML;
    this.display.accumulator = this.display.expression;
    this.display.expression = 0;
    this.display.operator = text_button;
    this.update_display();

  }

  on_the_click_clear = (event) => {

    this.expression = [];
    this.display.set_display(0, 0, "=");
    this.update_display();
  }

  calc_expression = (operator) => {

    this.result = 0;
    const operators = [this.display.accumulator, this.display.expression];

    switch (operator) {

      case "+":
        this.result = this.operation.sum(...operators);
        break;
      case "-":
        this.result = this.operation.sub(...operators);
        break;
      case `×`:
        this.result = this.operation.mult(...operators);
        break;
      case `÷`:
        this.result = this.operation.div(...operators);
        break;
    }

    return this.result;
  }

  on_the_click_equal = () => {

    this.expression = [];

    if (this.display.accumulator === 0 ||
      this.result === "undefined") {
      return
    }

    this.result = this.calc_expression(this.display.operator);
    this.display.expression = this.result;
    this.update_display();
  }

  start = () => {

    this.display.accumulator = 0;
    this.display.expression = 0;
    this.display.operator = "=";

    //load buttons with your events
    this.element.btns_char.map(this.add_click_char);
    this.element.btns_operator.map(this.add_click_operator);

    //event
    this.element.btn_clear
      .addEventListener("click", this.on_the_click_clear
      );
    this.element.btn_equal.addEventListener("click", this.on_the_click_equal);
  }

}

const calculator = new Calculator();
calculator.start();