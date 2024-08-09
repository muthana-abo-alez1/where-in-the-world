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
  if(key =="dark") return items
  var parsedItems = JSON.parse(items);
  parsedItems = parsedItems?.filter((item) => item !== "null" && item !== "");
  return parsedItems || [];
}
export function deleteFromLocalStorage(key, value) {
  const storedFavorites = JSON.parse(localStorage.getItem(key)) || [];
  
  const updatedFavorites = storedFavorites.filter(favorite => favorite.id !== value);

  localStorage.setItem(key, JSON.stringify(updatedFavorites));
}
export function getIdArrayFromLocalStorage(key) {
  const items = localStorage.getItem(key);
  if (!items) return [];

  const parsedItems = JSON.parse(items);
  const idArray = parsedItems.map(item => item.id);
  return idArray;
}