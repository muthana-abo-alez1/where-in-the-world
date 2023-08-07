import React, { useState } from "react";
import "./Search.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Search = ({ onFilter }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchQuery(value);
    onFilter(value);
  };

  return (
    <div>
      <label
        htmlFor="search"
        className="input-group flex-nowrap shadow-sm ps-4 mb-4 rounded d-flex justify-content-between align-items-center cursor-pointer gap-2"
      >
        <FontAwesomeIcon icon={faSearch} />
        <input
          type="text"
          id="search"
          className="form-control border-0 outline-none"
          placeholder="Search for a country..."
          aria-label="Search for a country..."
          aria-describedby="addon-wrapping"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </label>
    </div>
  );
};

export default Search;
