document.addEventListener("DOMContentLoaded", function(){
  fetchBallers()
})

function fetchBallers(){
  fetch("http://localhost:3000/ballers")
  .then(response => response.json())
  .then(ballers => {
    ballers.forEach(showBaller)
  })
}

function showBaller(ballerInfo){
  // BALLER CARD LOGIC
  let outerDiv = document.createElement("div")
  outerDiv.setAttribute("class", "card")
  outerDiv.setAttribute("id", ballerInfo.id)
  let img = document.createElement("img")
  img.setAttribute("src", ballerInfo.image)
  let innerDiv = document.createElement("div")
  innerDiv.setAttribute("class", "container")
  let ballerName = document.createElement("h3")
  ballerName.innerText = ballerInfo.name
  let ballerCash = document.createElement("button")
  ballerCash.innerText = ballerInfo.cash
  ballerCash.addEventListener("click", increaseCash)

  // DELETE BUTTON LOGIC
  let deleteBaller = document.createElement("button")
  deleteBaller.innerText = "Delete Baller"
  deleteBaller.addEventListener("click", deleteTheBaller)
  

  // FORM LOGIC HERE
  let form = document.createElement("form")
  let formHeader = document.createElement("h3")
  formHeader.innerText = "Add Comment"
  let formInput = document.createElement("input")
  formInput.setAttribute("type", "text")
  formInput.setAttribute("name", "name")
  formInput.setAttribute("value", "")
  formInput.setAttribute("placeholder", "Enter Comment")
  let formSubmit = document.createElement("input")
  formSubmit.setAttribute("type", "submit")
  formSubmit.setAttribute("name", "submit")
  formSubmit.setAttribute("value", "Add Comment")
  let br = document.createElement("br")
  let br2 = document.createElement("br")
  let br3 = document.createElement("br")
  let commentUl = document.createElement("ul")

  // APPENDING LOGIC HERE
  form.append(formHeader, formInput, br2, formSubmit)
  form.addEventListener("submit", postForm)
  outerDiv.append(img, innerDiv, ballerName, ballerCash, br, form, br3, commentUl, deleteBaller)
  let container = document.querySelector(".flex-container")
  container.append(outerDiv)
}

function increaseCash(event){
  let ballerId = event.target.parentElement.id
  let currentCash = event.target.innerText
  let updatedCash = parseInt(currentCash)
  updatedCash += 1000000
  event.target.innerText = updatedCash  

  
  fetch(`http://localhost:3000/ballers/${ballerId}`, {
    method: "PATCH",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      cash: updatedCash
    })
  })
}

function postForm(event){
  event.preventDefault()
  let commentUl = event.target.parentElement.children[7]
  let userInput = event.target[0].value
  let commentLi = document.createElement("li")
  commentLi.innerText = userInput
  commentUl.append(commentLi)
  event.target[0].value = ""
  // I DID THE FRONT END LOGIC, NOW YOU DO THE BACKEND SO THESE COMMENTS CAN PERSIST!
}

function deleteTheBaller(event){
  let ballerId = event.target.parentElement.id
  let parent = event.target.parentElement
  parent.remove()
  fetch(`http://localhost:3000/ballers/${ballerId}`, {method: "DELETE"})
}