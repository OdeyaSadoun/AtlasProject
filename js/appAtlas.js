import Country from "./countryClass.js";
import { declareEvents } from "./declareEvents.js";
const start_countries_ar = ["Israel", "United States", "United Kingdom", "France", "Thailand"];
const countries_ar = [];


window.onload = async() => {
  
  await callApiAllCountries()
  .then(data_in => {
    data_in.forEach(item => {
      countries_ar.push(item);
    })
  });
  createNavBar();
  await declareEvents(createAllSmallInfoCountries);
  createFiveFirstCountries();
};

const createNavBar = () => {
  console.log("navbar");
  start_countries_ar.forEach((country) => {
    let li = document.createElement("li");

    li.className = "list-inline-item pt-2 nav_country";
    li.innerHTML = `
    <a class="text-light p-3 fw-bold">
    <i class="fa fa-globe p-2" aria-hidden="true"></i>${country}</a>
    `;

    li.querySelector("a").addEventListener("click", () => {
      console.log("event");
      showCountry(country);
    });

    document.querySelector("ul").append(li);
  });
};

const createAllSmallInfoCountries = (_val) => {
  console.log("before filter");
  console.log(countries_ar);
  const new_ar = countries_ar.filter((item) => {
    console.log("aaa",item)
    if(item.name.common.includes(_val)){
      return item;
    }
    });
  console.log(new_ar);
  new_ar.forEach(item => {
    showSmallInfoCountry(item);
  })

};

const createFiveFirstCountries = () => {
  console.log(countries_ar);
  const new_ar = countries_ar.filter((item) => {
    // console.log("infilte", start_countries_ar);
    // console.log(item.name.common);
    if(start_countries_ar.includes(item.name.common)){
      return item;
    }
    });
  console.log(new_ar);
  new_ar.forEach(item => {
    showSmallInfoCountry(item);
  })

};


const showSmallInfoCountry = (data) => {
  // document.querySelector("#home_space").innerHTML = "";
    let country = new Country("#home_space", data);
    country.renderSmallInfo(showCountry);
};

const showCountry = (_name) => {
  document.querySelector("#home_space").innerHTML = "";
  document.querySelector("#home_space").className += "d-block";
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

const callApiByName = async (_name) => {
  let url = `https://restcountries.com/v3.1/name/${_name}`;

  let response = await fetch(url);
  let data = await response.json();
  return data;
};

const callApiAllCountries = async () => {
  let url = `https://restcountries.com/v3.1/all?fields=name,flags`;

  let response = await fetch(url);
  return await response.json()

};
