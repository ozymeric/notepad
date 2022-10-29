// _____________ VARIABLES:

const formElement = document.querySelector(".form-element")
const textArea = document.querySelector("#text-area");
const addButton = document.getElementById("add-button");
const ulElement = document.querySelector("#ul");
const saveButton = document.querySelector("#saveButtonDiv button")
const deleteButton = document.querySelector("#delete");
const clearAllButton = document.querySelector("#clear-all");

// _____________ FUNCTIONS:

function fetchText(event) {
  event.preventDefault();
  content = textArea.value;
  let newList = document.createElement("LI");
  newList.textContent = content;
  ulElement.append(newList);
  newList.addEventListener("dblclick", lineThrough);
}

function save() {
  const contentArray = [];
  allListElements = document.querySelectorAll("LI");
  for (i of allListElements) {
    console.log(i.textContent);
    contentArray.push(i.textContent);
    console.log(contentArray);
  }
  const stringData = JSON.stringify(contentArray);
  console.log(stringData);
  var file = new Blob([stringData],{type:"text"});
  const anchor = document.createElement("a");
  anchor.href = URL.createObjectURL(file);
  anchor.download = "notebook.txt";
  anchor.click();
}

function deleteLast() {
  allListElements = document.querySelectorAll("LI");
  allListElements[allListElements.length -1].remove();

}

function clearAll() {
  allListElements = document.querySelectorAll("LI");
  for (i of allListElements) {
    i.remove();
  }
}

function lineThrough() {
  if (this.style.textDecoration === ("line-through")) {
    this.remove();
  }
  this.style.textDecoration = ("line-through");
  this.style.color = ("grey");
}

// _____________ EVENT LISTENERS:

addButton.addEventListener("click", fetchText);
saveButton.addEventListener("click", save);
deleteButton.addEventListener("click", deleteLast);
clearAllButton.addEventListener("click", clearAll);
