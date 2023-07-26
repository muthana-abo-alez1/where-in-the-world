import React from 'react';
import Card from '../card/card.js';

const CardList = ({ countries }) => {
  return (
    <>
      {countries.map((card, index) => (
        <Card
          key={index}
          name={card.name}
          flags={card.flags}
          count={index}
          population={card.population.toLocaleString()}
          region={card.region}
          capital={card.capital}
          onFavoriteChange={(isChecked) => {
          }}
        />
      ))}
    </>
  );
};

export default CardList;