import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header/Header.js";
import Search from "./components/Search/Search";
import Filter from "./components/Filter/Filter";
import CardList from "./components/Card-List/CardList.js";
import FavoriteList from "./components/Favorite-List/FavoriteList";
import { getCountriesService } from "./services/Api/CountryService.js";
import { droppable, setOnFavoriteAdded } from "./js/Draggable.js";
import { handleFavourites } from "./components/Filter/Filter";
import { checkDarkMode } from "./js/DarkMode.js";
import Loading from "../src/components/Loading/Loading.js";

function App() {
  const [countriesData, setCountriesData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("Filter by Region");
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getCountriesService();
        setCountriesData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("An error occurred while fetching data. Please try again later.");
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleRegionFilter = (region) => {
    setSelectedRegion(region);
  };

  useEffect(() => {
    var filteredCountriesData;
    async function filter() {
      filteredCountriesData = countriesData.filter((country) => {
        const matchesQuery = country.name.common
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        var matchesRegion =
          selectedRegion === "Filter by Region" ||
          country.region === selectedRegion;
        return matchesQuery && matchesRegion;
      });
      if (selectedRegion === "Favourites")
        filteredCountriesData = await handleFavourites();
      setFilteredCountries(filteredCountriesData);
    }
    filter();
  }, [searchQuery, selectedRegion, countriesData]);

  useEffect(() => {
    droppable();
    setOnFavoriteAdded((favoriteName) => {
      setFavorites(favoriteName);
    });
  }, []);

  droppable();

  return (
    <div className="App">
      <Header />
      <div className="container container-body gap-5">
        <div className="d-flex justify-content-between flex-wrap mb-4">
          <Search onFilter={setSearchQuery} />
          <Filter onRegionFilter={handleRegionFilter} />
        </div>
        <div className="d-flex justify-content-between items gap-3">
          <FavoriteList favorites={favorites} />
          <div className="card-container row g-4 custom-size" id="Countries">
            {loading ? <Loading /> : <CardList countries={filteredCountries} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
