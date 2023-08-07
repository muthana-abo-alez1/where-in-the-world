import React, { useEffect, useState } from "react";
import "./FavoriteList.css";
import FavoriteCard from "../Favorite-Card/FavoriteCard.js";
import { fetchFavoriteData } from "../../services/Api/HelperService";
import { getCountrysByNameService } from "../../services/Api/CountryService";
import { storeInLocalStorage } from "../../js/LocalStorag";

function FavoriteList({ favorites }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function getData() {
      try {
        const favoriteData = await fetchFavoriteData();
        setData(favoriteData);
        if (favorites.length > 0) {
          const countryData = await getCountrysByNameService(favorites);
          setData((favoriteData) => [...favoriteData, ...countryData]);
        }
        storeInLocalStorage(favorites);
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("An error occurred while fetching data. Please try again later.");
      }
    }
  
    getData();
  }, [favorites]);
  const handleRemove = (country) => {
    setData((prevData) => prevData.filter((item) => item !== country));
  };

  return (
    <>
      <div
        className="favorite col-3 custom-size-favorite shadow-sm"
        id="favorite"
      >
        <h3 className="fw-bold pt-3 ps-3">favorites</h3>
        {data.map((card, index) => (
          <FavoriteCard
            key={index}
            countries={card}
            handleRemove={handleRemove}
          />
        ))}
      </div>
    </>
  );
}

export default FavoriteList;
