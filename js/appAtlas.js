import Country from "./countryClass.js";
import { declareEvents } from "./declareEvents.js";
const countries_ar = ["Israel", "USA", "United Kingdom", "France", "Thailand"];

window.onload = () => {
  createNavBar();
  declareEvents();
  createAllSmallInfoCountries();
};

const createNavBar = () => {
  countries_ar.forEach((country) => {
    let li = document.createElement("li");

    li.className = "list-inline-item pt-2 nav_country";
    li.innerHTML = `
    <a>
    <i class="fa fa-globe" aria-hidden="true"></i>${country}</a>
    `;
    
     li.querySelector("a").addEventListener("click", () => {
       console.log("event");
       showCountry(country);
     });

    // li.append(a);

    // console.log("after event");
    document.querySelector("ul").append(li);
  });

//  let search = document.createElement("div");
//  search.className = " p-2";

//  search.innerHTML = `
 
//  <input type="text" placeholder="search...">
//  <button>search</button>
 
//  `;

//  div.querySelector("nav").append(search);

  // div.innerHTML += `    
  //   <div
  //   id="burger_btn"
  //   class="burger d-flex justify-content-end d-lg-none d-sm-inlineblock">
  //   <i class="fa fa-bars"></i>
  //   </div>
    
  //   `;


  // document.querySelector("header").append(div);
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
  callApiByName(_name).then((data) => {
    let country = new Country("#home_space", data[0]);
    country.render();
  });
};

const callApiByName = async (_name) => {
  let url = `https://restcountries.com/v3.1/name/${_name}`;

  let response = await fetch(url);
  return await response.json();
};
