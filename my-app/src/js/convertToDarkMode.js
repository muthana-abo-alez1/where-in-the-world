function dark_mode() {
  console.log("mm");
  var checkDark = document.getElementById("dark-toggle");
  document.getElementById("dark-toggle");
  let element = document.body;
  if (!checkDark.checked) {
    element.classList.toggle("dark-mode");
  } else {
    element.classList.remove("dark-mode");
  }
  localStorage.setItem("dark", !checkDark.checked);
}
