let onFavoriteAdded = null;

export function setOnFavoriteAdded(callback) {
  onFavoriteAdded = callback;
}

export function droppable() {
  const draggableElements = document.querySelectorAll(".draggable");
  const droppableElements = document.getElementById("favorite");
  draggableElements.forEach((elem) => {
    elem.addEventListener("dragstart", dragStart);
    droppableElements.addEventListener("dragenter", dragEnter);
    droppableElements.addEventListener("dragover", dragOver);
    droppableElements.addEventListener("dragleave", dragLeave);
    droppableElements.addEventListener("drop", drop);
  });
}

function dragStart(event) {
  event.dataTransfer.setData(
    "html",
    event.target.getAttribute("id")
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
  const draggableElementData = event.dataTransfer.getData("html"); 
  console.log(draggableElementData);
  event.target.classList.remove("favorite-hover");
  if (localStorage.getItem("country")?.includes(draggableElementData))
    return [];
  if (onFavoriteAdded) {
    onFavoriteAdded(draggableElementData);
  }
}
