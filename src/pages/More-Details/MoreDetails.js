import React, { useEffect, useState, useMemo, useCallback } from "react";
import Header from "../../components/Header/Header.js";
import { useParams, Link } from "react-router-dom";
import { getCountrysByNameService } from "../../services/Api/CountryService.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import CountrymoreDetails from "../../components/Country-More-Details/CountryMoreDetails.js";

function MoreDetails() {
  const params = useParams();
  const { name } = params;
  const [country, setCountry] = useState(null);

  const fetchCountryData = useCallback(async () => {
    try {
      const countryData = await getCountrysByNameService(name);
      setCountry(countryData);
    } catch (error) {
      console.error("Error fetching country data:", error);
      alert("An error occurred while fetching the country data. Please try again later.");
    }
  }, [name]);

  useEffect(() => {
    fetchCountryData();
  }, [fetchCountryData]);

  return (
    <div>
      <Header />
      <div className="container  min-width-335">
        <Link
          to="/where-in-the-world/"
          className="btn shadow-sm ps-4 pe-4 pt-0 pb-0 mb-5"
          id="link"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="" />
          <button type="button" className="btn" st>
            Back
          </button>
        </Link>
        {country && <CountrymoreDetails country={country[0]} />}
      </div>
    </div>
  );
}

export default MoreDetails;
