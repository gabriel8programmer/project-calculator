
import element from "./element.js"
import Theme from "./themes.js"
import Calculator from "./calculator.js"

function createNewCalculator(){
    const {accumulator, number, operation} = element
    return new Calculator({accumulator, number, operation})
}

function createManipulatorTheme(){
    const { body, themesContainer, calculator } = element
    return new Theme(false, { 
        body, themesContainer, calculator 
    })
}

//object calculator created
const calculator = createNewCalculator()

//create object to maniputate the theme type
const manipulatorTheme = createManipulatorTheme()

//add events
element.ButtonchangeDark.addEventListener("click", (e)=>{
    manipulatorTheme.isLightTheme = false
    manipulatorTheme.disableLightTheme()
})

element.ButtonchangeLight.addEventListener("click", (e)=>{
    manipulatorTheme.isLightTheme = true
    manipulatorTheme.enableLightTheme()
})

//buttons of the calculator
element.buttons.forEach(button=> {
    button.addEventListener("click", (e)=>{
        const currentValueElement = e.target.innerText
        const classElement = e.target.getAttribute('class')

        const action = {
            key: function(){
                calculator.updateNumber(currentValueElement)
            },
            operation: function(){
                calculator.updateOperation(currentValueElement)
            },
            operate: function(){
                calculator.executeAlternativeActions(currentValueElement)
            }
        }

        const currentAction = action[classElement]
        currentAction()
    })
})