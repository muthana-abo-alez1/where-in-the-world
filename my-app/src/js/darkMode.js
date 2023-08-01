var flagDarkMode = false;

window.addEventListener("load", checkDarkMode);

function checkDarkMode() {
  var items = localStorage.getItem("dark");
  if (items == "true") {
    document.getElementById("dark-toggle");
    let element = document.body;
    element.classList.toggle("dark-mode");
    var checkDark = document.getElementById("dark-toggle");
    checkDark.checked = true;
  }
}
