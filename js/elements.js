//display's elements
const element = {
  accumulator: document.getElementById("accumulator"),
  char: document.getElementById("char"),
  operator: document.getElementById("operator"),
  //button's elements
  btn_clear: document.getElementById("clear"),
  buttons_char: [...document.querySelectorAll(".char")],
  buttons_operator: [...document.querySelectorAll(".operator")],
  btn_equal: document.getElementById("equal"),
  btn_back: document.getElementById("back")
}

export default element;