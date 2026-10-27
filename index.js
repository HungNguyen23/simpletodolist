const deleteBtn = document.getElementById("delete-btn")
const addBtn = document.getElementById("add-btn")
const ulEl = document.getElementById("ul-el")
const inputField = document.getElementById("input-field")
const clearBtn = document.getElementById("clear-btn")
let myList = []
const myListLocal = JSON.parse(localStorage.getItem("myList"))

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



