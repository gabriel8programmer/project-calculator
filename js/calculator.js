
const display = {
  accumulatorDisplay: document.querySelector(".accumulator"),
  expressionDisplay: document.querySelector(".expression"),
  operatorDisplay: document.querySelector(".operator"),
}

const buttons = document.querySelectorAll(".buttons button")

class Calculator {

  constructor(display){
    this.display = display
  }
}

buttons.forEach(button => {
  button.addEventListener("click", (e)=> {
    const textCurrentElt = e.target.innerText
    
  })
})


