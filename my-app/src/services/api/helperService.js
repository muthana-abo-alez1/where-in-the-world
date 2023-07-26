import { getCountrysByNamesService } from '../../services/api/countryService.js';
import { getItemFromLocalStorage } from '../../js/localStorag';

export async function fetchFavoriteData() {
  const item = await getItemFromLocalStorage("country");
  return await getCountrysByNamesService(item);
}