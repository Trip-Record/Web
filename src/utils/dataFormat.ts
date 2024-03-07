import { Place } from "../api/records";

export function formatPlace(recordPlaces: Place[]) {
  return recordPlaces
    .map((place) => `${place.countryName}, ${place.placeName}`)
    .join(" / ");
}

export function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const dateString = year + "." + month + "." + day;
  return dateString;
}

export function formatTime(date: Date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const time = date.getHours().toString().padStart(2, "0");
  const m = date.getMinutes().toString().padStart(2, "0");

  const dateString = year + "." + month + "." + day + " " + time + ":" + m;
  return dateString;
}
