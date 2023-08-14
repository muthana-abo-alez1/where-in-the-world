import React, { useContext, useState } from "react";
import "./search.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { CountrySearchContext } from "../../contexts/CountrySearchContext";

const Search = () => {
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  const { searchQuery, setSearchQuery } = useContext(CountrySearchContext);

  const handleSearchChange = (event) => {
    const inputValue = event.target.value;

    // Clear the previous debounce timeout
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    // Set a new debounce timeout
    const newTimeout = setTimeout(() => {
      setSearchQuery({ ...searchQuery, ["searchValue"]: inputValue });
    }, 300);

    setDebounceTimeout(newTimeout);
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
          onChange={handleSearchChange}
        />
      </label>
    </div>
  );
};

export default Search;
