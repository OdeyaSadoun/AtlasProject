export const declareEvents = (
  createAllSmallInfoCountries,
  countries_ar,
  callApiByName, 
  callApiByCode,
  start_countries_ar,
  createFiveFirstCountries
) => {
  document.querySelector(".logo").addEventListener("click", () =>{
    makeEmptyPlace();
    createFiveFirstCountries(
      countries_ar,
      start_countries_ar,
      callApiByName,
      callApiByCode
    );
  })
  
  document.querySelector("header button").addEventListener("click", () => {
    makeEmptyPlace();
    let search_val = document.querySelector("input").value;
    createAllSmallInfoCountries(
      search_val.toLocaleLowerCase(),
      countries_ar,
      callApiByName,
      callApiByCode
    );
    document.querySelector("input").value = "";
  });

  document.querySelector("#id_search").addEventListener("input", (e) => {
    makeEmptyPlace();
    let search_val = document.querySelector("input").value;
    createAllSmallInfoCountries(
      search_val.toLocaleLowerCase(),
      countries_ar,
      callApiByName,
      callApiByCode
    );
    if (e.key == "Enter") {
      document.querySelector("input").value = "";
    }
  });

  document.querySelector("#id_search").addEventListener("keydown", (e) => {
    document.querySelector("#home_space").className =
      "container d-flex flex-wrap justify-content-around";
    if (e.key == "Enter") {
      document.querySelector("#home_space").innerHTML = "";
      let search_val = document.querySelector("input").value;
      
      createAllSmallInfoCountries(
        search_val.toLocaleLowerCase(),
        countries_ar,
        callApiByName
      );

      document.querySelector("input").value = "";
    }
  });
};

const makeEmptyPlace = () => {
  document.querySelector("#home_space").className =
  "container d-flex flex-wrap justify-content-around";
  document.querySelector("#home_space").innerHTML = "";
}
