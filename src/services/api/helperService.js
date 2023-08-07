import { getCountrysByNamesService } from "./CountryService.js";
import { getItemFromLocalStorage } from "../../js/LocalStorag.js";

export async function fetchFavoriteData() {
  const item = getItemFromLocalStorage("country");
  return await getCountrysByNamesService(item);
}
