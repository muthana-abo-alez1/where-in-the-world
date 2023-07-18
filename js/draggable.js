const draggableElements = document.querySelectorAll(".draggable");
const droppableElements = document.getElementById("favorite");
import { storeInLocalStorag } from "./localStorag.js";
import { displayFavorites } from "../js/app.js";

draggableElements.forEach((elem) => {
  elem.addEventListener("dragstart", dragStart);
});

droppableElements.addEventListener("dragenter", dragEnter);
droppableElements.addEventListener("dragover", dragOver);
droppableElements.addEventListener("dragleave", dragLeave);
droppableElements.addEventListener("drop", drop);

function dragStart(event) {
  event.dataTransfer.setData("text/plain", event.target.id);
  event.dataTransfer.setData(
    "text/html",
    event.target.getAttribute("data-draggable-id")
  );
}

function dragEnter(event) {
  if (!event.target.classList.contains("dropped")) {
    event.target.classList.add("droppable-hover");
  }
}

function dragOver(event) {
  if (!event.target.classList.contains("dropped")) {
    event.target.classList.add("favorite-hover");
    event.preventDefault();
  }
}

function dragLeave(event) {
  if (!event.target.classList.contains("dropped")) {
    event.target.classList.remove("favorite-hover");
  }
}

async function drop(event) {
  event.preventDefault();
  event.target.classList.remove("droppable-hover");
  const draggableElementData = event.dataTransfer.getData("text/html");
  event.target.classList.remove("favorite-hover");
  if (localStorage.getItem("country")?.includes(draggableElementData)) return;
  displayFavorites([draggableElementData]);
  storeInLocalStorag(draggableElementData);
}
