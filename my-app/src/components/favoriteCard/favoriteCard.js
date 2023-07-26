import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { deleteFromLocalStorage } from '../../js/localStorag';

const CountryCard = ({ countries, handleRemove ,index}) => {
  const country = countries;

  const onRemove = () => {
    handleRemove(country);
    deleteFromLocalStorage("country",country.name.common)
  };
  return (
    <div className={`col ${country.name.common}`}>
      <div className="d-flex pb-2 drag-source ps-3" name={country.name.common}>
        <img
          src={country.flags.png}
          className="w-25 h-25 rounded-3 flags-favorite"
          alt=""
        />
        <div className="d-flex justify-content-between w-75 align-items-center">
          <span className="ps-2 fw-normal pb-1">{country.name.common}</span>
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