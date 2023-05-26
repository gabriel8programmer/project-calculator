
import element from "./element.js"
import themes from "./themes.js"
import Calculator from "./calculator.js"

function createNewCalculator(){
    const {accumulator, number, operation} = element
    const calculator = new Calculator({accumulator, number, operation})
    return calculator
}

//object calculator created
const calculator = createNewCalculator()

//add events
element.ButtonchangeDark.addEventListener("click", ()=>{
    themes.defineThemeDark(element.body)
    themes.defineThemeDark(element.themesContainer)
    themes.defineThemeDark(element.calculator)
})

element.ButtonchangeLight.addEventListener("click", ()=>{
    themes.defineThemeLight(element.body)
    themes.defineThemeLight(element.themesContainer)
    themes.defineThemeLight(element.calculator)
})

//buttons of the calculator
element.buttons.forEach(button=> {
    button.addEventListener("click", (e)=>{
        const currentValueElement = e.target.innerText
        const classOfElement = e.target.getAttribute('class')

        if (classOfElement === "key"){
            calculator.updateDisplayNumber(currentValueElement)
        }else if (classOfElement === "operation"){
            calculator.updateDisplayOperation(currentValueElement)
        }else if (classOfElement === "operate"){
            calculator.executeOperation(currentValueElement)
        }
    })
})