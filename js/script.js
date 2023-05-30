

const element = {
    body: document.querySelector("body"),
    themesContainer: document.querySelector("#themes-container"),
    ButtonchangeDark: document.querySelector("#themes-container #dark"),
    ButtonchangeLight: document.querySelector("#themes-container #light"),
    calculator: document.querySelector("#calculator"),
    accumulator: document.querySelector("#display #accumulator"),
    number: document.querySelector("#display #number"),
    operation: document.querySelector("#display #operator"),
    buttons: [...document.querySelectorAll("#buttons-container button")],
}

const math = {
    sum: function(v1, v2){
        return v1+v2
    },

    subtract: function(v1,v2){
        return v1-v2
    },

    multiply: function(v1,v2){
        return v1*v2
    },

    divide: function(v1,v2){
        return (v2)? v1/v2: 0
    }
}

class Theme {

    constructor(isLightTheme, manipulableElements){
        this.isLightTheme = isLightTheme
        this.manipulableElements = manipulableElements
        const { body, themesContainer, calculator} = this.manipulableElements
        this.listManipulableElements = [body, themesContainer, calculator]
    }

    enableLightTheme = function(){
        this.listManipulableElements.map(element=>{
            element.classList.add("light")
        })
    }

    disableLightTheme = function(){
        this.listManipulableElements.map(element=>{
            element.classList.remove("light")
        })
    }
}

class Calculator {

    constructor(display){
        const {accumulator, number, operation} = display
        this.accumulator = accumulator
        this.number = number
        this.operation = operation
        this.currentAccumulatorValue = 0
        this.currentExpressionChar="0"
        this.currentMathOperationChar="="
        this.possibleMathOperation = this.loadMathOperations()
        this.possibleAlternativeOperation = this.loadAlternativeOperations()
    }

    loadMathOperations = function(){

        return {
            "+": math.sum,
            "-": math.subtract,
            "*": math.multiply,
            "/": math.divide
        }
    }

    loadAlternativeOperations = ()=> {

        return {
            "CE": this.clearExpression,
            "C": this.clearDisplay,
            "\u2190": this.clearLastCharInExpression,
            "=": this.executeCurrentMathOperation,
        }
    }

    updateDisplay = function(){
        this.accumulator.innerText = this.currentAccumulatorValue
        this.number.innerText = this.currentExpressionChar
        this.operation.innerText = this.currentMathOperationChar
    }

    getLengthNumber = ()=> {
        return this.currentExpressionChar.length
    }

    isInvalidExpression = function(){
        return (!Number(this.currentExpressionChar))
    }

    //add numbers in display of the calculator
    updateNumber = function(value){ 
        const hasTwoDotsInExpression = (this.currentExpressionChar.includes(".") && value==".")
        
        if (hasTwoDotsInExpression){
            return
        }

        if (this.isResettedExpression){
            this.currentExpressionChar="0"
            this.isResettedExpression=false
        }

        if (this.currentExpressionChar == "0" && value!="."){
            this.currentExpressionChar=""
        }

        if (this.currentExpressionChar == "-" && value=="."){
            this.currentExpressionChar+="0"
        }
    
        this.currentExpressionChar += value
        this.updateDisplay()
    }

    //update operation in calculator
    updateOperation = function(operator){
        if (operator != "-" && this.isInvalidExpression()){
            return
        }

        if (operator == "-" && this.currentExpressionChar=="0"){
            this.currentExpressionChar=operator
            this.isResettedExpression=false
        }

        if (this.currentExpressionChar!="-") {
            this.currentMathOperationChar = operator
        }

        if (!this.isInvalidExpression()){
            this.currentAccumulatorValue = +this.currentExpressionChar
            this.currentExpressionChar="0"
        }
        
        this.updateDisplay()
    }

    //functions for alternative operations in calculator
    clearExpression = function(){
        this.currentAccumulatorValue=this.currentAccumulatorValue
        this.currentExpressionChar = "0"
        this.currentMathOperationChar=this.currentMathOperationChar
    }

    clearDisplay = function(){
        this.currentAccumulatorValue = 0
        this.currentExpressionChar="0"
        this.currentMathOperationChar="="
    }

    clearLastCharInExpression = function(){
        if (this.getLengthNumber() <= 1){
            this.currentExpressionChar="0"
            return 
        }
        this.currentAccumulatorValue=this.currentAccumulatorValue
        const newExpression = this.currentExpressionChar.slice(0, this.getLengthNumber()-1)
        this.currentExpressionChar = newExpression
        this.currentMathOperationChar = this.currentMathOperationChar
    }

    executeCurrentMathOperation = function(){
        this.currentMathOperation = this.possibleMathOperation[this.currentMathOperationChar]
        this.currentExpressionChar = this.currentMathOperation(+this.currentAccumulatorValue, +this.currentExpressionChar).toString()
        this.currentAccumulatorValue=0
        this.currentMathOperationChar="="
        this.isResettedExpression = true
    }

    executeAlternativeActions = function(operation){
        this.currentAltOperation = this.possibleAlternativeOperation[operation]
        this.currentAltOperation()
        this.updateDisplay()
    }

}

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

function activeOrDesactiveButton(){
    const {ButtonchangeDark, ButtonchangeLight} = element
    const buttons = [ButtonchangeDark, ButtonchangeLight]
    buttons.map(button=> {
        button.classList.toggle("active")
    })
}

//object calculator created
const calculator = createNewCalculator()

//create object to maniputate the theme type
const manipulatorTheme = createManipulatorTheme()

//add events
element.ButtonchangeDark.addEventListener("click", (e)=>{
    manipulatorTheme.disableLightTheme()
    activeOrDesactiveButton()
})

element.ButtonchangeLight.addEventListener("click", (e)=>{
    manipulatorTheme.enableLightTheme()
    activeOrDesactiveButton()
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