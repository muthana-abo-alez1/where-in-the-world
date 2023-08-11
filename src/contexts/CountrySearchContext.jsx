import React, { createContext, useState } from 'react';

export const CountrySearchContext = createContext();

function CountrySearchContextProvider({ children }) {
  const [searchQuery, setSearchQuery] = useState({ searchValue: "", filterValue: "" });
 
  return (
    <CountrySearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </CountrySearchContext.Provider>
  );
}

export default CountrySearchContextProvider;
