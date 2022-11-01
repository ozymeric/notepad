// _____________ VARIABLES:

const clockPar = document.getElementById("clock-p");

const bodyElement = document.querySelector("body");
const formElement = document.querySelector(".form-element");
const textArea = document.querySelector("#text-area");
const addButton = document.getElementById("add-button");
const ulElement = document.querySelector("#ul");
const ulElement2 = document.querySelector("#ul2");
const saveButton = document.querySelector("#saveButtonDiv button");
const deleteButton = document.querySelector("#delete");
const clearAllButton = document.querySelector("#clear-all");
const lockButton = document.querySelector("#lockButton");
const reminderLockButton = document.querySelector("#lockButton2");
const passwordInput = document.querySelector("#password");
const passwordButton = document.querySelector("#passwordButton");
const addReminderButton = document.getElementById("reminder-button");
const configAddReminderButton = document.getElementById("configAddButton");
const configResetButton = document.getElementById("configResetButton");
const configMessage = document.getElementById("configMessage");
const timer = document.getElementById("time");
const reminderSaveButton = document.getElementById("reminderSaveButton");
const reminderDeleteLastButton = document.getElementById("reminderDeleteLastButton");
const reminderClearButton = document.getElementById("reminderClearButton");
const outerConfig = document.getElementById("outer-config");


function fetchReminderData(e) {
  e.preventDefault;
  messageData = configMessage.value;
  timerData = timer.value;
  content = (messageData + " _ (Reminder @" + timerData + ")");
  console.log(messageData + " _ (Reminder @" + timerData + ")");
  let newList = document.createElement("LI");
  newList.textContent = content;
  ulElement2.append(newList);
  newList.addEventListener("dblclick", lineThrough);
  configResetButton.click();
  closeConfigWindow();
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

  if (date < 10) {
    date = "0" + date;
  } else {
    date;
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


function reminderSave() {
  const contentArray = [];
  allListElements = document.querySelectorAll("#ul2 LI");
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

  anchor.download = "reminders" + date + "" + month + "-" + hour + "." + minute + ".txt";
  anchor.click();
}

function deleteLast() {
  allListElements = document.querySelectorAll("#ul LI");
  allListElements[allListElements.length - 1].remove();
}


function reminderDeleteLast() {
  allListElements = document.querySelectorAll("#ul2 LI");
  allListElements[allListElements.length - 1].remove();
}

function clearAll() {
  allListElements = document.querySelectorAll("LI");
  for (i of allListElements) {
    i.remove();
  }
}

function reminderClearAll() {
  allListElements = document.querySelectorAll("#ul2 LI");
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

function addReminder() {
  document.getElementById("outer").style.display = "none";
  document.getElementById("outer-config").style.display = "block";
  document.getElementById("reminder-config").style.display = "flex";
}

function closeConfigWindow() {
  document.getElementById("outer").style.display = "block";
  document.getElementById("outer-config").style.display = "none";
  document.getElementById("reminder-config").style.display = "none";
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
lockButton2.addEventListener("click", lockScreen);
addReminderButton.addEventListener("click", addReminder);
configAddReminderButton.addEventListener("click", fetchReminderData);
reminderDeleteLastButton.addEventListener("click", reminderDeleteLast);
reminderClearButton.addEventListener("click", reminderClearAll);
reminderSaveButton.addEventListener("click", reminderSave);
outerConfig.addEventListener("click",closeConfigWindow);
document.getElementById("reminder-config").addEventListener("click", function(e) {
  e.stopPropagation();
})