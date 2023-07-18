var countryData;
const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});
let value = params.name;
async function more_details() {
  const response = await fetch(`https://restcountries.com/v3.1/name/${value}`);
  countryData = await response.json();
  document.getElementById("countryImage").src = countryData[0].flags.png;
  document.getElementById("countryName").innerText = countryData[0].name.common;
  document.getElementById("nativeName").innerText = countryData[0].name.common;
  document.getElementById("population").textContent =
    countryData[0].population.toLocaleString();
  document.getElementById("region").textContent = countryData[0].region;
  document.getElementById("subRegion").textContent = countryData[0].subregion;
  document.getElementById("capital").textContent = countryData[0].capital;
  document.getElementById("topLevelDomain").textContent = countryData[0].tld[0];
  document.getElementById("currencies").textContent = Object.entries(
    countryData[0].currencies
  )[0]
    .toString()
    .split(",")[0];
  document.getElementById("languages").textContent = Object.values(
    countryData[0].languages
  ).join(", ");
  const borderCountries = countryData[0].borders;
  document.getElementById("borderCountry1").textContent =
    borderCountries[0].toLowerCase();
  document.getElementById("borderCountry2").textContent =
    borderCountries[1].toLowerCase();
  document.getElementById("borderCountry3").textContent =
    borderCountries[2].toLowerCase();
}
more_details();
