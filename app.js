// _____________ VARIABLES:

const clockPar = document.getElementById("clock-p");

const bodyElement = document.querySelector("body");
const formElement = document.querySelector(".form-element");
const textArea = document.querySelector("#text-area");
const addButton = document.getElementById("add-button");
const ulElement = document.querySelector("#ul");
const saveButton = document.querySelector("#saveButtonDiv button");
const deleteButton = document.querySelector("#delete");
const clearAllButton = document.querySelector("#clear-all");
const lockButton = document.querySelector("#lockButton");
const passwordInput = document.querySelector("#password");
const passwordButton = document.querySelector("#passwordButton");

let myVar = setTimeout(lockScreen, 300000);

// _____________ FUNCTIONS:

function displayTime() {
  let d = new Date();
  let hour = d.getHours();
  let minute = d.getMinutes();
  let second = d.getSeconds();
  let day = d.getDay();
  let date = d.getDate();
  let month = d.getMonth();
  let year = d.getFullYear();

  switch (new Date().getDay()) {
    case 0:
      day = "Sunday";
      break;
    case 1:
      day = "Monday";
      break;
    case 2:
      day = "Tuesday";
      break;
    case 3:
      day = "Wednesday";
      break;
    case 4:
      day = "Thursday";
      break;
    case 5:
      day = "Friday";
      break;
    case 6:
      day = "Saturday";
  }

  switch (month) {
    case 0:
      month = "JAN";
      break;
    case 1:
      month = "FEB";
      break;
    case 2:
      month = "MAR";
      break;
    case 3:
      month = "APR";
      break;
    case 4:
      month = "MAY";
      break;
    case 5:
      month = "JUN";
      break;
    case 6:
      month = "JUL";
      break;
    case 7:
      month = "AUG";
      break;
    case 8:
      month = "SEP";
      break;
    case 9:
      month = "OCT";
      break;
    case 10:
      month = "NOV";
      break;
    case 11:
      month = "DEC";
      break;
  }

  if (hour < 10) {
    hour = "0" + hour;
  } else {
    hour;
  }

  if (minute < 10) {
    minute = "0" + minute;
  } else {
    minute;
  }

  if (second < 10) {
    second = "0" + second;
  } else {
    second;
  }

  if (day < 10) {
    day = "0" + day;
  } else {
    day;
  }

  clockPar.innerHTML =
    day +
    " - " +
    date +
    "/" +
    month +
    "/" +
    year +
    " - " +
    hour +
    ":" +
    minute +
    ":" +
    second;
}

setInterval(displayTime, 1000);

function releaseNotebook(e) {
  e.preventDefault();
  if (passwordInput.value === "ozymeric") {
    document.getElementById("outer").style.display = "block";
    document.getElementById("log-in").style.display = "none";
    passwordInput.value = "";
  } else {
    alert("Invalid Password!");
    passwordInput.value = "";
  }
}

function lockScreen() {
  document.getElementById("outer").style.display = "none";
  document.getElementById("log-in").style.display = "flex";
}

function lockScreenTimeout() {
  clearTimeout(myVar);
  myVar = setTimeout(lockScreen, 300000);
}

function fetchText(event) {
  event.preventDefault();
  content = textArea.value;
  let newList = document.createElement("LI");
  newList.textContent = content;
  ulElement.append(newList);
  newList.addEventListener("dblclick", lineThrough);
  textArea.value = "";
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
  var file = new Blob([stringData], { type: "text" });
  const anchor = document.createElement("a");
  anchor.href = URL.createObjectURL(file);

  let d = new Date();
  let hour = d.getHours();
  let minute = d.getMinutes();
  let date = d.getDate();
  let month = d.getMonth();

  switch (month) {
    case 0:
      month = "JAN";
      break;
    case 1:
      month = "FEB";
      break;
    case 2:
      month = "MAR";
      break;
    case 3:
      month = "APR";
      break;
    case 4:
      month = "MAY";
      break;
    case 5:
      month = "JUN";
      break;
    case 6:
      month = "JUL";
      break;
    case 7:
      month = "AUG";
      break;
    case 8:
      month = "SEP";
      break;
    case 9:
      month = "OCT";
      break;
    case 10:
      month = "NOV";
      break;
    case 11:
      month = "DEC";
      break;
  }

  anchor.download = date + "" + month + "-" + hour + "." + minute + ".txt";
  anchor.click();
}

function deleteLast() {
  allListElements = document.querySelectorAll("LI");
  allListElements[allListElements.length - 1].remove();
}

function clearAll() {
  allListElements = document.querySelectorAll("LI");
  for (i of allListElements) {
    i.remove();
  }
}

function lineThrough() {
  if (this.style.textDecoration === "line-through") {
    this.remove();
  }
  this.style.textDecoration = "line-through";
  this.style.color = "grey";
}

// _____________ EVENT LISTENERS:

addButton.addEventListener("click", fetchText);
saveButton.addEventListener("click", save);
deleteButton.addEventListener("click", deleteLast);
clearAllButton.addEventListener("click", clearAll);
passwordButton.addEventListener("click", releaseNotebook);
bodyElement.addEventListener("mousemove", lockScreenTimeout);
bodyElement.addEventListener("mousestop", lockScreenTimeout);
lockButton.addEventListener("click", lockScreen);
