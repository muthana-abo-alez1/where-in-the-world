import React from "react";
import "./CountryMoreDetails.css";

function CountrymoreDetails({ country }) {
  const borderCountries = country.borders;

  const replaceNullOrUndefinedWithNotFound = (value) => {
    return value !== undefined && value !== null ? value : "Not Found";
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap min-h">
        <img
          src={country.flags.png}
          id="countryImage"
          className="w-40  img-fluid min-width-335"
          alt="Error in image"
        />
        <div className="data w-50">
          <div className="details d-flex flex-wrap">
            <h2 id="countryName" className="fw-bold w-100 pt-4 min-h-100">
              {replaceNullOrUndefinedWithNotFound(country.name?.common)}
            </h2>
            <div className="information w-50 pt-3">
              <ul className="list-group list-group-flush list-unstyled fw-500">
                <li className="">
                  Native Name:
                  <span id="nativeName" className="list-value ms-1">
                    {replaceNullOrUndefinedWithNotFound(country.name?.common)}
                  </span>
                </li>
                <li className="">
                  Population:
                  <span id="population" className="list-value ms-1">
                    {replaceNullOrUndefinedWithNotFound(
                      country.population?.toLocaleString()
                    )}
                  </span>
                </li>
                <li className="">
                  Region:
                  <span id="region" className="list-value ms-1">
                    {replaceNullOrUndefinedWithNotFound(country.region)}
                  </span>
                </li>
                <li className="">
                  Sub Region:
                  <span id="subRegion" className="list-value ms-1">
                    {replaceNullOrUndefinedWithNotFound(country.subregion)}
                  </span>
                </li>
                <li className="">
                  Capital:
                  <span id="capital" className="list-value ms-1">
                    {replaceNullOrUndefinedWithNotFound(country.capital)}
                  </span>
                </li>
              </ul>
            </div>
            <div className="information w-50 pt-3">
              <ul className="list-group list-group-flush list-unstyled fw-500">
                <li className="">
                  Top Level Domain:
                  <span
                    id="topLevelDomain"
                    className="list-value ms-1 fw-normal"
                  >
                    {replaceNullOrUndefinedWithNotFound(country.tld?.[0])}
                  </span>
                </li>
                <li className="">
                  Currencies:
                  <span id="currencies" className="list-value ms-1 fw-normal">
                    {replaceNullOrUndefinedWithNotFound(
                      country.currencies &&
                        Object.entries(country.currencies)[0]?.[0]
                    )}
                  </span>
                </li>
                <li className="">
                  Languages:
                  <span id="languages" className="list-value ms-1 fw-normal">
                    {replaceNullOrUndefinedWithNotFound(
                      country.languages &&
                        Object.values(country.languages).join(", ")
                    )}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="d-flex flex-wrap pt-5">
            <label className="fw-500 pe-2">Border Countries:</label>
            <div className="w-75 ps-3 buttons">
            {borderCountries ? (
                borderCountries.map((name, index) => (
                  <button
                    key={index}
                    type="button"
                    id={`borderCountry${index + 1}`}
                    className="btn shadow-sm pt-0 pb-0 w-25 fs-6"
                  >
                    {replaceNullOrUndefinedWithNotFound(name?.toLowerCase())}
                  </button>
                ))
              ) : (
                <span>Border Country Not Found</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CountrymoreDetails;
