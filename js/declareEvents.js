export const declareEvents = (
  createAllSmallInfoCountries,
  countries_ar,
  callApiByName, 
  callApiByCode
) => {
  // console.log("callApiByName", callApiByName);
  document.querySelector("header button").addEventListener("click", () => {
    document.querySelector("#home_space").className =
      "container d-flex flex-wrap justify-content-around";

    document.querySelector("#home_space").innerHTML = "";
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
    document.querySelector("#home_space").className =
      "container d-flex flex-wrap justify-content-around";
    document.querySelector("#home_space").innerHTML = "";
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
