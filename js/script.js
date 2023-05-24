import element from "./element.js"
import themes from "./themes.js"

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