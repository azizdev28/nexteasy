"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import CardPage from "./card/page";

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

const Home: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [countriesPerPage] = useState<number>(12);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedRegion, setSelectedRegion] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Country[]>(
          "https://restcountries.com/v3.1/all"
        );
        setCountries(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handlePagination = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleRegionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRegion(event.target.value);
    setCurrentPage(1);
  };

  const filteredCountries = countries
    .filter((country) =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (country) => selectedRegion === "" || country.region === selectedRegion
    );

  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = filteredCountries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(filteredCountries.length / countriesPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  let displayPageNumbers = pageNumbers.slice(
    Math.max(currentPage - 3, 0),
    Math.min(currentPage + 2, pageNumbers.length)
  );

  return (
    <div className="text-center p-5">
      <div className="filterpage flex justify-between py-5 items-center px-20 wrap">
        <input
          type="text"
          placeholder="Search for a country…"
          className="py-3 px-6"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <select
          name="region"
          id="region"
          className="text-base font-semibold font-mono border-solid border-inherit shadow-sm rounded-lg py-3 px-6"
          value={selectedRegion}
          onChange={handleRegionChange}
        >
          <option value="">Filter by Region</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>
      <div className="countres gap-12 m-auto my-12">
        {currentCountries.map((country) => (
          <CardPage key={country.name.common} country={country} />
        ))}
      </div>
      <div className="pagination flex gap-4 justify-center m-auto">
        {displayPageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => handlePagination(number)}
            className={currentPage === number ? "active btn" : ""}
            style={{
              backgroundColor: currentPage === number ? "#333" : "#fff",
              color: currentPage === number ? "#fff" : "#333",
            }}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;
