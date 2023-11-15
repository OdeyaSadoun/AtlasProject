export default class Country{
    constructor(_parent, _country){
        this.name = _country.name.common;
        this.population = _country.population;
        this.flag = _country.flags.png;
        this.flag_alt = _country.flags.alt;
        this.capital = _country.capital;
        this.lat = _country.latlng[0];
        this.lan = _country.latlng[1];
        this.lang = Object.keys(_country.languages);
        this.borders = _country.borders;
        this.parent = _parent;
    }

    render(){
        let div = document.createElement("div");
        div.innerHTML = `
        <div
        class="map col-md-6 d-flex align-items-center my-5 px-2"
      ></div>
      <div class="country_single col-md-6 align-items-center my-5 px-2">
        <div class="flag-out">
          <div class="flag border-bottom border-top border-end">
            <img src="${this.flag}" alt="${this.flag_alt}" />
          </div>
          <div class="country_info">
            <h2 class="display-6 fw-bold text-center pt-4">${this.name}</h2>
            <p class="lead px-3">Population: ${Number(this.population).toLocaleString()}</p>
            <p class="lead px-3">Capital: ${this.capital}</p>
            <p class="lead px-3">Language: ${this.lang}</p>
            <p class="lead px-3">Borders: ${this.borders}</p>
          </div>
        </div>
      </div>
        `;
        div.className = "container-info d-flex mx-auto justify-content-between";

        document.querySelector(this.parent).append(div);

    }

    renderSmallInfo(showCountry){
        let country = document.createElement("div");
        country.className = "country card col-lg-2 col-md-4 mx-3 my-5  p-3 ";
        country.innerHTML = `
        <div class="d-flex align-items-center image_flag_small_info">
        <img src="${this.flag}" class="card-img-top" alt="${this.flag_alt}" />
        </div>
        <div class="card-body text-center p-2">
          <h5 class="card-title my-3">${this.name}</h5>
          <a href="#" class="btn btn-outline-secondary">For more info</a>
        </div>
        `;

        country.querySelector("a").addEventListener("click", () =>{
            document.querySelector("#home_space").innerHTML = "";
            showCountry(this.name);
        })

        console.log(this.parent);
        document.querySelector(this.parent).append(country);
    }
}