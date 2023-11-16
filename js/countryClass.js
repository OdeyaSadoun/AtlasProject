export default class Country {
  constructor(_parent, _country) {
    this.name = _country.name.common;
    this.population = _country.population;
    this.flag = _country.flags.png;
    this.flag_alt = _country.flags.alt;
    this.capital = _country.capital;
    this.lat = _country.latlng ? _country.latlng[0] : undefined;
    this.lon = _country.latlng ? _country.latlng[1] : undefined;
    this.lang = this.findLanguages(_country);
    this.borders = _country.borders;
    this.parent = _parent;
  }

  findLanguages(_country) {
    console.log(_country);
    console.log("_country.languages", _country.languages);
    if (!_country.languages || Object.keys(_country.languages).length === 0) {
      console.log("No languages found");
      return undefined;
    }
    // let langs = Object.keys(_country.languages);
    let langs_ar = [];
    if (Object.keys(_country.languages).length > 1) {
      langs_ar = Object.values(_country.languages);
    } else {
      langs_ar = [_country.languages[Object.keys(_country.languages)[0]]];
    }
    console.log(langs_ar);
    return langs_ar;
  }

  render(callApiByCode) {
    let div = document.createElement("div");
    console.log(this.lat, this.lon);
    div.innerHTML = `
      <div class="map col-md-6 d-flex align-items-center my-5 px-2">
        <iframe width="100%" height="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"
            src="https://maps.google.com/maps?q=${this.lat},${
      this.lon
    }&hl=en&z=6&amp;output=embed">
        </iframe>
      </div>
      <div class="country_single col-md-6 align-items-center my-5 px-2">
        <div class="flag-out">
          <div class="flag border-bottom border-top border-end border-5 border-black">
            <img src="${this.flag}" alt="${this.flag_alt}" />
          </div>
          <div class="country_info">
            <h2 class="display-6 fw-bold text-center p-4">${this.name}</h2>
            <p class="lead px-5">Population: ${Number(
              this.population
            ).toLocaleString()}</p>
            <p class="lead px-5">Capital: ${this.capital}</p>
            <p class="lead px-5">Language: ${this.lang}</p>
            <p class="lead px-5">Borders: ${this.createBordersFromCodeName(
              callApiByCode
            )}</p>
          </div>
        </div>
      </div>
      `;
    div.className = "container-info d-flex mx-auto justify-content-between";
    document.querySelector(this.parent).append(div);
  }

  createBordersFromCodeName(callApiByCode) {
    let html_borders = "";
    this.borders.forEach((border) => {
      callApiByCode(border).then((data) => {
        html_borders += `
        <a href="#">${data[0].name.common}</a>
        `;
      });
    
    });
    // console.log("html_borders", html_borders);
    return html_borders;
  }

  renderSmallInfo(showCountry, callApiByName, callApiByCode) {
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
    country.querySelector("a").addEventListener("click", () => {
      showCountry(this.name, callApiByName, callApiByCode);
    });

    console.log(this.parent);
    document.querySelector(this.parent).append(country);
  }
}
