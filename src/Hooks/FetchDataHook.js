import { useState, useEffect } from "react";
import { getCountriesService } from "../services/Api/CountryService";


function useFetchData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const responseData = await getCountriesService();
        setData(responseData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("An error occurred while fetching data. Please try again later.");
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, loading };
}

export default useFetchData;
