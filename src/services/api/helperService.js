import { getCountrysByNamesService } from "./CountryService.js";
import { getIdArrayFromLocalStorage } from "../../js/LocalStorag.js";

export async function fetchFavoriteData() {
  const item = getIdArrayFromLocalStorage("country");
  return await getCountrysByNamesService(item);
}
