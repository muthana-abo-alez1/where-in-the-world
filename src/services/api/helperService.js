import { getCountrysByNamesService } from "./countryService.js";
import { getIdArrayFromLocalStorage } from "../../js/localStorag.js";

export async function fetchFavoriteData() {
  const item = getIdArrayFromLocalStorage("country");
  return await getCountrysByNamesService(item);
}
