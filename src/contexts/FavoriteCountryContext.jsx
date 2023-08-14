import React, { createContext, useState } from 'react'
export const FavoriteCountryContext = createContext();

const FavoriteCountryContextProvider = ({ children }) => {
    const [favoriteCountry, setFavoriteCountry] = useState([]);
    return (
        <FavoriteCountryContext.Provider value={{ favoriteCountry, setFavoriteCountry }}>
          {children}
        </FavoriteCountryContext.Provider>
      );
}

export default FavoriteCountryContextProvider