import Country from "./countryClass.js";
import { declareEvents } from "./declareEvents.js";
const countries_ar = ["Israel","USA", "United Kingdom", "France", "Thailand"];

window.onload = () => {
  createNavBar();
  createSearch();
  declareEvents();
  createAllSmallInfoCountries();
};

const createNavBar = () => {
  countries_ar.forEach((country) => {
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

const createSearch = () => {
  let div = document.createElement("div");
  div.className = "list-inline-item pt-2 nav_country mx-5";
  div.innerHTML += `

  <div class="input-group mb-3">
  <input id="id_search" type="text" class="form-control" placeholder="search..." aria-label="search" aria-describedby="button-search">
  <button class="btn btn-outline-secondary" type="button" id="button-search">Search</button>

  </div>
  `;

  document.querySelector("nav").append(div);

  div.querySelector("button").addEventListener("click", () => {
    console.log("input");
    let search_val = document.querySelector("input").value;
    showCountry(search_val);
  });
};

const createAllSmallInfoCountries = () => {
  countries_ar.forEach((country) => {
    callApiByName(country).then((data) => {
      let country = new Country(".row", data[0]);
      country.renderSmallInfo(showCountry);
    });
  });
};

const showCountry = (_name) => {
  document.querySelector("#home_space").innerHTML = "";
  callApiByName(_name).then((data) => {
    if(data.length > 1){

      data = data.filter((item) => {
        if(item.name.common.toLowerCase() == _name.toLowerCase()){
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
  let data =  await response.json();
  console.log("dataaaa", data);

  return data;

};
