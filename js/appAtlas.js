import { declareEvents } from "./declareEvents.js";
import {
  createFiveFirstCountries,
  createAllSmallInfoCountries,
  showCountry,
} from "./countryManager.js";

const start_countries_ar = [
  "Israel",
  "United States",
  "United Kingdom",
  "France",
  "Thailand",
];
const countries_ar = [];

const init = async () => {
  await callApiAllCountries().then((data_in) => {
    data_in.forEach((item) => {
      countries_ar.push(item);
    });
  });
  createNavBar();
  declareEvents(
    createAllSmallInfoCountries,
    countries_ar,
    callApiByName,
    callApiByCode,
    start_countries_ar,
    createFiveFirstCountries
  );

  createFiveFirstCountries(
    countries_ar,
    start_countries_ar,
    callApiByName,
    callApiByCode
  );
};

const createNavBar = () => {
  start_countries_ar.forEach((country) => {
    let li = document.createElement("li");

    li.className = "list-inline-item pt-2 nav_country";
    li.style.cursor = "pointer";
    li.innerHTML = `
    <a class="text-secondary p-3 fw-bold">
    <i class="fa fa-globe p-2" aria-hidden="true"></i>${country}</a>
    `;

    li.querySelector("a").addEventListener("click", () => {
      document.querySelector("input").value = "";
      showCountry(country, callApiByName, callApiByCode);
    });

    document.querySelector("ul").append(li);
  });
};

const callApiByName = async (_name) => {
  let url = `https://restcountries.com/v3.1/name/${_name}?fields=name,flags,population,capital,latlng,borders,languages`;

  let response = await fetch(url);
  let data = await response.json();
  return data;
};

const callApiAllCountries = async () => {
  let url = `https://restcountries.com/v3.1/all?fields=name,flags`;

  let response = await fetch(url);
  return await response.json();
};

const callApiByCode = async (_code) => {
  let url = `https://restcountries.com/v3.1/alpha?codes=${_code}&fields=name`;
  let response = await fetch(url);
  let data = await response.json();
  return data;
};

init();
