import React, { useEffect, useRef } from "react";
import FavoriteCard from "../Favorite-Card/FavoriteCard.js";
import { setOnFavoriteAdded } from "../../js/Draggable.js";
import "./FavoriteList.css";
import { storeInLocalStorage } from "../../js/LocalStorag.js";
import { useLocalStorage } from "../../Hooks/useLocalStorage.js";

function FavoriteList() {
  const [data, setData] = useLocalStorage("country", []);
  useEffect(() => {
    setOnFavoriteAdded(({ id, url }) => {
      setData((prevData) => [...prevData, { id, url }]);
      storeInLocalStorage({ id, url });
    });
  }, [setData]);

  const handleRemove = (country) => {
    setData((prevData) => prevData.filter((item) => item.id !== country.id));
  };

  return (
    <>
      <div
        className="favorite col-3 custom-size-favorite shadow-sm "
        id="favorite"
      >
        <h3 className="fw-bold pt-3 ps-3 pb-2">favorites</h3>
        <div id="list-favorite">
        {data.map((card, index) => (
          <FavoriteCard
            key={index}
            countries={card}
            handleRemove={handleRemove}
          />
        ))}
        </div>
      </div>
    </>
  );
}

export default FavoriteList;
