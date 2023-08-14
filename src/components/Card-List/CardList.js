import React, { useContext, useEffect, useState } from "react";
import Card from "../card/card.js";
import { CountrySearchContext } from "../../contexts/CountrySearchContext.jsx";
import { fetchFavoriteData } from "../../services/api/helperService.js";
import { droppable} from "../../js/draggable.js";



const CardList = ({ countries }) => {
  const { searchQuery } = useContext(CountrySearchContext);
  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    let filterData = async () => {
      if (!searchQuery.searchValue && !searchQuery.filterValue) {
        setFilteredData(countries);
        return;
      }

      let filteredCountriesData = countries.filter((country) => {
        const matchesQuery = !searchQuery.searchValue ||
          country.name.common.toLowerCase().includes(searchQuery.searchValue.toLowerCase());
        const matchesRegion = !searchQuery.filterValue ||
          searchQuery.filterValue === "Filter by Region" ||
          country.region === searchQuery.filterValue;
        return matchesQuery && matchesRegion;
      });

      if (searchQuery.filterValue === "Favourites") {
        filteredCountriesData = await fetchFavoriteData();
      }

      setFilteredData(filteredCountriesData);
    };

    filterData().then(()=>{
      droppable();
    })
  }, [searchQuery, countries]);

  return (
    <>
      {filteredData.map((card, index) => (
        <Card
          key={index}
          name={card.name}
          flags={card.flags}
          count={index}
          population={card.population.toLocaleString()}
          region={card.region}
          capital={card.capital}
          onFavoriteChange={(isChecked) => {}}
        />
      ))}
    </>
  );
};

export default CardList;
