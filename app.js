// ########################################################################
// ########################################################################
// ########################################################################
// ########################################################################
// __________________________""" VARIABLES:
// ########################################################################
// ########################################################################
// ########################################################################
// ########################################################################

const bodyElement = document.querySelector("body");
const formElement = document.querySelector(".form-element");

// TOP INPUT AREA:
const textArea = document.querySelector("#text-area");
const addButton = document.getElementById("add-button");
const lockButton = document.querySelector("#lockButton");

// CLOCK:
const clockPar = document.getElementById("clock-p");

// PASSWORD:
const passwordInput = document.querySelector("#password");
const passwordButton = document.querySelector("#passwordButton");

// TO-DO LIST UL:
const ulElement = document.querySelector("#ul");
const saveButton = document.querySelector("#saveButtonDiv button");
const deleteButton = document.querySelector("#delete");
const clearAllButton = document.querySelector("#clear-all");

// REMINDERS UL2:
const ulElement2 = document.querySelector("#ul2");
const addReminderButton = document.getElementById("reminder-button");
const reminderSaveButton = document.getElementById("reminderSaveButton");
const reminderDeleteLastButton = document.getElementById(
  "reminderDeleteLastButton"
);
const reminderClearButton = document.getElementById("reminderClearButton");

// REMINDER CONFIG AREA:
const outerConfig = document.getElementById("outer-config");
const configMessage = document.getElementById("configMessage");
const timer = document.getElementById("time");
const configAddReminderButton = document.getElementById("configAddButton");
const configResetButton = document.getElementById("configResetButton");

//REMINDER ALERT POP-UP AREA:
const alertOuterConfig = document.getElementById("alert-outer-config");
const alertReminderConfig = document.getElementById("alert-reminder-config");
const reminderPopUpMessage = document.getElementById("reminder-message-pop-up");

// REMINDER ARRAYS:
reminderTimeArray = [];
reminderMessageArray = [];

// AUDIO FILE:
var reminderAudio = new Audio("sound/reminder.wav");

// ########################################################################
// ########################################################################
// ########################################################################
// ########################################################################
// __________________________""" FUNCTIONS:
// ########################################################################
// ########################################################################
// ########################################################################
// ########################################################################

// PASSWORD DETECTION ON THE OPENNING PAGE:
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
  textArea.focus();
}

// LOCK SCREEN FUNCTION:
function lockScreen() {
  document.getElementById("outer").style.display = "none";
  document.getElementById("log-in").style.display = "flex";
}

// SETTING TIME-OUT FOR LOCKING THE SCREEN:
function lockScreenTimeout() {
  clearTimeout(myVar);
  myVar = setTimeout(lockScreen, 3600000);
}

let myVar = setTimeout(lockScreen, 3600000);

// TIME MODULE ON TOP-RIGHT CORNER:
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

// REFRESHING THE TIME MODULE EVERY 1 SECOND TO REFRESH THE "SECOND" DISPLAY
setInterval(displayTime, 1000);

// TO-DO LIST INPUT TEXT FETCH:
function fetchText(event) {
  event.preventDefault();
  content = textArea.value;
  let newList = document.createElement("LI");
  newList.textContent = content;
  ulElement.append(newList);
  newList.addEventListener("dblclick", lineThrough);
  textArea.value = "";
}

// REMINDER MESSAGE AND TIMER DATA FETCH:
function fetchReminderData(e) {
  e.preventDefault();
  messageData = configMessage.value;
  reminderMessageArray.push(messageData);
  timerData = timer.value;
  reminderTimeArray.push(timerData);
  content = messageData + " _ (Reminder @" + timerData + ")";
  console.log(messageData + " _ (Reminder @" + timerData + ")");
  let newList = document.createElement("LI");
  newList.draggable = true;
  dragStartDetect(newList);
  newList.textContent = content;
  ulElement2.append(newList);
  newList.addEventListener("dblclick", lineThrough);
  configResetButton.click();
  closeConfigWindow();
}

// DRAG EVENT FUNCTIONS FOR REMINDER UL2 LIST:
function dragStartDetect(element) {
  element.addEventListener("dragstart", () => {
    element.classList.add("dragging");
  });
  element.addEventListener("dragend", () => {
    element.classList.remove("dragging");
  });
}

ulElement2.addEventListener("dragover", (e) => {
  e.preventDefault();
  const itemBeingDragged = document.querySelector(".dragging");
  ulElement2.appendChild(itemBeingDragged);
});

// SAVING THE TO-DO LIST DATA AS TXT DOCUMENT :
function save() {
  const contentArray = [];
  allListElements = document.querySelectorAll("#ul LI");
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

// DELETE LAST TO-DO ELEMENT:
function deleteLast() {
  allListElements = document.querySelectorAll("#ul LI");
  allListElements[allListElements.length - 1].remove();
}

// CLEAR ALL TO-DO ELEMENTS:
function clearAll() {
  allListElements = document.querySelectorAll("#ul LI");
  for (i of allListElements) {
    i.remove();
  }
}

// SAVING THE REMINDER DATA AS TXT DOCUMENT :

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

  anchor.download =
    "reminders" + date + "" + month + "-" + hour + "." + minute + ".txt";
  anchor.click();
}

// DELETE LAST REMINDER ELEMENT:
function reminderDeleteLast() {
  allListElements = document.querySelectorAll("#ul2 LI");
  allListElements[allListElements.length - 1].remove();
  reminderTimeArray.pop();
  reminderMessageArray.pop();
}

// CLEAR ALL REMINDER ELEMENTS:
function reminderClearAll() {
  allListElements = document.querySelectorAll("#ul2 LI");
  for (i of allListElements) {
    i.remove();
  }
  reminderTimeArray = [];
  reminderMessageArray = [];
}

// REVEALING THE REMINDER CONFIG WINDOW:
function addReminder() {
  document.getElementById("outer").style.display = "none";
  document.getElementById("outer-config").style.display = "block";
  document.getElementById("reminder-config").style.display = "flex";
  document.getElementById("configMessage").focus();
}

// REMINDER CONFIG FORM ELEMENT STOP PROPAGATION FUNCTION:
document
  .getElementById("reminder-config")
  .addEventListener("click", function (e) {
    e.stopPropagation();
  });

// CLOSING THE REMINDER CONFIG WINDOW:
function closeConfigWindow() {
  document.getElementById("outer").style.display = "block";
  document.getElementById("outer-config").style.display = "none";
  document.getElementById("reminder-config").style.display = "none";
  textArea.focus();
}

// CHECKING THE REMINDER TIME AND THE CURRENT TIME FOR THE ALERT:
function reminderTimeCheck() {
  let currentTime = new Date();
  let currentHour = currentTime.getHours();
  let currentMinute = currentTime.getMinutes();

  if (currentHour < 10) {
    currentHour = "0" + currentHour;
  } else {
    currentHour;
  }

  if (currentMinute < 10) {
    currentMinute = "0" + currentMinute;
  } else {
    currentMinute;
  }

  let currentTimeFetch = currentHour + ":" + currentMinute;
  let inndex = -1;
  for (const time of reminderTimeArray) {
    inndex++;
    if (time === currentTimeFetch) {
      alertOuterConfig.style.display = "flex";
      reminderAudio.play();
      delete reminderTimeArray[inndex];
      reminderPopUpMessage.textContent =
        "'' " + reminderMessageArray[inndex].toUpperCase() + " ''";

      for (const i of document.querySelectorAll("#ul2 LI")) {
        if (i.textContent.slice(-6, -1) === time) {
          i.style.textDecoration = "line-through";
          i.style.color = "grey";
        }
      }

      inndex = -1;

      return;
    }
  }
  inndex = -1;
}

// CHEKING THE ALERT TIME AND CURRENT TIME EVERY 1 SECOND:
setInterval(reminderTimeCheck, 1000);

// DOUBLE CLICK TO LINE-THROUGH AN ELEMENT AND SECOND DOUBLE CLICK TO DELETE THE ELEMENT:
function lineThrough() {
  if (this.style.textDecoration === "line-through") {
    this.remove();
  }
  this.style.textDecoration = "line-through";
  this.style.color = "grey";
  let deletedElement = this.textContent.slice(-6, -1);
  let indexCount = -1;
  for (const element of reminderTimeArray) {
    indexCount++;
    if (element === deletedElement) {
      delete reminderTimeArray[indexCount];
      delete reminderMessageArray[indexCount];
    }
  }
}

// A DUMMY FUNCTION TO ASK PERMISSION EVERY TIME WHEN LEAVING/CLOSING THE PAGE.
function areYouSure() {
  return "hello";
}

// ########################################################################
// ########################################################################
// ########################################################################
// ########################################################################
// __________________________""" EVENT LISTENERS:
// ########################################################################
// ########################################################################
// ########################################################################
// ########################################################################

// BODY EVENT-LISTENERS:
bodyElement.addEventListener("mousemove", lockScreenTimeout);
bodyElement.addEventListener("mousestop", lockScreenTimeout);

// PASSWORD AREA:
passwordButton.addEventListener("click", releaseNotebook);

// TOP INPUT AREA:
addButton.addEventListener("click", fetchText);
lockButton.addEventListener("click", lockScreen);

// TO-DO LIST AREA:
saveButton.addEventListener("click", save);
deleteButton.addEventListener("click", deleteLast);
clearAllButton.addEventListener("click", clearAll);

// REMINDER AREA:
addReminderButton.addEventListener("click", addReminder);
reminderSaveButton.addEventListener("click", reminderSave);
reminderDeleteLastButton.addEventListener("click", reminderDeleteLast);
reminderClearButton.addEventListener("click", reminderClearAll);

// REMINDER CONFIG AREA:
configAddReminderButton.addEventListener("click", fetchReminderData);

// CLICK OUTER CONFIG AREA TO CLOS REMINDER AREA:
outerConfig.addEventListener("click", closeConfigWindow);

// CLICK ON THE REMINDER ALERT POP UP TO CLOSE IT:
alertReminderConfig.addEventListener("click", function () {
  alertOuterConfig.style.display = "none";
});
