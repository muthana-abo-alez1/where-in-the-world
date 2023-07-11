
const parentDiv = document.getElementById("Countries");
const nameInput = document.getElementById("Search");
const dropdownMenu = document.querySelector('.dropdown-menu');
const options = dropdownMenu.querySelectorAll('.dropdown-item');
const childDivs = parentDiv.querySelectorAll('div');
const region = document.getElementById("region");
const favorite = document.getElementById("favorite");
const numberOfDivs = childDivs.length;

window.addEventListener("load", displayCountries)
window.addEventListener("load", getItemFromLocalStorage("country"))

window.addEventListener("click", filter)

var nameOfCountry ;
var countriesData;
var FavoriteCountries


function filter() {
options.forEach(option => {
    option.addEventListener('click', function() {
        const selectedRegion = option.dataset.region;
        region.innerText=selectedRegion;
        const filteredCountries = filterCountriesByRegion(selectedRegion);
        const countryListElement = document.getElementById("Countries");
        countryListElement.innerHTML = '';
        filteredCountries.forEach(country => {
        const countryCard = createCountryCard(country);
        countryListElement.appendChild(countryCard);
        });
    });
});
}
function filterCountriesByName(FavoriteCountries) {
    if(FavoriteCountries==null)return countriesData
    FavoriteCountries.forEach(element => {
        countriesData=countriesData.filter(country => country.name.common != element);
    });
    return countriesData
}
function filterCountriesByRegion(region) {
    if (region === 'Filter by Region') {
        return countriesData; 
    } else {
        return countriesData.filter(country => country.region === region);
    }
    }

async function displayCountries() {
parentDiv.innerHTML = "";
var countries = await getCountriesData();
if(countries==null)return;

const countryListElement = document.getElementById("Countries");
countries=filterCountriesByName(FavoriteCountries);
console.log(countries)
countries.forEach(country => {
    const countryCard = createCountryCard(country);
    countryListElement.appendChild(countryCard);
});
}

async function getCountriesData() {
if (nameOfCountry == "" || nameOfCountry == null) 
    countriesData = await getCountries();
    else 
    countriesData = await getCountrysByName(nameOfCountry);
return countriesData;
}

function createCountryCard(country) {
const { name, population, region, capital, flags } = country;

const countryCard = document.createElement("div");
countryCard.className = `col ${name.common}`;
countryCard.innerHTML = `
    <a href="../html/country.html?name=${name.common}" class="text-reset text-decoration-none" ">
        <div class="card h-100 shadow-sm pb-4")">
            <img src="${flags.png}" class="card-img-top flag" alt="Error in image">
            <div class="card-body">
                <h5 class="card-title fw-bold pt-2">${name.common}</h5>
                <ul class="list-group list-group-flush list-unstyled fw-500  pt-2">
                    <li class="">Population:<span class="list-value ms-1">${population.toLocaleString()}</span></li>
                    <li class="">Region:<span class="list-value ms-1">${region}</span></li>
                    <li class="">Capital:<span class="list-value ms-1">${concatenateWithCommas(capital)}</span></li>
                </ul>
            </div>
        </div>
    </a>
`;
return countryCard;

}

function concatenateWithCommas(array) {
if(array===undefined)
    return ""
return array.join(", ");
}

nameInput.addEventListener("keyup", function() {
nameOfCountry = nameInput.value;
console.log(nameOfCountry)
displayCountries() 
});

async function getCountrysByName(name){
try {
    const response = await fetch(`https://restcountries.com/v3.1/name/${name}`);
    if (response.status === 404) {
        throw new Error("Country not found");
    }
    const countriesData = await response.json();
    return countriesData;
} catch (error) {
    console.log("Error:", error.message);
    return null;
}
}

async function getCountries() {
try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const countriesData = await response.json();
    return countriesData;
} catch (error) {
    console.error("Error fetching countries:", error);
    return null;
}
}

function getItemFromLocalStorage(key){
    var items = localStorage.getItem(key)
    FavoriteCountries = JSON.parse(items)
    if(FavoriteCountries==null)return
    FavoriteCountries.forEach(item=>{
        displayFavorites(item)
    })
     
}

async function displayFavorites(item){
    const countries = await getCountrysByName(item);
    if(countries==null)return;
    countries.forEach(country => {
    const countryCard = createCountryCard(country);
    favorite.appendChild(countryCard);
});
    
}

    

