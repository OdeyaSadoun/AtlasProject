export const declareEvents = (createAllSmallInfoCountries) => {
  // document.querySelector("header .container").append(div);

  document.querySelector("header button").addEventListener("click", () => {
    let search_val = document.querySelector("input").value;
    createAllSmallInfoCountries(search_val);
    document.querySelector("input").value = "";
  });

  document.querySelector("#id_search").addEventListener("keydown", (e) => {
    // console.log(e.key);
   if(e.key == "Enter"){
    let search_val = document.querySelector("input").value;
    createAllSmallInfoCountries(search_val);
    document.querySelector("input").value = "";
   }
  });
};


