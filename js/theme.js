

const body = document.querySelector("body")

const btnChangeTheme = document.getElementById("btn-change-theme")

const iconThemes = [...document.querySelectorAll(".icon-theme")]

//functions 

const changeIcon = ()=> {

	iconThemes.map( iconTheme => {

		iconTheme.classList.toggle("invisible")

	})
}


const changeTheme = ()=> {

	//change the theme in body
	body.classList.toggle("light-theme")

	//change the icons
	changeIcon()

}

//events

btnChangeTheme.addEventListener("click", changeTheme)