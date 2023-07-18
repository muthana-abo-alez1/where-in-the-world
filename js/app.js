import {
  getCountriesService,
  getCountrysByNameService,
} from "../api/countryService.js";
import {
  getItemFromLocalStorage,
  deleteFromLocalStorage,
  storeInLocalStorag,
} from "../js/localStorag.js";
const parentDiv = document.getElementById("Countries");
const nameInput = document.getElementById("Search");
const dropdownMenu = document.querySelector(".dropdown-menu");
const options = dropdownMenu.querySelectorAll(".dropdown-item");
const region = document.getElementById("region");
const favorite = document.getElementById("favorite");

window.addEventListener(
  "load",
  displayCountries,
  displayFavorites(getItemFromLocalStorage("country"))
);
var i = 0;
var count = 0;
var nameOfCountry;
var countriesData;
var FavoriteCountries;

window.addEventListener("DOMContentLoaded", () => {
  options.forEach((option) => {
    option.addEventListener("click", function () {
      const selectedRegion = option.dataset.region;
      region.innerText = selectedRegion;
      const filteredCountries = filterCountriesByRegion(selectedRegion);
      console.log(filteredCountries);
      const countryListElement = document.getElementById("Countries");
      countryListElement.innerHTML = "";
      filteredCountries.forEach((country) => {
        createCountryCard(country);
      });
    });
  });
});

function filterCountriesByRegion(region) {
  if (region === "Filter by Region") {
    return countriesData;
  } else if (region === "Favourites") {
    return countriesData.filter((item) =>
      FavoriteCountries.includes(item.name.common)
    );
  } else {
    return countriesData.filter((country) => country.region === region);
  }
}

let draggableElements;

export async function displayCountries() {
  parentDiv.innerHTML = "";
  var countries = await getCountriesData();
  if (countries == null) return;
  countries.forEach((country) => {
    createCountryCard(country);
  });
  return (draggableElements = document.querySelectorAll(".draggable"));
}
export { draggableElements };

async function getCountriesData() {
  if (nameOfCountry == "" || nameOfCountry == null)
    countriesData = await getCountriesService();
  else countriesData = await getCountrysByNameService(nameOfCountry);
  return countriesData;
}

function createCountryCard(country) {
  const { name, population, region, capital, flags } = country;
  const countryListElement = document.getElementById("Countries");
  const countryCard = document.createElement("div");
  countryCard.className = `col ${name.common}`;
  countryCard.innerHTML = `<div class="card draggable h-100 shadow-sm pb-4" draggable="true" data-draggable-id="${
    name.common
  }" id="card-${count}">
      <img src="${flags.png}" class="card-img-top flag" alt="Error in image">
      <div class="card-body">
        <h5 class="card-title fw-bold pt-2">${name.common}</h5>
        <ul class="list-group list-group-flush list-unstyled fw-500 pt-2">
          <li class="">Population:<span class="list-value ms-1">${population.toLocaleString()}</span></li>
          <li class="">Region:<span class="list-value ms-1">${region}</span></li>
          <li class="">Capital:<span class="list-value ms-1">${concatenateWithCommas(
            capital
          )}</span></li>
        </ul>
      </div>
    
      <div class="d-flex justify-content-end">
        <input type="checkbox" id="add-favorite-${count}" class="star-btn visually-hidden">
        <label for="add-favorite-${count}" id="add-favorite-label" class="star-label">&starf;</label>
      </div>
    </div>`;

  countryListElement.appendChild(countryCard);
  const isFavorite = FavoriteCountries.includes(name.common);

  const favoriteCheckbox = document.querySelector("#add-favorite-" + count);
  const favoriteLabel = document.querySelector(
    'label[for="add-favorite-' + count + '"]'
  );

  if (isFavorite) {
    favoriteCheckbox.checked = true;
    favoriteLabel.style.color = "orange";
  }

  favoriteCheckbox.addEventListener("change", function () {
    if (this.checked) {
      FavoriteCountries.push(name.common);
      favoriteLabel.style.color = "orange";
      storeInLocalStorag(name.common);

    } else {
      deleteFromLocalStorage("country",name.common)
      favoriteLabel.style.color = "gray";
    }
  });

  document
    .querySelector("#card-" + count)
    .addEventListener("click", function (event) {
      if (
        event.target.tagName === "INPUT" ||
        event.target.tagName === "LABEL"
      ) {
        return;
      }
      window.location.href =
        "../html/country.html?name=" + encodeURIComponent(name.common);
    });

  count++;
}

export function createCountryFavorites(countries) {
  const countryCard = document.createElement("div");
  countryCard.className = `${countries[0].name.common}`;
  countryCard.innerHTML = `
        <div class=" d-flex pb-2 drag-source"  name="${countries[0].name.common}">
          <img src="${countries[0].flags.png}" class="w-25 h-25  rounded-3 flags-favorite"  alt="">
          <div class="d-flex justify-content-between w-75 align-items-center">
            <span class="ps-2 fw-normal pb-1">${countries[0].name.common}</span>
            <button class="remove-element d-flex justify-content-center align-items-center " id="remove-element-${i}" >
            <i class="fa-regular deleteIcon fa-circle-xmark"></i>
            </button>
            </div>
        </div>
      `;
  favorite.appendChild(countryCard);

  document
    .querySelector("#remove-element-" + i)
    .addEventListener("click", function () {
      deleteCountry(this);
    });
  i++;
}

function deleteCountry(element) {
  const countryCard = element.closest(".drag-source");
  if (countryCard) {
    countryCard.remove();
    deleteFromLocalStorage("country", countryCard.getAttribute("name"));
  }
}
function concatenateWithCommas(array) {
  if (array === undefined) return "";
  return array.join(", ");
}

nameInput.addEventListener("keyup", function () {
  nameOfCountry = nameInput.value;
  displayCountries();
});

export async function displayFavorites(Favorite) {
  FavoriteCountries = Favorite;
  var countries = [];
  for (var i = 0; i < Favorite.length; i++) {
    countries[i] = await getCountrysByNameService(FavoriteCountries[i]);
    createCountryFavorites(countries[i]);
  }
}
