import { Place } from "../api/records";

export function formatPlace(recordPlaces: Place[]) {
  return recordPlaces
    .map((place) => `${place.countryName}, ${place.placeName}`)
    .join(" / ");
}
