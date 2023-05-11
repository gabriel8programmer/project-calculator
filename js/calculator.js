


//display 

const eltAccumulator = document.querySelector(".accumulator")

const eltExpression = document.querySelector(".expression")


//buttons

const btnsNumber = [...document.querySelectorAll(".number")]

const btnsOperator = [...document.querySelectorAll(".operator")]

const btnsAction = [...document.querySelectorAll(".config")]


class Calculator {

	constructor(){

		this.operator = 0
		this.operand = 0
		this.expression = ""
		this.operationType = ""
		this.result = ""
	}

	updateNumber = (e)=> {


	}

	updateOperator = (e)=> {


	}

	executeAction = (e)=> {


	}

}

//instance class calculator
const calculator = new Calculator()

//eventos 

btnsNumber.map( btnNumber => {

	btnNumber.addEventListener("click", 
		calculator.updateNumber);
})

btnsOperator.map( btnOperator => {

	btnOperator.addEventListener("click", 
		calculator.updateOperator);
})

btnsAction.map( btnAction => {

	btnAction.addEventListener("click", 
		calculator.executeAction);
})
