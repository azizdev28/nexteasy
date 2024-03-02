// Card.tsx

import { Card } from "flowbite-react";
import React from "react";

interface Country {
  name: {
    common: string;
  };
  population: number;
  region: string;
  capital: string;
  flags: {
    svg: string;
  };
}

interface CardProps {
  country: Country;
}

const CardPage: React.FC<CardProps> = ({ country }) => {
  return (
    <Card className="card w-60 flex flex-col text-start gap-x-2.5">
      <img
        src={country.flags.svg}
        alt={`${country.name.common} Flag`}
        style={{ width: "100%", height: 120, margin: "0 auto" }}
      />
      <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {country.name.common}
      </h2>
      <h3>Population: {country.population}</h3>
      <p>Region: {country.region}</p>
      <span>Capital: {country.capital}</span>
    </Card>
  );
};

export default CardPage;
