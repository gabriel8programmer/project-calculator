
const defineThemeDark = (element)=> {
    element.classList.remove("light")
}

const defineThemeLight = (element)=> {
    element.classList.add("light")
}

export default {defineThemeDark,defineThemeLight}