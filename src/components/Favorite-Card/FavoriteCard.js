import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { deleteFromLocalStorage } from "../../js/localStorag";
import "./FavoriteCard.css";

const CountryCard = ({ countries, handleRemove, index }) => {
  const country = countries;

  const onRemove = () => {
    handleRemove(country); 
    deleteFromLocalStorage("country",country.id)
  };
  return (
    <div className={`col ${country.id} cardfavorite`}>
      <div className="d-flex pb-2 drag-source ps-3" name={country.id}>
        <img
          src={country.url}
          className="w-25 h-25 rounded-3 flags-favorite"
          alt=""
        />
        <div className="d-flex justify-content-between w-75 align-items-center">
          <span className="ps-2 fw-normal pb-1">{country.id}</span>
          <button
            className="remove-element d-flex justify-content-center align-items-center"
            onClick={onRemove}
          >
            <FontAwesomeIcon icon={faCircleXmark} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CountryCard;
