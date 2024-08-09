const baseApiUrl = "https://restcountries.com/v3.1/";

export const getCountriesService = async () => {
  try {

    const response = await fetch(`${baseApiUrl}all`);

    const countriesData = await response.json();
    return countriesData;

  } catch (error) {
    console.error("Error fetching countries:", error);
    alert(
      "An error occurred while fetching countries. Please try again later."
    );
    return [];
  }
};

export const getCountrysByNameService = async (name) => {
  if (name == null || name === "") return [];
  try {
    const response = await fetch(`${baseApiUrl}name/${name}`);
    if (response.status === 404) {
      throw new Error("Country not found");
    }
    const countriesData = await response.json();
    return countriesData;
  } catch (error) {
    console.log("Error:", error.message);
    alert(
      "An error occurred while fetching the country. Please try again later."
    );
    return [];
  }
};

export const getCountrysByNamesService = async (names) => {
  if (!Array.isArray(names) || names.length === 0) return [];
  try {
    const countriesData = [];
    for (const name of names) {
      if (name == null || name === "") continue;

      const response = await fetch(`${baseApiUrl}name/${name}`);
      if (response.status === 404) {
        console.error(`Country not found: ${name}`);
        continue;
      }

      const countryData = await response.json();
      countriesData.push(...countryData);
    }
    return countriesData;
  } catch (error) {
    console.error("Error:", error.message);
    alert(
      "An error occurred while fetching countries. Please try again later."
    );
    return [];
  }
};
