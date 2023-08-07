import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  deleteFromLocalStorage,
  storeInLocalStorage,
  getItemFromLocalStorage,
} from "../../js/LocalStorag";
import "./Card.css";

const Card = ({
  name,
  flags,
  count,
  population,
  region,
  capital,
  onFavoriteChange,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favoriteCountries = getItemFromLocalStorage("country");
    setIsFavorite(favoriteCountries.includes(name.official));
  }, [name.common]);

  const handleFavoriteChange = (e) => {
    e.preventDefault(); 
    const isChecked = e.target.checked;
    setIsFavorite(isChecked);
    onFavoriteChange(isChecked);

    if (isChecked) {
      storeInLocalStorage(name.official);
    } else {
      deleteFromLocalStorage("country", name.official);
    }
  };

  return (
    <div className={`col ${name.official}`}>
      <Link to={`/where-in-the-world/moreDetails/${name.official}`} className="link">
        <div
          className="card draggable h-100 shadow-sm pb-4 m-0"
          draggable="true"
          data-draggable-id={name.official}
          id={`card-${count}`}
        >
          <img
            src={flags.png}
            className="card-img-top flag"
            alt="Error in image"
            draggable="true"
            data-draggable-id={name.official}
          />
          <div className="card-body">
            <h5 className="card-title fw-bold pt-2">{name.official}</h5>
            <ul className="list-group list-group-flush list-unstyled fw-500 pt-2">
              <li className="">
                Population:
                <span className="list-value ms-1">
                  {population.toLocaleString()}
                </span>
              </li>
              <li className="">
                Region:<span className="list-value ms-1">{region}</span>
              </li>
              <li className="">
                Capital:<span className="list-value ms-1">{capital}</span>
              </li>
            </ul>
          </div>

          <div className="d-flex justify-content-end">
            <input
              type="checkbox"
              id={`add-favorite-${count}`}
              className="star-btn visually-hidden"
              checked={isFavorite}
              onChange={handleFavoriteChange}
              name={name.common}
            />
            <label
              htmlFor={`add-favorite-${count}`}
              className={`star-label star ${isFavorite ? "orange" : ""}`}
            >
              &#9733;
            </label>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
