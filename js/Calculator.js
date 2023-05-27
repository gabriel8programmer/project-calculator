
import math from "./math.js"

export default class Calculator {

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