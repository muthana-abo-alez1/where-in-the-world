import React, { useEffect, useState,  useCallback } from "react";
import Header from "../../components/Header/Header.js";
import { useParams, Link } from "react-router-dom";
import { getCountrysByNameService } from "../../services/Api/CountryService.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import CountrymoreDetails from "../../components/Country-More-Details/CountryMoreDetails.js";
import { checkDarkMode } from "../../js/DarkMode.js";
import "./MoreDetails.css"
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
  function toBack(){
    window.history.back();
  }
  return (
    <div>
      <Header />
      <div className="container  min-width-335">
        <Link
        to="#"
          onClick={toBack}
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
