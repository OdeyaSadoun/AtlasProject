import Country from "./countryClass.js";

export const createAllSmallInfoCountries = (_val, countries_ar) => {
  const new_ar = countries_ar.filter((item) => {
    if (item.name.common.toLowerCase().includes(_val)) {
      return item;
    }
  });
  console.log(new_ar);
  new_ar.forEach((item) => {
    showSmallInfoCountry(item);
  });
};

export const createFiveFirstCountries = (countries_ar, start_countries_ar) => {
  const new_ar = countries_ar.filter((item) => {
    if (start_countries_ar.includes(item.name.common)) {
      return item;
    }
  });
  console.log(new_ar);
  new_ar.forEach((item) => {
    showSmallInfoCountry(item);
  });
};

export const showSmallInfoCountry = (data) => {
  let country = new Country("#home_space", data);
  country.renderSmallInfo(showCountry);
};

export const showCountry = (_name, callApiByName) => {
  document.querySelector("#home_space").className = "d-block container";

  document.querySelector("#home_space").innerHTML = "";
  callApiByName(_name).then((data) => {
    if (data.length > 1) {
      data = data.filter((item) => {
        if (item.name.common.toLowerCase() == _name.toLowerCase()) {
          return item;
        }
      });
    }
    let country = new Country("#home_space", data[0]);
    country.render();
  });
};