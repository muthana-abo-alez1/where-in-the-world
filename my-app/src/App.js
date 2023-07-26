import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/header/header.js';
import Search from './components/search/search';
import Filter from './components/filter/filter';
import CardList from './components/CardList/cardList';
import FavoriteList from './components/favoriteList/favoriteList';
import { getCountriesService } from './services/api/countryService.js';
import { droppable, setOnFavoriteAdded } from './js/draggable.js';

function App() {
  const [countriesData, setCountriesData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("Filter by Region");
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getCountriesService();
        setCountriesData(data); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const filteredCountriesData = countriesData.filter((country) => {
      const matchesQuery = country.name.common.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRegion = selectedRegion === "Filter by Region" || country.region === selectedRegion;
      return matchesQuery && matchesRegion;
    });
    setFilteredCountries(filteredCountriesData);
  }, [searchQuery, selectedRegion, countriesData]);

  const handleRegionFilter = (region) => {
    setSelectedRegion(region);
  };

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
      <div className='container container-body gap-5'>
        <div className='d-flex justify-content-between flex-wrap mb-4'>
          <Search onFilter={setSearchQuery} />
          <Filter onRegionFilter={handleRegionFilter} />
        </div>
        <div className="d-flex justify-content-between items gap-3">
          <FavoriteList favorites={favorites} />
          <div className="card-container row g-4 custom-size" id="Countries">
            <CardList countries={filteredCountries} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
