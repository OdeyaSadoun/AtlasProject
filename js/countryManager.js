import Country from "./countryClass.js";

export const createAllSmallInfoCountries = (
  _val,
  countries_ar,
  callApiByName,
  callApiByCode
) => {
  const new_ar = countries_ar.filter((item) => {
    if (item.name.common.toLowerCase().includes(_val)) {
      return item;
    }
  });
  //   console.log(new_ar);
  if (new_ar.length == 0) {
    document.querySelector("#home_space").innerHTML =
      `<p class="fw-bold display-6 p-5 m-x">Unknown country name, try again :)</p>`;
  } else {
    new_ar.forEach((item) => {
      showSmallInfoCountry(item, callApiByName, callApiByCode);
    });
  }
};

export const createFiveFirstCountries = (
  countries_ar,
  start_countries_ar,
  callApiByName, 
  callApiByCode
) => {
  const new_ar = countries_ar.filter((item) => {
    if (start_countries_ar.includes(item.name.common)) {
      return item;
    }
  });
  console.log(new_ar);
  new_ar.forEach((item) => {
    showSmallInfoCountry(item, callApiByName, callApiByCode);
  });
};

export const showSmallInfoCountry = (data, callApiByName, callApiByCode) => {
  let country = new Country("#home_space", data);
  country.renderSmallInfo(showCountry, callApiByName, callApiByCode);
};

export const showCountry = async (_name, callApiByName, callApiByCode) => {
  document.querySelector("#home_space").className = "d-block container";

  document.querySelector("#home_space").innerHTML = "";
  await callApiByName(_name).then((data) => {
    if (data.length > 1) {
      data = data.filter((item) => {
        if (item.name.common.toLowerCase() == _name.toLowerCase()) {
          return item;
        }
      });
    }
    let country = new Country("#home_space", data[0]);
    country.render(callApiByCode);
  });
};
