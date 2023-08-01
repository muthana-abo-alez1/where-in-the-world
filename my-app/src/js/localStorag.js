export function storeInLocalStorage(name) {
  if (name == "" || name == null || name == "null") return;
  var countries = new Array();
  countries = JSON.parse(localStorage.getItem("country")) || [];
  if (countries.includes(name)) return;
  countries.push(name);
  localStorage.setItem("country", JSON.stringify(countries));
}

export function getItemFromLocalStorage(key) {
  var items = localStorage.getItem(key);
  var parsedItems = JSON.parse(items);
  parsedItems = parsedItems?.filter((item) => item !== "null" && item !== "");
  return parsedItems || [];
}
export function deleteFromLocalStorage(key, value) {
  const storedValue = localStorage.getItem(key);
  if (storedValue) {
    const storedArray = JSON.parse(storedValue);
    const updatedArray = storedArray.filter((item) => item !== value);
    localStorage.setItem(key, JSON.stringify(updatedArray));
  }
}
