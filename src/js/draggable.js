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
  const id = event.target.getAttribute("id");
  const url = event.target.getAttribute("url");

  const dragData = {
    id,
    url,
  };

  event.dataTransfer.setData("application/json", JSON.stringify(dragData));
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

  const dataTransferString = event.dataTransfer.getData("application/json");
  try {
    event.target.classList.remove("favorite-hover");

    if (dataTransferString == "") return;
    const draggableElementData = JSON.parse(dataTransferString);

    const storedFavorites = JSON.parse(localStorage.getItem("country")) || [];

    if (
      storedFavorites.some(
        (favorite) => favorite.id === draggableElementData.id
      )
    ) {
      return;
    }

    if (onFavoriteAdded) {
      onFavoriteAdded(draggableElementData);
    }
  } catch (error) {
    console.error("Error parsing dropped data:", error);
  }
}
