
export default {
    body: document.querySelector("body"),
    themesContainer: document.querySelector("#themes-container"),
    ButtonchangeDark: document.querySelector("#themes-container #dark"),
    ButtonchangeLight: document.querySelector("#themes-container #light"),
    calculator: document.querySelector("#calculator"),
    accumulator: document.querySelector("#display #accumulator"),
    number: document.querySelector("#display #number"),
    operation: document.querySelector("#display #operator"),
    buttonsContainer: document.querySelector("#button-container"),
    buttons: [...document.querySelectorAll("#buttons-container button")],
}