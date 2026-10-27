const deleteBtn = document.getElementById("delete-btn")
const addBtn = document.getElementById("add-btn")
const ulEl = document.getElementById("ul-el")
const inputField = document.getElementById("input-field")
const clearBtn = document.getElementById("clear-btn")
let myList = []
const myListLocal = JSON.parse(localStorage.getItem("myList"))

const timeDisplay = document.getElementById("time-display")
const startBtn = document.getElementById("start-btn")
const stopBtn = document.getElementById("stop-btn")
const resetBtn = document.getElementById("reset-btn")

let completedCount = 0
let sec = 1500
let timer = null

if(myListLocal){
    myList = myListLocal
    render()
}

addBtn.addEventListener("click", function() {
    myList.push(inputField.value)
    inputField.value = ""
    localStorage.setItem("myList", JSON.stringify(myList))
    saveList()
    render()
})
clearBtn.addEventListener("click", function(){
    myList = []
    localStorage.clear()
    render()
})
ulEl.addEventListener("click", function(e){
    if(e.target.tagName === "BUTTON"){
        const index = Number(e.target.dataset.index)
        deleteTask(index)
    }
})
function deleteTask(index){
    myList.splice(index, 1)
    saveList()
    render()

}

function render() {
    let listItem = ""
    for (let i = 0; i < myList.length; i++){
        listItem += `<li>${myList[i]}
                        <button data-index="${i}">delete</button></li>`
    }
    ulEl.innerHTML = listItem
}

function saveList() {
    localStorage.setItem("myList", JSON.stringify(myList))
}


function convert() {
    let minutes = Math.floor(sec / 60)
    let leftover = sec % 60
    let paddedMinutes = String(minutes).padStart(2,"0")
    let paddedSecond = String(leftover).padStart(2,"0")

    timeDisplay.textContent = paddedMinutes + ":" + paddedSecond

}

startBtn.addEventListener("click", function(){
    if (timer === null){
        timer = setInterval(function(){
            sec--
            convert()
            if (sec === 0){
                completedCount++
                clearInterval(timer) //stop the count
                timer = null
            }
        }, 1000)
    
    }
})
stopBtn.addEventListener("click", function(){
   clearInterval(timer)
   timer = null
})
resetBtn.addEventListener("click", function(){
    clearInterval(timer)
    timer = null
    sec = 1500
    convert()
})
convert()
render()



