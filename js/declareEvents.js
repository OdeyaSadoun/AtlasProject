export const declareEvents = (createAllSmallInfoCountries) => {

  document.querySelector("header button").addEventListener("click", () => {
    document.querySelector("#home_space").innerHTML ="";
    let search_val = document.querySelector("input").value;
    console.log(search_val);
    createAllSmallInfoCountries(search_val.toLocaleLowerCase());
    document.querySelector("input").value = "";
  });

  document.querySelector("#id_search").addEventListener("keydown", (e) => {
   if(e.key == "Enter"){
    document.querySelector("#home_space").innerHTML ="";
    let search_val = document.querySelector("input").value;
    createAllSmallInfoCountries(search_val.toLocaleLowerCase());
    document.querySelector("input").value = "";
   }
  });
};


