
export default class Theme {

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
