
import math from "./math.js"

export default class Calculator {

    constructor(display){
        const {accumulator, number, operation} = display
        this.accumulator = accumulator
        this.number = number
        this.operation = operation
        this.currentAccumulatorValue = 0
        this.currentExpressionChar=""
        this.currentOperation="="    
    }

    updateDisplay = function(){
        this.accumulator.innerText = this.currentAccumulatorValue
        this.number.innerText = this.currentExpressionChar
        this.operation.innerText = this.currentOperation
    }

    clearDisplay = function(){
        this.currentAccumulatorValue = 0
        this.currentExpressionChar="0"
        this.currentOperation="="
        this.updateDisplay()
    }

    clearExpression = function(){
        this.currentExpressionChar = "0"
        this.updateDisplay()
    }

    clearLastCharInExpression = function(){
        return
    }

    isInvalidExpression = function(){
        return (this.currentExpressionChar.length == 0 || this.currentExpressionChar == "0")
    }

    updateDisplayNumber = function(value){
        const alreadyHasADotInExpression = this.currentExpressionChar.includes(".")
        const canNotInsertADotInExpression = (this.isInvalidExpression() && value == ".") || (alreadyHasADotInExpression && value == ".") 
        const canNotInsertZeroInExpression = (this.isInvalidExpression() && value=="0")

        //here the function is stopped
        if ( canNotInsertADotInExpression ||canNotInsertZeroInExpression ){
            return
        }

        if (this.currentExpressionChar == "0"){
            this.currentExpressionChar = ""
        }

        this.currentExpressionChar += value
        this.updateDisplay()
    }

    updateDisplayOperation = function(operator){

        if (this.isInvalidExpression()){
            return
        }

        this.currentOperation = operator
        this.currentAccumulatorValue = +this.currentExpressionChar
        this.currentExpressionChar = "0"
        this.updateDisplay()
    }

    executeOperation = function(operation){
        if (operation == "="){

            if (this.currentOperation == "+"){
                this.currentExpressionChar = math.sum(+this.currentExpressionChar, +this.currentAccumulatorValue)
            }
            if (this.currentOperation == "-"){
                this.currentExpressionChar = math.subtract( +this.currentAccumulatorValue, +this.currentExpressionChar)
            }
            if (this.currentOperation == "*"){
                this.currentExpressionChar = math.multiply(+this.currentExpressionChar, +this.currentAccumulatorValue)
            }
            if (this.currentOperation == "/"){
                this.currentExpressionChar = math.divide( +this.currentAccumulatorValue, +this.currentExpressionChar)
            }
        }else if (operation == "C"){
            this.clearDisplay()
        }else if (operation == "CE"){
            this.clearExpression()
        }else if (operation == "←"){
            this.clearLastCharInExpression()
        }

        this.updateDisplay()
    }

}