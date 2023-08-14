import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/header/header.js";
import Search from "./components/search/search";
import Filter from "./components/filter/filter";
import CardList from "./components/Card-List/CardList.js";
import FavoriteList from "./components/Favorite-List/FavoriteList";
import { checkDarkMode } from "./js/darkMode.js";
import Loading from "../src/components/Loading/Loading.js";
import CountrySearchContextProvider from "./contexts/CountrySearchContext";
import useFetchData from "./Hooks/FetchDataHook";
import FavoriteCountryContextProvider from "./contexts/FavoriteCountryContext";

function App() {
  const { data: countriesData, loading: countriesLoading } = useFetchData();
  return (
    <FavoriteCountryContextProvider>
      <CountrySearchContextProvider>
        <div className="App">
          <Header />
          <div className="container container-body gap-5">
            <div className="d-flex justify-content-between flex-wrap mb-4">
              <Search />
              <Filter />
            </div>
            <div className="d-flex justify-content-between items gap-3">
              <FavoriteList favorites />

              <div
                className="card-container row g-4 custom-size"
                id="Countries"
              >
                {countriesLoading ? (
                  <Loading />
                ) : (
                  <CardList countries={countriesData} />
                )}
              </div>
            </div>
          </div>
        </div>{" "}
      </CountrySearchContextProvider>{" "}
    </FavoriteCountryContextProvider>
  );
}

export default App;
