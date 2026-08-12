// Make the DIV element draggable:
dragElement(document.getElementById("welcome"));
dragElement(document.getElementById("notes"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
// Close and open window
  var welcomeScreen = document.querySelector("#welcome")
  function closeWindow(element) {
  element.style.display = "none"
}
function openWindow(element) {
  element.style.display = "flex"
}
var welcomeScreenClose = document.querySelector("#welcomeclose")
var welcomeScreenOpen = document.querySelector("#welcomeopen")
welcomeScreenClose.addEventListener("click", function() {
  closeWindow(welcomeScreen);
});

welcomeScreenOpen.addEventListener("click", function() {
  openWindow(welcomeScreen);
});
var selectedIcon = undefined;

function selectIcon(element) {
  element.classList.add("selected");
  selectedIcon = element;
} 

function deselectIcon(element) {
  // Fix 1: Capital "L" in classList
  element.classList.remove("selected"); 
  // Fix 2: Update the variable, don't overwrite the function name
  selectedIcon = undefined; 
}

// Fix 3: Added targetWindow so it knows what app to open
function handleIconTap(element, targetWindow) {
  if (element.classList.contains("selected")) {
    deselectIcon(element);
    openWindow(targetWindow); // Open the specific app window
  } else {
    // Optional: Deselect any previously clicked icon first
    if (selectedIcon) deselectIcon(selectedIcon);
    selectIcon(element);
  }
}
var notesScreen = document.querySelector("#notes")

var notesScreenClose = document.querySelector("#notesclose")

notesScreenClose.addEventListener("click", () => closeWindow(notesScreen));
var biggestIndex = 1;
function addWindowTapHandling(element) {
  element.addEventListener("mousedown", () =>
    handleWindowTap(element)
  )
}
addWindowTapHandling(welcomeScreen)
addWindowTapHandling(notesScreen)
function handleWindowTap(element) {
  biggestIndex++;  // Increment biggestIndex by 1
  element.style.zIndex = biggestIndex;
}
function openWindow(element) {
  element.style.display = "flex";
  biggestIndex++;  // Increment biggestIndex by 1
  element.style.zIndex = biggestIndex;
}
var topBar = document.querySelector("#top")

function openWindow(element) {
  element.style.display = "flex";
  biggestIndex++;  // Increment biggestIndex by 1
  element.style.zIndex = biggestIndex;
  topBar.style.zIndex = biggestIndex + 1;
}

function handleWindowTap(element) {
  biggestIndex++;  // Increment biggestIndex by 1
  element.style.zIndex = biggestIndex;
  topBar.style.zIndex = biggestIndex + 1;
  deselectIcon(selectedIcon)
}
var content = [
  {
    title: "Welcome",
    date: "08/08/2026",
    content: `
        <p contenteditable="true">
            <span contenteditable="true">This is <strong> Notes for the smart</strong><br><br>
            <img src="" style="width: 128px; border-radius: 12px" /><br>
            i just like to do fun stuff</span>
        </p>
        <blockquote style="background-color: #0bd3d3; margin-top: 20px; margin-bottom: 20px; padding: 16px; border-radius: 21px;" contenteditable="true">
            <i>You can record your thoughts in here</i>
        </blockquote>
        <p contenteditable="true">
            <span contenteditable="true">Want to explore? Want to know what you will find? Well i cannot provide any insight but its probably a good place to sit and think</span>
        </p>
    `
  },
  // HERE IS YOUR NEW NOTE!
  {
    title: "My Hack Club Ideas",
    date: "08/08/2026",
    content: `
        <p contenteditable="true">
            <strong>App Ideas:</strong><br><br>
            1. A working calculator<br>
            2. A paint app<br>
            3. A mini game
        </p>
    `
  }
];
function setNotesContent(index) {

  var notesContent = document.querySelector("#notesContent")

  notesContent.innerHTML = content[index].content
}

setNotesContent(0)
function loadSidebar() {
  var sidebar = document.querySelector("#sidebar");
  sidebar.innerHTML = ""; // Clear it out first
  
  for (let i = 0; i < content.length; i++) {
    // We add onclick="setNotesContent(i)" so each button knows which note to open
    sidebar.innerHTML += `
      <div onclick="setNotesContent(${i})" style="background-color: #77e417; padding: 16px; border-radius: 16px; margin-bottom: 12px; cursor: pointer;">
        <p style="margin: 0px; font-weight: bold;">${content[i].title}</p>
        <p style="font-size: 12px; margin: 0px;">${content[i].date}</p>
      </div>
    `;
  }
}

// Call these at the very bottom of your script to start the app up!
loadSidebar();
setNotesContent(0);
function createNewNote() {
  // Grab today's date automatically
  var today = new Date().toLocaleDateString();
  
  // Create our blank note template
  var newNote = {
    title: "New Note",
    date: today,
    content: `
      <p contenteditable="true">
        <span contenteditable="true">Start typing your brilliant ideas here...</span>
      </p>
    `
  };
  
  // 1. Push the new note to the end of our content array
  content.push(newNote);
  
  // 2. Refresh the sidebar so the new button appears
  loadSidebar();
  
  // 3. Automatically open the new note (it's the very last one in the array)
  var newNoteIndex = content.length - 1;
  setNotesContent(newNoteIndex);
}