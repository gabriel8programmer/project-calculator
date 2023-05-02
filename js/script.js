
import element from "./elements.js";
import operation from "./math.js";

//variables, consts and objects
let expression = [];
let operation_now = "mult";

const display = {
  accumulator: "0",
  char: "0",
  operator: "="
}

//end variables, consts and objects

//functions

const update_display = () => {
  element.accumulator.innerHTML = display.accumulator;
  element.char.innerHTML = display.char;
  element.operator.innerHTML = display.operator;
}

const set_display = (acc, char, operator) => {
  display.accumulator = acc;
  display.char = char;
  display.operator = operator;
}

const execute_operation = () => {
  const { accumulator, char } = display;
  const result = operation[operation_now](accumulator, char);
  set_display(0, result, "=");
  update_display();
}

const update_expression = (e) => {
  const text = e.target.innerHTML;
  expression.push(text);
  display.char = expression.toString().replace(/,/g, "");
  update_display();
}

const clear_display = () => {
  expression = [];
  set_display(0, 0, "=");
  update_display();
}

//this function it add click in a char button
const click_buttons_char = (button) => {
  button.addEventListener("click", update_expression);
}

//end functions

//events
element.buttons_char.map(click_buttons_char);
element.btn_clear.addEventListener("click", clear_display);
element.btn_equal.addEventListener("click", execute_operation);