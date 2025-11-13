const optionsMenu = document.getElementById("options-menu")
const selectedOption = document.getElementById("selected-option")
const singleOptions = document.querySelectorAll("[data-option]")

document.getElementById("menu-container").addEventListener("click", () => optionsMenu.classList.toggle("hidden"))

optionsMenu.addEventListener("click", (e) => {
    const dataOption = e.target.dataset.option
    if(dataOption){
       handleOptionClick(dataOption)
    }
})

document.getElementById("get-color-btn").addEventListener("click",()=>renderColors())

document.querySelector("main").addEventListener("click", (e)=>{
    let content = ""
    if(e.target.dataset.color){
        content = document.getElementById(`color-${e.target.dataset.color}-name`).textContent
    }
    navigator.clipboard.writeText(content)
      .catch(err => {
        console.log('Something went wrong', err)
      })  
})

function handleOptionClick(data){
    removeBold() 
    addBold(data)
    updateSelected(data)
    setNewTick(data)
    setTimeout(()=>{
        optionsMenu.classList.add("hidden")
    },100)
    renderColors()
}

function removeBold(){
    for(let i = 0; i < singleOptions.length; i++){
           singleOptions[i].classList.remove("bold") 
    }
}

function addBold(data){
    const optionsH3 = document.querySelectorAll("div.single-option h3")
    for(let i=0; i<optionsH3.length; i++){
        if(optionsH3[i].dataset.option === data){
            optionsH3[i].classList.add("bold")
            break
        }
    }
}

function updateSelected(data){
    const optionsH3 = document.querySelectorAll("div.single-option h3")
    for(let i=0; i<optionsH3.length; i++){
        if(optionsH3[i].dataset.option === data){
            selectedOption.textContent = optionsH3[i].textContent
            selectedOption.dataset.selected = optionsH3[i].dataset.option 
            break
        }
    }
}

function setNewTick(data){
    const optionsDiv = document.querySelectorAll("div.single-option")
    const ticks = document.querySelectorAll("img.selected-icon")
    
    for(let i=0; i < ticks.length; i++){
            ticks[i].classList.add("hidden")
    }
    
    for(let i=0; i<optionsDiv.length; i++){
        if(optionsDiv[i].dataset.option === data){
            ticks[i].classList.remove("hidden")
            break
        }
    }
}


function renderColors(){
    const currentColorHex = document.getElementById("color-picker").value.slice(1,7)
    const mode = document.getElementById("selected-option").dataset.selected
    
    fetch(`https://www.thecolorapi.com/scheme?hex=${currentColorHex}&mode=${mode}&count=4`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("color-one").style.backgroundColor = document.getElementById("color-picker").value
            document.getElementById("color-one-name").textContent = document.getElementById("color-picker").value
            document.getElementById("color-two").style.backgroundColor = data.colors[0].hex.value
            document.getElementById("color-two-name").textContent = data.colors[0].hex.value
            document.getElementById("color-three").style.backgroundColor = data.colors[1].hex.value
            document.getElementById("color-three-name").textContent = data.colors[1].hex.value
            document.getElementById("color-four").style.backgroundColor = data.colors[2].hex.value
            document.getElementById("color-four-name").textContent = data.colors[2].hex.value
            document.getElementById("color-five").style.backgroundColor = data.colors[3].hex.value
            document.getElementById("color-five-name").textContent = data.colors[3].hex.value
        })
}

renderColors()