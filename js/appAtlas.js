import Country from "./countryClass.js";
const countries_ar = ["Israel", "USA", "United Kingdom", "France", "Thailand"];

window.onload = () => {
  console.log("init");
  createAllSmallInfoCountries();
};

const createAllSmallInfoCountries = () => {
  countries_ar.forEach((country) => {
    console.log(country);
    callApiByName(country).then((data) => {
      let country = new Country(".row", data[0]);
      country.renderSmallInfo(showCountry);
    });
  });
};

const showCountry = (_name) => {
  callApiByName(_name).then((data) => {
    let country = new Country("#home_space", data[0]);
    country.render();
  });
};

const callApiByName = async (_name) => {
  let url = `https://restcountries.com/v3.1/name/${_name}`;

  let response = await fetch(url);
  console.log("resp", response);
  return await response.json();
};
