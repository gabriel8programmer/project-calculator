
"use strict"

//variables, consts and objects

//state of calculator --on and --off

let state = false

//list display
let listDisplay = [0]

//texts
let txtdisplay = ""

//variable for the total text display
const totalTextDisplay = 12

//variable for value total
let value = 0

//elements

const element = {
    
    display: document.getElementById("display"),
    
    button: {
        
        buttons: [...document.querySelectorAll(".buttons button")],
        on: document.querySelector(".on"),
        off: document.querySelector(".off"),
        ce: document.querySelector(".ce"),
        back: document.querySelector(".back"),
        numbers: [...document.querySelectorAll(".number")],
        operators: [...document.querySelectorAll(".operator")],
        equal: document.querySelector(".equal")
    }
}

//functions

//this func test if the char is number
const isNumber = (char)=>{
    
    //list of numbers
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    return numbers.some(num=> num == char)
}

//this func test if the char is operator
const isOperator = (char)=>{
    
    //list of operators
    const operators = ["+", "-", "*", "/"]
    return operators.some(opt=>opt == char)
}

//this func test if some item in listdidplay is a operator
const hasOperatorInDisplay = ()=>{
    
    return listDisplay.some(item=> {
        
        return isOperator(item)
    })

}

//this func update the display of the calculator
const updateDisplay = ()=>{
    
    //destructuring display
    const {display} = element
    
    //reset text display
    txtdisplay = ""
    
    //add character in txtdisplay by list
    listDisplay.map(item=>{
        
        txtdisplay += item
    })
    
    //update
    display.innerHTML = txtdisplay
}

const playAudioBip = ()=>{
    
    const audioBipOn =  new Audio("./bipOn.mp3")
    const audioBipOff =  new Audio("./bipOff.mp3") 
    
    if (state){
        audioBipOn.volume = 0.2
        audioBipOn.play()
    }
    
    if (!state){
        audioBipOff.volume = 0.3
        audioBipOff.play()
    }
    
}

//input in display
const input = (char)=>{
    
    const textSize = listDisplay.length
    
    if ((isNumber(char)
    || isOperator(char))
    && textSize <= totalTextDisplay){
        
        if (textSize <= 1
        && isOperator(char)
        && !Number(listDisplay[0])) return
        
        else listDisplay.push(char)
        
        if (!Number(listDisplay[0])) listDisplay.shift()
    
    }
    
    updateDisplay()
    
}

//input in display all the numbers
const inputNumber = (e)=>{
    
    const char = e.target.innerHTML
    
    if (state){
        
        if (value
        && !hasOperatorInDisplay()){
            listDisplay=[0]
            value=0
            input(char)
        }
        else input(char)
    }
    
}

//input in display all the numbers
const inputOperator = (e)=>{
    
    const char = e.target.innerHTML
    
    if (state){
        
        const lp = listDisplay[listDisplay.length-1]
        
        if ((isOperator(lp)
        !== isOperator(char))
        && listDisplay.length <= totalTextDisplay-1) input(char)
        
    }
   
}


//update the state
const updateState = ()=>{
    
    if (state){
        listDisplay = ["0"]
    }
    
    if (!state){
        listDisplay = []
    }
    
    updateDisplay()
}

//change state for true
const on = ()=> {
    
    if (!state){
        state = true
        listDisplay = [0]
        txtdisplay = ""
        value=0
        updateState()
    }
    
}

//change state for false
const off = ()=>{
    
    if (state){
        state = false
        updateState()
    }
    
}

//clear
const clearDisplay = ()=>{
    
    if (state){
        listDisplay = ["0"]
        updateDisplay()
    }
}

//show result in display
const showResult = ()=>{
    
    let sentence = txtdisplay
    
    const {display} = element
    
    if (state){
        
        if (hasOperatorInDisplay()){
            
            value = eval(sentence)
            listDisplay=[...String(value)]
            updateDisplay()
            
        }
        
    }
}

//remove items of listDisplay
const remove = ()=>{
    
    if (state){
        
        if (Number(listDisplay[0])) listDisplay.pop()
            
        if (listDisplay.length < 1
        || listDisplay.length > totalTextDisplay) listDisplay=[0]
        
        value = 0
            
        updateDisplay()
    }

    
}

// start the application

const start = ()=>{
    
    //starting values Init
    
    
    //destructuring elements of button
    
    const {
        buttons,
        on: btnOn, off:btnOff, ce,
        numbers,
        operators,
        equal
    } = element.button
    
    //add action in all buttons
    buttons.map(btn=>{
        btn.addEventListener("click", playAudioBip)
    })
    
    //add Action on
    btnOn.addEventListener("click", on)
    
    //add Action off
    btnOff.addEventListener("click", off)
    
    //add Action ce
    ce.addEventListener("click", clearDisplay)
    
    //add action in button equal
    equal.addEventListener("click", showResult)
    
    //add action in button back
    back.addEventListener("click", remove)
    
    //add Action in numbers
    numbers.map(num=>{
        num.addEventListener("click", inputNumber)
    })
    
    //add Action in operators
    operators.map(opt=>{
        opt.addEventListener("click", inputOperator)
    })
}

//starting
start()