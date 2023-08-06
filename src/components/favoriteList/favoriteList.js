import React, { useEffect, useState } from "react";
import "./favoriteList.css";
import FavoriteCard from "../favoriteCard/favoriteCard.js";
import { fetchFavoriteData } from "../../services/api/helperService";
import { getCountrysByNameService } from "../../services/api/countryService";
import { storeInLocalStorage } from "../../js/localStorag";

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
