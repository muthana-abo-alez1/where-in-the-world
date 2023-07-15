
const baseApiUrl = "https://restcountries.com/v3.1/";
export  const getCountriesService=async()=> {
    try {
        const response = await fetch(`${baseApiUrl}/all`);
        const countriesData = await response.json();
        return countriesData;
    } catch (error) {
        console.error("Error fetching countries:", error);
        return [];
    }
}

export const getCountrysByNameService=async(name)=>{
    try {
        const response = await fetch(`${baseApiUrl}name/${name}`);
        if (response.status === 404) {
            throw new Error("Country not found");
        }
        const countriesData = await response.json();
        return countriesData;
    } catch (error) {
        console.log("Error:", error.message);
        return [];
    }
}