import React, { useContext, useState } from "react";
import "./Filter.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { fetchFavoriteData } from "../../services/Api/HelperService";
import { CountrySearchContext } from "../../contexts/CountrySearchContext";


function Filter() {
  const [selectedRegion, setSelectedRegion] = useState("Filter by");

  const { searchQuery, setSearchQuery } = useContext(CountrySearchContext);


  const handleRegionSelect = (region) => {
    // Context
    setSearchQuery({ ...searchQuery, ["filterValue"]: region });

    // this is not needed
    setSelectedRegion(region);
  
  };
  return (
    <div>
      <div
        className="dropdown custom-dropdown"
        draggable="true"
        data-draggable-id="Jordan"
      >
        <div
          className="custom-dropdown-toggle-container"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <button
            className="btn dropdown-toggle custom-dropdown-toggle border-0 shadow-sm ps-3 pe-5 mb-4 rounded"
            id="region"
            type="button"
          >
            {selectedRegion}
          </button>
          <FontAwesomeIcon icon={faChevronDown} className="faChevronDown" />
        </div>
        <ul className="dropdown-menu mt-2 custom-dropdown-menu">
          <li>
            <a
              className="dropdown-item"
              onClick={() => handleRegionSelect("Filter by Region")}
              href="#"
            >
              No Filter
            </a>
          </li>
          <li>
            <a
              className="dropdown-item"
              onClick={() => handleRegionSelect("Africa")}
              href="#"
            >
              Africa
            </a>
          </li>
          <li>
            <a
              className="dropdown-item"
              onClick={() => handleRegionSelect("Americas")}
              href="#"
            >
              America
            </a>
          </li>
          <li>
            <a
              className="dropdown-item"
              onClick={() => handleRegionSelect("Asia")}
              href="#"
            >
              Asia
            </a>
          </li>
          <li>
            <a
              className="dropdown-item"
              onClick={() => handleRegionSelect("Europe")}
              href="#"
            >
              Europe
            </a>
          </li>
          <li>
            <a
              className="dropdown-item"
              onClick={() => handleRegionSelect("Oceania")}
              href="#"
            >
              Oceania
            </a>
          </li>
          <li>
            <a
              className="dropdown-item"
              onClick={() => handleRegionSelect("Favourites")}
              href="#"
            >
              Favourites
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Filter;
